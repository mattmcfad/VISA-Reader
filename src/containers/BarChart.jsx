import React from 'react';
import { connect } from 'react-redux';

import { Map } from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import { BarChart } from 'react-d3';

const Bar = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barData: [{
        'name': 'Test A',
        'values': [
          { 'x': 1, 'y': 150},
          { 'x': 3, 'y': 180},
          { 'x': 5, 'y': 130},
          { 'x': 7, 'y': 191},
          { 'x': 9, 'y': 201},
        ],
      }, {
        'name': 'Test B',
        'values': [
          { 'x': 1, 'y': 183},
          { 'x': 3, 'y': 210},
          { 'x': 5, 'y': 150},
          { 'x': 7, 'y': 291},
          { 'x': 9, 'y': 205},
        ],
      },
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

    // Count number of sum of charges per category
    const reducedData = filteredData.reduce((countedCategories, charge) => {
      const category = charge.get('category');
      return countedCategories.update(category, 0, (sum) => sum + parseFloat(charge.get('credit')));
    }, new Map()).map((sum, category) => {
      return {
        'x': category,
        'y': sum,
      };
    }).toList().toJS();

    // format into d3 state
    const barData = [{
      'name': 'All Categories',
      'values': reducedData,
    }];

    this.setState({ barData });
  }

  render() {
    return (
      <div className="col-12 border">
        <h3 className="h1 m0 p2 bg-blue white">Graph</h3>
        <div className="mx-auto" style={styles}>
          <BarChart
            data={this.state.barData}
            width={d3Config.width}
            height={d3Config.height}
            fill={d3Config.fill}
            title={d3Config.title}
            xAxisLabel={d3Config.xAxisLabel}
            yAxisLabel={d3Config.yAxisLabel}
          />
        </div>
      </div>
    );
  }
};

const d3Config = {
  width: 800,
  height: 800,
  fill: 'blue',
  title: 'Bar Chart',
  xAxisLabel: 'Categories',
  yAxisLabel: '$',
};

const styles = {
  maxWidth: '800px',
};

Bar.propTypes = {
  charges: ImmutablePropTypes.list,
};

function mapStateToProps(state) {
  return {
    charges: state.credit.get('charges'),
  };
}

export default connect(mapStateToProps)(Bar);
