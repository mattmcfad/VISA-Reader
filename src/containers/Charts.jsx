import React from 'react';
import { connect } from 'react-redux';

import { Map } from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import { BarChart, PieChart } from '../components';

const Chart = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: 'pie',
      graphData: [],
      size: 500,
    };
    this.updateGraphData = this.updateGraphData.bind(this);
  }
  componentDidMount() {
    const size = this.refs.container.offsetWidth;
    this.setState({ size });
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

    this.setState({ graphData, chartType});
  }

  render() {
    const chart = (this.state.chartType === 'pie'
      ? <PieChart graphData={this.state.graphData} size={this.state.size}/>
      : <BarChart graphData={this.state.graphData} size={this.state.size}/>
    );

    const leftBtn = this.state.chartType === 'pie' ? 'btn-primary' : 'btn-outline';
    const rightBtn = this.state.chartType === 'bar' ? 'btn-primary' : 'btn-outline';

    return (
      <div className="border col-12" ref="container">
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
        <div className="mx-auto px2" {...styles}>
          { chart }
        </div>
      </div>
    );
  }
};

const styles = {
  style: {},
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
