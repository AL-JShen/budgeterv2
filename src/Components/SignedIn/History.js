import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

class History extends Component {

  dateFormatter(cell, row) {
    return `${new Date(cell).toDateString().split(' ').slice(1).join(' ')}`;
  }

  categoryFormatter(cell, row) {
    return `${toTitleCase(cell)}`
  }

  costFormatter(cell, row) {
    return `$${parseFloat(cell).toFixed(2)}`
  }

  render() {
    console.log(this.props.transactions)
    return (
      <div>
        <BootstrapTable data={this.props.transactions} bordered={false}>
          <TableHeaderColumn dataField='id' isKey hidden>Transaction ID</TableHeaderColumn>
          <TableHeaderColumn dataField='date' dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='category' dataFormat={this.categoryFormatter}>Category</TableHeaderColumn>
          <TableHeaderColumn dataField='cost' dataFormat={this.costFormatter}>Cost</TableHeaderColumn>
          <TableHeaderColumn dataField='notes'>Notes</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return({
    transactions: state.transactions,
  })
}

export default connect(mapStateToProps)(History);
