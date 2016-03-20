import React, { PropTypes } from 'react';

import * as ImmutablePropTypes from 'react-immutable-proptypes';

import { PieChart } from 'react-d3';

const Pie = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const size = this.props.size;
    const radius = ( size / 2 ) - 100;
    return (
      <PieChart
        data={this.props.graphData}
        width={size}
        height={size}
        radius={radius}
        {...d3Config}
      />
    );
  }
};

const d3Config = {
  innerRadius: 20,
  sectorBorderColor: 'white',
  title: '',
};

Pie.propTypes = {
  charges: ImmutablePropTypes.list,
  graphData: PropTypes.array,
  size: PropTypes.number,
};

export default Pie;
