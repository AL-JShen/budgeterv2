import React, { Component } from 'react';
import { VictoryLabel, VictoryTooltip, VictoryPie} from 'victory';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

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
    this.categoricalCosts = this.categoricalCosts.bind(this);
  }

  categoricalCosts() {
    let cats = [];
    this.props.transactions.reduce((acc, cur) => {
      if (!(acc[cur.category])) {
        acc[cur.category] = {'category': toTitleCase(cur.category), 'cost': 0, 'count': 0};
        cats.push(acc[cur.category]);
      }
      acc[cur.category].cost += parseInt(cur.cost);
      acc[cur.category].count += 1;
      return acc
    }, {});
    return cats
  }

  render() {

    let renderDat = this.categoricalCosts()
    if (this.state.dummy) {
      renderDat = this.categoricalCosts().slice(0,1)
      setTimeout(() => { this.setState({ dummy: false }); }, 10);
    }

    return (
      <div>
          <VictoryPie
            animate={{ duration: 2000 }}
            colorScale='qualitative'
            style={{ labels: { fill: "#fff", fontSize: 8, padding: 10, textAlign: "center"}}}
            innerRadius={100}
            outerRadius={140}
            labelRadius={115}
            labelComponent={<Label/>}
            labels={(d) => `${d.category}\n$${d.cost}`}
            data={renderDat}
            x={(d) => d.category}
            y={(d) => d.cost}
          />
      </div>
    );
  }
}

export default Pie;
