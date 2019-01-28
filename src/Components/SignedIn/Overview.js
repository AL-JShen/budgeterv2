import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Log from './Log';
import Bar from '../Visuals/Bar.js';
import Pie from '../Visuals/Pie.js';
import Area from '../Visuals/Area.js';
import db from './FirestoreDB';
import firebase from 'firebase';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip} from 'victory';
import { connect } from 'react-redux';

class Overview extends Component {

  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  updateUser() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.props.getCurrentUser(user)
    }
  }

  getTransactions() {
    let transList = db.collection('users').doc(this.props.uid).collection('transactions');
    transList.onSnapshot((docSnapshot) => {
      let dat = docSnapshot.docs.map((doc) => ({
        category: doc.data().category,
        cost: doc.data().cost,
        date: doc.data().date.seconds * 1000
      }))
      this.props.getTransactions(dat);
    })
  }

  componentWillMount() {
    this.updateUser();
    this.getTransactions();
  }

  render() {
    return (
      <div>

        <Sidebar />

        Hello {this.props.displayName}

        <Log />

        {this.props.transactions.map((item, i) => {
          const dat = item
          return (
            <div key={i}>A {dat.category} purchase on {new Date(dat.date).toDateString()} cost ${dat.cost}</div>
          )
        })}

        <div className='overview'>

          <div className='bar'>
            <Bar {...this.props} />
          </div>

          <div className='pie'>
            <Pie {...this.props} />
          </div>

          <div className='area'>
            <Area {...this.props}/>
          </div>

        </div>


      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return({
    displayName: state.user.displayName,
    uid: state.user.uid,
    transactions: state.transactions
  })
}

const mapDispatchToProps = (dispatch) => ({
    getCurrentUser: (user) => {
      dispatch({
        type: 'GET_USER',
        user: user
      })
    },
    getTransactions: (transactions) => {
      dispatch({
        type: 'GET_TRANSACTIONS',
        transactions: transactions
      })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
