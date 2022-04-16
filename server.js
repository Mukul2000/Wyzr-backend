const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const bookRoute = require('./routes/books');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // support json encoded bodies
app.use(cors({
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}));
app.use('/api', bookRoute);

const PORT = process.env.PORT || 8000;

//  app.listen(8000, () => console.log(`Server started on port ${PORT}`))

mongoose.connect(process.env.CONNECTION_URL,  {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
.catch((err) => console.log(err.message));
