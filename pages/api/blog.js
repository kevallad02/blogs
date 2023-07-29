const { default: dbConnect } = require('@/db/mongoose');
const BlogModel = require('@/models/blog');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin');
const auth = require('@/middleware/authenticate');
require('dotenv').config();
dbConnect();

async function addBlog(req, res, next) {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization;
    }
    if (!token) {
        return res.status(401).json({ status: false, message: 'You are not logged in! Please log in to continue' });
    }
    if (req.method === 'POST') {
        try {
            const { title, shortDescription, image, longDescription, category } = req.body;

            // Create a new blog post with additional user information from the admin document
            const newPost = new BlogModel({
                title,
                shortDescription,
                image,
                longDescription,
                category, // Assuming the Admin model has an '_id' field
            });

            // Save the blog post to the database
            await newPost.save();

            res.status(201).json({ message: 'Blog created successfully' });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Error creating post', error: error.message });
        }
    }
    const { id } = req.query;
    if (req.method === 'GET' && id === undefined) {
        try {
            // Fetch all blog data from MongoDB
            const blogs = await BlogModel.find({}).exec();

            res.status(200).json({ blogs });
        } catch (error) {
            console.error('Error fetching blogs:', error);
            res.status(500).json({ message: 'Error fetching blogs', error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const { id } = req.query;

            // Fetch the blog post by ID from MongoDB
            const blog = await BlogModel.findById(id).exec();

            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            res.status(200).json({ blog });
        } catch (error) {
            console.error('Error fetching blog by ID:', error);
            res.status(500).json({ message: 'Error fetching blog by ID', error: error.message });
        }
    }
}

module.exports = addBlog;
