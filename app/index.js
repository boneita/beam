// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { Router, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import routes from './routes';
import configureStore from './redux/store/configureStore';
import './app.global.css';
import HomePage from './modules/homepage/HomePage';
import Database from './utils/Database';

// Pull Databa from JSONDB
const initialState = require('./data');

// Create Database connection
window.database = new Database({
  file: './db.json',
  initialState: initialState.slides
});

// Configure Redux Store
window.store = configureStore(initialState);

// const history = syncHistoryWithStore(hashHistory, store);
const homePage = new HomePage(document.getElementById('root'));
homePage.mount();

// render(
//   <Provider store={store}>
//     <div>Hello World</div>
//     {/* <Router history={history} routes={routes} /> */}
//   </Provider>,
//   document.getElementById('root')
// );

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
  // require('remotedev-extension')(store);
}
