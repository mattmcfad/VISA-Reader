import React from 'react';
import { connect } from 'react-redux';

import Charge from '../components/Charge';

const Chart = class extends React.Component {
  constructor(props) {
    super(props);
  }

  getData() {
    return this.props.charges;
  }

  render() {
    return (<section className="col-12">
      <table className="border">
        <thead className="white bg-blue">
          <tr className="flex left-align rounded bold">
            <th className="col-2 ">Date</th>
            <th className="col-5">Description</th>
            <th className="col-2">Credit</th>
            <th className="col-3 pl0 center">Category</th>
          </tr>
        </thead>
        <tbody className="overflow-scroll block" style={ styles }>
          {this.getData().map(charge =>
            <Charge key={charge.get('id')}
              date={charge.get('date')}
              description={charge.get('description')}
              credit={charge.get('credit')}
              category={charge.get('category')}
            />
          )}
        </tbody>
      </table>
    </section>);
  }
};

const styles = {
  maxHeight: '400px',
};

function mapStateToProps(state) {
  return {
    charges: state.get('credit'),
  };
}

export default connect(mapStateToProps)(Chart);
