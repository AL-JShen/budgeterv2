import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Log from './Log';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';
import firebase from 'firebase';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class Overview extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          ...user
        })
      }
    });
  }

  render() {
    return (
      <div>

        <Sidebar />
        <Log />

        Hello {this.state.displayName}
        <br />
        User {this.state.uid}

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

export default Overview;
