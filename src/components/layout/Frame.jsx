import React from 'react';
import Header from './Header.jsx';

const Frame = (Page) => (
  <div>
    <Header />
    <div>
      {Page}
    </div>
  </div>
);

export default Frame;
