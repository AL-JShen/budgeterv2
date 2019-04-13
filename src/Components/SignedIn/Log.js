import React, { Component } from 'react';
import db from './FirestoreDB';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';

class Log extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cost: '',
      category: '',
      notes: '',
      date: new Date(),
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleLog = this.handleLog.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDate(date) {
    this.setState({
      date: date
    })
    console.log(date)
  }

  handleLog(event) {
    event.preventDefault()
    if (this.state.cost !== '' && this.state.category !== '') {
      const cost = this.state.cost;
      const category = this.state.category;
      const notes = this.state.notes ? category : this.state.notes
      const date = new Date(this.state.date.getFullYear(),
                            this.state.date.getMonth(),
                            this.state.date.getDate())
      this.setState({
        cost: '',
        category: '',
        notes: '',
        date: new Date(),
        error: ''
      })
      db.collection('users').doc(this.props.uid).collection('transactions').add({
        cost: cost,
        category: category,
        notes: notes,
        date: date
      })
    } else {
      this.setState({
        error: 'You need to enter a cost and a category.'
      })
    }

    // .then((docRef) => {
    //   console.log("Document written with ID: ", docRef.id);
    // })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLog}>
          <input type="number" step="0.01" min="0" name="cost" placeholder='Cost' value={this.state.cost} onChange={this.handleChange} />
          <input type="text" name="category" placeholder='Category' value={this.state.category} onChange={this.handleChange} />
          <input type="text" name="notes" placeholder="Notes" value={this.state.notes} onChange={this.handleChange} />
          <DatePicker dateFormat="yyyy-MM-dd" selected={this.state.date} onChange={this.handleDate} />
          <br />
          <button type="submit">Log transaction.</button>
        </form>
        {this.state.error}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return({
    displayName: state.user.displayName,
    uid: state.user.uid
  })
}

export default connect(mapStateToProps)(Log);
