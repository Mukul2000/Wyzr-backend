const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const Query = require('../schemas/query');
const User = require('../schemas/user');
const jwtutils = require('../utils/jwtutils')




async function search_query(req,res) {
    const search_query = req.query.search;

    try {
        const volumes = axios.get(process.env.BOOKS_API, {
            params: {
                q:search_query,
                key:process.env.BOOKS_API_KEY
            },
        });
    
        const findUser = User.findOne({email: req.user.email});
    
        const [result, user] = await Promise.all([volumes, findUser]);
    
        await Query.create({
            user_id: user._id,
            search_query: search_query
        });
        res.status(200).json(result.data.items);
    }
    catch(e) {
        console.log(e);
        res.status(500).json({"error": "Internal server error"});
    }

}

async function book_detail(req, res) {
    const id = req.params.id;
    try {
        const book = await axios.get(process.env.VOLUME_API+id, {
            params: {
                key:process.env.BOOKS_API_KEY
            }
        });
        res.status(200).json(book.data)
    }
    catch(e) {
        console.log(e);
        res.status(500).json({"error": "Internal server error"});
    }
}

async function login(req,res) {
    token = req.body.token;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        const user = {};
        user['name'] = payload['name'];
        user['email'] = payload['email'];
        user['picture'] = payload['picture'];

        const exists = await User.findOne({'email': user.email});

        if(!exists) {
            const newUser = await User.create(user);
        }

        user.token = await jwtutils.sign(user);
        res.status(200).json({user});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({"message": "Something went wrong"});
    }
}

module.exports={search_query, login, book_detail};
