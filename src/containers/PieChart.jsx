import React from 'react';
import { connect } from 'react-redux';

import { Map } from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import { PieChart } from 'react-d3';

const Pie = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: [
        {label: 'Margarita', value: 20.0},
        {label: 'John', value: 55.0},
        {label: 'Tim', value: 25.0 },
      ],
    };
    this.updateGraphData = this.updateGraphData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.updateGraphData(nextProps);
  }

  updateGraphData(props) {
    // filter any non-categorized charges
    const filteredData = props.charges.filter(charge => {
      return charge.get('category') !== '' && charge.get('credit') !== '';
    });

    const totalCredit = filteredData.reduce((sum, charge) => {
      return sum + parseFloat(charge.get('credit'));
    }, 0);

    // Count number of charges per category
    const reducedData = filteredData.reduce((countedCategories, charge) => {
      const category = charge.get('category');
      return countedCategories.update(category, 0, (count) => {
        return count + parseFloat(charge.get('credit'));
      });
    }, new Map()).map((categoryTotal, category) => {
      // format into d3 state
      return {
        label: category,
        value: parseFloat(((categoryTotal / totalCredit) * 100.0).toFixed(2)),
      };
    }).toList().toJS();

    this.setState({
      graphData: reducedData,
    });
  }

  render() {
    return (
      <div className="col-12 border">
        <h3 className="h1 m0 p2 bg-blue white">Graph</h3>
        <div className="mx-auto" {...styles}>
          <PieChart {...d3Config} data={this.state.graphData}/>
        </div>
      </div>
    );
  }
};

const d3Config = {
  height: 650,
  width: 650,
  radius: 250,
  innerRadius: 40,
  sectorBorderColor: 'white',
  title: 'Categories',
};

const styles = {
  style: {
    maxWidth: '650px',
  },
};

Pie.propTypes = {
  charges: ImmutablePropTypes.list,
};

function mapStateToProps(state) {
  return {
    charges: state.credit.get('charges'),
  };
}

export default connect(mapStateToProps)(Pie);
