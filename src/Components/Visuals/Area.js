import React, { Component } from 'react';
import { VictoryChart, VictoryStack, VictoryArea } from 'victory';

class Area extends Component {

  render() {

    const areas = this.props.categoricals.map((category, idx) => {
      return (
        <VictoryArea
          key={idx}
          data={category.transactions}
          x={(d) => d.date}
          y={(d) => d.cost}
        />
      )
    })

    return (
      <div>
        <VictoryChart
          animate={{ duration: 1000 }}
          scale={{ x: "time" }}
          width={400}
          height={400}
          >
          <VictoryStack colorScale="warm">
            {areas}
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }

}

export default Area;
