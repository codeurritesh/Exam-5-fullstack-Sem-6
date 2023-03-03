const express = require("express");
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const axios = require('axios');
const ejs = require('ejs');
const port = 3000;

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(
    path.join(__dirname, 'public')
)); // declaring path for static files.

app.use(
    methodOverride('_method')
); // method to override normal requests and to use PUT, PATCH, DELETE etc.


app.use(express.urlencoded({
    extended:true
})); // setting up urlencoded for all the urls.

app.listen(port, () => {
    console.log(`server is running at the port : ${port}`);
}); // setting up the port.

/* Basic setting for the application. */

const dbName = "articles"; // database name
const m = require('./model/model');

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
    .then (() => console.log("Finally database is connected!"))
    .catch((err) => console.log(err));

/* Preparing the database connection. */

/*
* Server setup:-
* / - index
* /articles/new - new-articles
* /articles [post] - [add new article]
* */

app.get('/', async (req, res) => {
    const data = await m.m.find();
    res.render("index", {data});
    console.log(data);
});

app.get('/articles/new', (req, res) => {
    res.render('new-article');
});

app.post('/articles', async (req, res) => {
    const formData = req.body;

    const newPostData = {
        title: formData.title,
        desc: formData.desc,
        markdown: formData.mkd,
        date: new Date()
    };

    const articleID = await m.m.insertMany([newPostData]);
    res.redirect('/');
});



