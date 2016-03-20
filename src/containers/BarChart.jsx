import React, { PropTypes } from 'react';

import * as ImmutablePropTypes from 'react-immutable-proptypes';

import { BarChart } from 'react-d3';

const Bar = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 border">
        <div className="mx-auto" {...styles}>
          <BarChart {...d3Config} data={this.props.graphData}/>
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
  style: {
    maxWidth: '800px',
  },
};

Bar.propTypes = {
  charges: ImmutablePropTypes.list,
  graphData: PropTypes.array,
};

export default Bar;
