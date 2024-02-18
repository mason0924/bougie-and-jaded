const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'bougie_admin',
  host: 'bougie_host',
  database: 'bougie_database_name',
  password: 'bougie_password!',
  port: 5432,
});

// Middleware to parse JSON in request body
app.use(express.json());

// Route to get all blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new blog post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, media } = req.body;

    // Validate that required fields are present
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Insert the new blog post into the "posts" table
    const result = await pool.query(
      'INSERT INTO posts (title, content, media) VALUES ($1, $2, $3) RETURNING *',
      [title, content, media]
    );

    res.status(201).json(result.rows[0]); // Respond with the created blog post
  } catch (error) {
    console.error('Error creating blog post', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a blog post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, media } = req.body;

    // Validate that required fields are present
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Update the blog post in the "posts" table
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2, media = $3 WHERE id = $4 RETURNING *',
      [title, content, media, postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(result.rows[0]); // Respond with the updated blog post
  } catch (error) {
    console.error('Error updating blog post', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a blog post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete the blog post from the "posts" table
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [postId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
