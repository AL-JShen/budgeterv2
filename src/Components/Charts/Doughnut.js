import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class DoughnutChart extends Component {

  render() {
    return (
      <div>
        <Doughnut
          data={{
            labels: this.props.categoricals.map((cat) => cat.category),
            datasets: [{
              data: this.props.categoricals.map((cat) => cat.cost)
            }]
          }}
          redraw
        />
      </div>
    );
  }

}

export default DoughnutChart;
