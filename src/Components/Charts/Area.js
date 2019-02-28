import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class AreaChart extends Component {

  componentWillMount() {
    console.log(
      this.props.transactions.map((trans) => (
      {'x': trans.date, 'y': trans.cost}
      )).sort((t1, t2) => {
        return t1.x - t2.x
      })
    )
  }
  render() {
    return (
      <div>
        <Line
          data={{
            datasets: [{
              fill: true,
              label: 'Spendings',
              data:
                this.props.transactions.map((trans) => (
                  {'x': trans.date, 'y': trans.cost}
                )).sort((t1, t2) => {
                  return t1.x - t2.x
                })
            }]
          }}
          options={{
            bezierCurve: false,
            scales: {
              xAxes: [{
                type: 'time',
                stacked: true
              }]
            }
          }}
        />
      </div>
    );
  }

}

export default AreaChart;
