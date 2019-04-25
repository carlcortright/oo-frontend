import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Abril Fatface', 'Actor']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
