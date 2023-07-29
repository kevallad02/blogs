const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    image: { type: String }, // This will store the image URL or filename
    longDescription: { type: String, required: true },
    category: { type: String, required: true }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;