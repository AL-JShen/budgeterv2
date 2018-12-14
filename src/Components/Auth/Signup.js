import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../SignedIn/FirestoreDB';

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

      .then((user) => {
        if (user.additionalUserInfo.isNewUser) {
          db.collection('users').doc(user.user.uid).set({
            uid: user.user.uid,
            email: user.user.email,
            first: first,
            last: last,
          })
        }
        this.setState({
          first: '',
          last: '',
          email: '',
          pw: ''
        })
      })

      .catch((error) => {
        this.setState({
          error: error.message,
        })
      })

  }

  render() {
    return (
      <div>

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

export default Signup;
