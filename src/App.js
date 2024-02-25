// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Blog from './components/Blog';
import NewPostForm from './components/NewPostForm';
import Navbar from './components/Navbar';
import backgroundImage from './img/wixref.webp';

const appStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  height: '100vh', // Adjust the height as needed
  // Add other background-related styles if necessary
};

const App = () => {
  return (
    <div style={appStyle}>
      {/* Other components or layout */}
      <Blog />
      <NewPostForm />
    </div>
  );
};

export default App;
