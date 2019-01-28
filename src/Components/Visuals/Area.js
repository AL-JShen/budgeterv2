import React, { Component } from 'react';
import { VictoryChart, VictoryStack, VictoryArea } from 'victory';

class Area extends Component {

  render() {
    return (
      <div>
        <VictoryChart
          animate={{ duration: 1000 }}
          scale={{ x: "time" }}
          width={400}
          height={400}
          >
          <VictoryStack colorScale="warm">

            <VictoryArea data={[
              { x: new Date(1986, 1, 1), y: 2 },
              { x: new Date(1996, 1, 1), y: 3 },
              { x: new Date(2006, 1, 1), y: 5 },
              { x: new Date(2016, 1, 1), y: 4 }
            ]}/>

            <VictoryArea data={[
              { x: new Date(1986, 1, 1), y: 4 },
              { x: new Date(1996, 1, 1), y: 3 },
              { x: new Date(2006, 1, 1), y: 2 },
              { x: new Date(2016, 1, 1), y: 5 }
            ]}/>

            <VictoryArea data={[
              { x: new Date(1986, 1, 1), y: 3 },
              { x: new Date(1996, 1, 1), y: 1 },
              { x: new Date(2006, 1, 1), y: 4 },
              { x: new Date(2016, 1, 1), y: 2 }
            ]}/>

          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }

}

export default Area;
