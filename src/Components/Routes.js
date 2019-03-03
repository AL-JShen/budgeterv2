import React, { Component } from 'react';
import Welcome from './SignedOut/Welcome.js';
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';
import Signout from './Auth/Signout';
import History from './SignedIn/History';
import Overview from './SignedIn/Overview';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

function ConditionalLinks(props) {
  if (props.uid !== '') { // user is signed in
    return (
      <div>
        <ul>
          <li><Link to="/overview">Overview</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/signout">Sign Out</Link></li>
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          <li><Link to="/welcome">Welcome</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
        </ul>
      </div>
    )
  }
}

class Routes extends Component {

  render() {
    return (
      <Router>
        <div className="App">

          <ConditionalLinks uid={this.props.uid}/>

          <Route exact path="/welcome" component={Welcome} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/overview" component={Overview} />
          <Route path="/history" component={History} />
          <Route path="/signout" component={Signout} />

        </div>
      </Router>
    );
  }

}

const mapStateToProps = (state) => {
  return({
    displayName: state.user.displayName,
    uid: state.user.uid
  })
}

export default connect(mapStateToProps)(Routes);
