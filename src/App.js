import React, { Component } from 'react';
import './App.css';
import Welcome from './Components/SignedOut/Welcome';
import Signin from './Components/Auth/Signin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">

          <ul>
            <li><Link to="/welcome">Welcome</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </ul>

          <Route exact path="/welcome" component={Welcome} />
          <Route path="/signin" component={Signin} />

        </div>
      </Router>

    );
  }
}

export default App;
