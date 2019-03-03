import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

class History extends Component {

  render() {
    return (
      <div>
        {this.props.transactions.map((item, i) => {
          const dat = item;
          return (
            <div key={i} className='transactionContainer'>
              <Collapsible trigger={`${toTitleCase(dat.category)} $${dat.cost.toFixed(2)}`}
                triggerTagName='collapsibleTrigger'
                className='collapsibleContainer'>

                <div className="collapsibleContent">
                  <p>{new Date(dat.date).toDateString()}</p>
                  <p>{dat.notes}</p>
                </div>

              </Collapsible>

            </div>

          )
        })}
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
