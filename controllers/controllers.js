const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const jwtutils = require('../utils/jwtutils')

const CLIENT_ID = "472602366911-rnitktrv3npb4252har9ch6cl6of0pim.apps.googleusercontent.com";
const BOOKS_API_KEY = "AIzaSyDgbqlUYLmDvVnYmHtRSzgekkuxwSGSDpo";
const BOOKS_API = `https://www.googleapis.com/books/v1/volumes`


async function record_query(req,res) {

}

async function login(req,res) {
    token = req.body.token;
    const client = new OAuth2Client(CLIENT_ID);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        const user = {};
        user['name'] = payload['name'];
        user['email'] = payload['email'];
        user['picture'] = payload['picture'];

        user.token = await jwtutils.sign(user);
        res.status(200).json({user});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({"message": "Something went wrong"});
    }
}

module.exports={record_query, login};
