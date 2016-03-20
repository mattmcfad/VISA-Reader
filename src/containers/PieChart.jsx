import React, { PropTypes } from 'react';

import * as ImmutablePropTypes from 'react-immutable-proptypes';

import { PieChart } from 'react-d3';

const Pie = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div ref="container" className="border col-12">
        <div className="mx-auto" {...styles}>
          <PieChart {...d3Config} data={this.props.graphData}/>
        </div>
      </div>
    );
  }
};

const d3Config = {
  height: 350,
  width: 400,
  radius: 100,
  innerRadius: 20,
  sectorBorderColor: 'white',
  title: '',
};

const styles = {
  style: {
    maxWidth: '650px',
  },
};

Pie.propTypes = {
  charges: ImmutablePropTypes.list,
  graphData: PropTypes.array,
};

export default Pie;
