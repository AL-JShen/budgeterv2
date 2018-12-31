import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Log from './Log';
import db from './FirestoreDB';
import firebase from 'firebase';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';
import { connect } from 'react-redux';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];



class Overview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    }
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
      this.setState({
        transactions: Array.from(docSnapshot.docs)
      }, () => {
        this.state.transactions.forEach((item) => {
          console.log(item.data())
        })
      })
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

        {this.state.transactions.map((item, i) => (
          <div key={i}>{item.data().cost}</div>
        ))}

        <div className='overview'>
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar
              data={data}
              x='quarter'
              y='earnings'/>
          </VictoryChart>
        </div>

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

const mapDispatchToProps = (dispatch) => ({
    getCurrentUser: (user) => {
      dispatch({
        type: 'GET_USER',
        user: user
      })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
