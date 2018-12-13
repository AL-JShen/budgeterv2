import React, { Component } from 'react';
import FirebaseUI from './FirebaseUI';

class Signin extends Component {

  componentDidMount() {
    FirebaseUI ('#firebaseui')
  }
  render() {
    return (
      <div>
        <div id="firebaseui"></div>
      </div>
    );
  }

}

export default Signin;
