import React, { Component } from 'react';
import './App.css';
import Welcome from './Components/SignedOut/Welcome';
import Signup from './Components/Auth/Signup';
import Signin from './Components/Auth/Signin';
import Signout from './Components/Auth/Signout';
import Overview from './Components/SignedIn/Overview';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//testing

class App extends Component {

  render() {
    return (

      <Router>
        <div className="App">

          <ul>
            <li><Link to="/welcome">Welcome</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/overview">Overview</Link></li>
            <li><Link to="/signout">Sign Out</Link></li>

          </ul>

          <Route exact path="/welcome" component={Welcome} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/overview" component={Overview} />
          <Route path="/signout" component={Signout} />

        </div>
      </Router>

    );
  }
}

export default App;
