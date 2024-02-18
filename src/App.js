// App.js

import React from 'react';
import Blog from './components/Blog';
import NewPostForm from './components/NewPostForm';

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
