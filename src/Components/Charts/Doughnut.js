import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

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
          options={{
            plugins: {
              colorschemes: {
                scheme: 'brewer.Paired12'
              }
            }
          }}
        />
      </div>
    );
  }

}

export default DoughnutChart;
