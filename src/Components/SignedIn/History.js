import React, { Component } from 'react';

class History extends Component {

  render() {
    return (
      <div>
        {this.props.transactions.map((item, i) => {
          const dat = item
          return (
            <div key={i}>A {dat.category} purchase on {new Date(dat.date).toDateString()} cost ${dat.cost}</div>
          )
        })}
      </div>
    );
  }
}

export default History;
