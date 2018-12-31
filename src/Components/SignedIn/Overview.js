import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Log from './Log';
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
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.props.getCurrentUser(user)
    }
  }

  componentDidMount() {
    this.updateUser();
  }

  render() {
    return (
      <div>

        <Sidebar />

        Hello {this.props.displayName}

        <Log />

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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
