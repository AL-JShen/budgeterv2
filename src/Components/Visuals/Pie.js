import React, { Component } from 'react';
import { VictoryLabel, VictoryTooltip, VictoryPie } from 'victory';
import { connect } from 'react-redux';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

class Label extends Component {

  render() {
    console.log('props', this.props)
    return (
      <svg>
        <g>
          <VictoryLabel {...this.props}/>
          <VictoryTooltip
            {...this.props}
            x={200} y={270}
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
            flyoutStyle={{ fill: "black" }}
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
    this.categoricalCosts = this.categoricalCosts.bind(this);
  }

  componentWillMount() {
    console.log(this.categoricalCosts())
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
    return (
      <div>
          <VictoryPie
            style={{ labels: { fill: "white", fontSize: 8, padding: 10, textAlign: "center"}}}
            innerRadius={100}
            labelRadius={120}
            labelComponent={<Label/>}
            labels={(d) => `${d.category}\n$${d.cost}`}
            data={this.categoricalCosts()}
            x={(d) => d.category}
            y={(d) => d.cost}
          />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return({
    transactions: state.transactions
  })
}

const mapDispatchToProps = (dispatch) => ({
    getTransactions: (transactions) => {
      dispatch({
        type: 'GET_TRANSACTIONS',
        transactions: transactions
      })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Pie);;
