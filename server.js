const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors({
   origin: ['http://localhost:3000', 'https://main.d2yy8non28kl6f.amplifyapp.com/'] 
}));

const bookRoute = require('./routes/books');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // support json encoded bodies
app.use('/api', bookRoute);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL,  {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
.catch((err) => console.log(err.message));
