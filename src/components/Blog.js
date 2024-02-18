// Blog.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog data from your Express server
    axios.get('/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching blog data', error));
  }, []);

  return (
    <div>
      <h1>Your Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {/* Add any other details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
