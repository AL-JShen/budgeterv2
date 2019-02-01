import React, { Component } from 'react';
import { VictoryChart, VictoryTooltip, VictoryBar } from 'victory';

class Bar extends Component {

  render() {
    return (
      <div>
        <VictoryChart domainPadding={20}
                      width={600}
                      height={600}
                      scale={{ x: "time" }}>
          <VictoryBar
            animate={{ duration: 1000 }}
            labelComponent={<VictoryTooltip/>}
            data={this.props.transactions}
            labels={(d) => d.cost}
            x={(d) => new Date(d.date)}
            y={(d) => d.cost} />
        </VictoryChart>
      </div>
    );
  }

}

export default Bar;
