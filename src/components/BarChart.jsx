import React, { PropTypes } from 'react';

import * as ImmutablePropTypes from 'react-immutable-proptypes';

import { BarChart } from 'react-d3';

const Bar = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const size = this.props.size;
    return (
      <BarChart
        data={this.props.graphData}
        width={size}
        height={size}
        {...d3Config}
      />
    );
  }
};

const d3Config = {
  fill: 'blue',
  title: 'Bar Chart',
  xAxisLabel: 'Categories',
  yAxisLabel: '$',
};

Bar.propTypes = {
  charges: ImmutablePropTypes.list,
  graphData: PropTypes.array,
  size: PropTypes.number,
};

export default Bar;
