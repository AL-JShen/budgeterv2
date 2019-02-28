import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {

  render() {
    return (
      <div>
        <Bar
          data={{
            datasets: [{
              label: 'Spendings',
              stack: 'x',
              data: this.props.transactions.map((trans) => (
                {'x': trans.date, 'y': trans.cost}
              ))
            }]
          }}
          options={{
            scales: {
              xAxes: [{
                type: 'time',
                stacked: true,
                barPercentage: 0.1
              }],
              yAxes: [{
                stacked: true
              }]
            },
            // title: {
            //   display: true,
            //   text: 'Hello there.'
            // }
          }}
          redraw
        />
      </div>
    );
  }

}

export default BarChart;
