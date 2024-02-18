// NewPostForm.js

import React, { useState } from 'react';
import axios from 'axios';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to create a new blog post
    try {
      await axios.post('/api/posts', { title, content });
      // Optionally, you can redirect or update the state after a successful post
    } catch (error) {
      console.error('Error creating blog post', error);
    }
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPostForm;
