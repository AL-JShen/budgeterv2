import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../SignedIn/FirestoreDB';
import { connect } from 'react-redux';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      pw: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const email = this.state.email;
    const password = this.state.pw;
    const first = this.state.first;
    const last = this.state.last;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        var userDoc = db.collection('users').doc(result.user.uid)
        userDoc.get()
          .then((doc) => {
            if (doc.exists) {
              //pass
            } else {
              userDoc.set({
                uid: result.user.uid,
                email: result.user.email,
                first: first,
                last: last,
              })
            }
          })

        const newUser = firebase.auth().currentUser;
        newUser.sendEmailVerification();
        newUser.updateProfile({
          displayName: `${first} ${last}`
        })
        this.props.getCurrentUser(newUser)
        this.setState({
          first: '',
          last: '',
          email: '',
          pw: ''
        })
        this.props.history.push('/overview')
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        })
      })
  }

  handleGoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        var userDoc = db.collection('users').doc(result.user.uid);
        userDoc.get()
          .then((doc) => {
            if (doc.exists) {
              //pass
            } else {
              userDoc.set({
                uid: result.user.uid,
                email: result.user.email,
                first: result.user.displayName.split(' ')[0],
                last: result.user.displayName.split(' ')[1]
              })
            }
          })
        this.props.history.push('/overview');
      })
  }

  render() {
    return (
      <div>

        <div>
          <button onClick={this.handleGoogleAuth}>Sign in with Google</button>
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name='first' placeholder='First Name' value={this.state.first} onChange={this.handleChange} />
            <input type="text" name='last' placeholder='Last Name' value={this.state.last} onChange={this.handleChange} />
            <input type="text" name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange} />
            <input type="password" name='pw' placeholder='Password' value={this.state.pw} onChange={this.handleChange} />
            {this.state.error}
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return({
    displayName: state.user.displayName,
    uid: state.user.uid,
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    getCurrentUser: (user) => {
      dispatch({
        type: 'GET_USER',
        user: user
      })
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
