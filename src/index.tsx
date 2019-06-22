import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import './index.css';
import App from './Example1';
import Example2 from './Example2';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <ul className="menu-bar">
        <li>
          <Link to="/">Example1</Link>
        </li>
        <li>
          <Link to="/example2">Example2</Link>
        </li>
      </ul>
    <div>
      <Route path="/" component={App} exact={true} />
      <Route path="/example2" component={Example2} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
