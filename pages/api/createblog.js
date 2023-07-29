// File: ./pages/api/blogs.js
import Blog from '@/models/blog';
import dbConnect from '../../db/mongoose';
import authenticate from '../../middlewares/authenticate'; // Import the middleware

export default authenticate(async function handler(req, res) {
    if (req.method === 'POST') {
        // Create a new blog post
        try {
            const { title, shortDescription, image, longDescription, category } = req.body;
            const blog = new Blog({
                title,
                shortDescription,
                image,
                longDescription,
                category,
            });
            await blog.save();
            res.status(201).json({ message: 'Blog post created successfully!' });
        } catch (error) {
            console.error('Error creating blog post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        // Get all blog posts
        try {
      const conn = await dbConnect();
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
});
