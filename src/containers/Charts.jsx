import React from 'react';
import { connect } from 'react-redux';

import { Map } from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import BarChart from './BarChart';
import PieChart from './PieChart';

const Chart = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: 'pie',
      graphData: [],
    };
    this.updateGraphData = this.updateGraphData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.updateGraphData(nextProps, this.state.chartType);
  }

  displayChart(type) {
    this.updateGraphData(this.props, type);
  }

  updateGraphData(props, chartType) {
    const filteredData = props.charges.filter(charge => {
      return charge.get('category') !== '' && charge.get('credit') !== '';
    });

    const totalCredit = filteredData.reduce((sum, charge) => {
      return sum + parseFloat(charge.get('credit'));
    }, 0);

    const reducedData = filteredData.reduce((categoryMap, charge) => {
      const category = charge.get('category');
      return categoryMap.update(category, 0, (categoryTotal) => {
        return categoryTotal + parseFloat(charge.get('credit'));
      });
    }, new Map());

    let graphData;

    // format data to be D3 graph specific
    switch (chartType) {
    case 'pie':
      graphData = reducedData.map((categoryTotal, category) => {
        return {
          label: category,
          value: parseFloat(((categoryTotal / totalCredit) * 100.0).toFixed(2)),
        };
      }).toList().toJS();
      break;

    case 'bar':
      const values = reducedData.map((sum, category) => {
        return {
          'x': category,
          'y': sum,
        };
      }).toList().toJS();
      graphData = [{
        name: 'All Categories',
        values,
      }];
      break;

    default:
      graphData = [];
    }

    this.setState({ graphData, chartType: chartType }, ()=> console.log(this.state));
  }

  render() {
    const chart = (this.state.chartType === 'pie'
      ? <PieChart graphData={this.state.graphData} />
      : <BarChart graphData={this.state.graphData} />
    );

    const leftBtn = this.state.chartType === 'pie' ? 'btn-primary' : 'btn-outline';
    const rightBtn = this.state.chartType === 'bar' ? 'btn-primary' : 'btn-outline';

    return (
      <div className="border col-12">
        <div className="white">
          <h3 className="h5 mt0 p1 bg-blue">Graph</h3>
          <div className="inline-block clearfix blue">
            <button
              type="button"
              className={`left btn ${leftBtn} x-group-item rounded-left`}
              onClick={this.displayChart.bind(this, 'pie')}>
              Pie Chart</button>
            <button
              type="button"
              className={`left btn ${rightBtn} x-group-item rounded-right`}
              onClick={this.displayChart.bind(this, 'bar')}>
              Bar Chart</button>
          </div>
        </div>
        <div className="mx-auto" {...styles}>
          { chart }
        </div>
      </div>
    );
  }
};

const styles = {
  style: {
    maxWidth: '650px',
  },
};

Chart.propTypes = {
  charges: ImmutablePropTypes.list,
};

function mapStateToProps(state) {
  return {
    charges: state.credit.get('charges'),
  };
}

export default connect(mapStateToProps)(Chart);
