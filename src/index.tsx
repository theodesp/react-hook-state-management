import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import './index.css';
import App from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import Example4 from './Example4';
import Example5 from './Example5';
import Example6 from './Example6';
import * as serviceWorker from './serviceWorker';

const Routes: React.FC = (): JSX.Element => (
  <Router>
    <ul className="menu-bar">
        <li>
          <Link to="/">Example1</Link>
        </li>
        <li>
          <Link to="/example2">Example2</Link>
        </li>
        <li>
          <Link to="/example3">Example3</Link>
        </li>
        <li>
          <Link to="/example4">Example4</Link>
        </li>
        <li>
          <Link to="/example5">Example5</Link>
        </li>
        <li>
          <Link to="/example6">Example6</Link>
        </li>
      </ul>
    <div>
      <Route path="/" component={App} exact={true} />
      <Route path="/example2" component={Example2} />
      <Route path="/example3" component={Example3} />
      <Route path="/example4" component={Example4} />
      <Route path="/example5" component={Example5} />
      <Route path="/example6" component={Example6} />
    </div>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
