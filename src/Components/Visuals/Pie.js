import React, { Component } from 'react';
import { VictoryLabel, VictoryTooltip, VictoryPie} from 'victory';

class Label extends Component {

  render() {
    return (
      <svg>
        <g>
          <VictoryLabel {...this.props}/>
          <VictoryTooltip
            {...this.props}
            x={200} y={260}
            text={
              `${this.props.datum.category}
              ______
              ${'\n'}
              ${this.props.datum.count} transactions\n
              Average cost: $${this.props.datum.cost/this.props.datum.count}
              ${((this.props.slice.endAngle-this.props.slice.startAngle)*50/Math.PI).toFixed(1)}% of spendings
              `}
            orientation="top"
            pointerLength={0}
            cornerRadius={65}
            width={130}
            height={130}
            flyoutStyle={{ fill: "#111", stroke: "#05a5d1", strokeWidth: "2"}}
          />
        </g>
      </svg>
    );
  }
}

Label.defaultEvents = VictoryTooltip.defaultEvents;

class Pie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dummy: true
    }
  }

  render() {
    return (
      <div>
          <VictoryPie
            animate={{ duration: 1000 }}
            colorScale='qualitative'
            style={{ labels: { fill: "#fff", fontSize: 8, padding: 10, textAlign: "center"}}}
            innerRadius={100}
            outerRadius={140}
            labelRadius={115}
            labelComponent={<Label/>}
            labels={(d) => `${d.category}\n$${d.cost}`}
            data={this.props.categoricals}
            x={(d) => d.category}
            y={(d) => d.cost}
          />
      </div>
    );
  }
}


export default Pie;
