const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "you need to provide some title!"],
        maxLength: 300
    },
    desc: {
        type: String,
        required: false,
        default: "No Description Provided!"
    },
    markdown: {
        type: String,
        required: [true, "you need to provide country details!!"]
    },
    date: {
        type: Date,
        required: true
    }
});

const article = mongoose.model('Article', schema);
exports.m = article;
