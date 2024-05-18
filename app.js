// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser')
// Initialize Express application
const app = express();
// Set the port for the application
const PORT = process.env.PORT || 3000;
// Set up view engine and static directory
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Establish connection to MongoDB database
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://hazel:l1fXOy2QKqJt53uX@atlascluster.8rg5z8l.mongodb.net/").then(() => {
    console.log('Connected to MongoDB');
    })
    .catch(() => {
    console.log('Failed to connect to MongoDB');
    })

// Define schema for posts
const postSchema = new mongoose.Schema ({
    title: String,
    content: String,
})
// Create model from the defined schema
const Post = new mongoose.model('Post', postSchema);

// Define route to display all posts
app.get('/', async (req, res) => {
    // Code to display all posts
    try {
        const posts = await Post.find({});
        res.render('index', {posts});
    } catch (err) {
        console.log(err);
    }
});

// Define route to display form for creating a new post
app.get('/new', (req, res) => {
    // Code to display form for creating a new post
    res.render('new')
});

// Handle route when there's a POST request to create a new post
app.post('/new', async (req, res) => {
    // Code to handle POST request to create a new post
    await Post.create(req.body.post);
    console.log(req.body);
    res.redirect("/");
});

// Define route to display form for editing a post
app.get('/edit/:id', async (req, res) => {
    // Code to display form for editing a post
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit', { post});
    } catch(err) {
        console.log(err);
    }
});

// Handle route when there's a POST request to edit a post
app.post('/edit/:id', async (req, res) => {
    // Code to handle POST request to edit a post
    await Post.findByIdAndUpdate(req.params.id, req.body.post);
    console.log(req.body);
    res.redirect("/");
});

// Handle route when there's a POST request to delete a post
app.post('/delete/:id', async (req, res) => {
    // Code to handle POST request to delete a post
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Listen for connections to the application on the specified port
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);    
});
