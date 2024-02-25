// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Blog from './components/Blog';
import NewPostForm from './components/NewPostForm';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      {/* Other components or layout */}
      <Blog />
      <NewPostForm />
    </div>
  );
};

export default App;
