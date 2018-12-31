import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

class Signout extends Component {

  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    firebase.auth().signOut()
      .then(() => {
        alert('Signed out successfully.');
        this.props.signOut()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
          <button onClick={this.handleSignout}>Sign Out</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    signOut: () => {
      dispatch({
        type: 'SIGN_OUT'
      })
    }
  })
}

export default connect(null, mapDispatchToProps)(Signout);
