import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import Select from 'react-select';
import * as actionCreators from '../actions';

const Charge = class extends React.Component {

  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCategories() {
    return this.props.categories.map(category => {
      return {
        'label': category,
        'value': category,
      };
    }).toJS();
  }

  handleChange(value) {
    this.props.addCategoryToChargeAndDictionary(this.props.description, value);
  }

  render() {
    const className = this.props.category ? {
      'gray': 'bg-light-gray',
      'blue': 'bg-light-blue',
      'green': 'bg-light-green',
    }
    : '';

    return (
      <tr className={`flex border-bottom py1`}>
        <td className="col-2 center">{this.props.date}</td>
        <td className="col-5">{this.props.description}</td>
        <td className="col-3 p0 center">
          <Select
            clearable={false}
            placeholder={' --- Select --- '}
            className={`center ${ className.blue }`}
            name={this.props.description}
            value={this.props.category}
            options={this.getCategories()}
            onChange={this.handleChange}
          />
        </td>
        <td className="col-2 right-align pr3">{this.props.credit}</td>
      </tr>
    );
  }
};

Charge.propTypes = {
  categories: PropTypes.object,
  'categories.map': PropTypes.func,
  addCategoryToChargeAndDictionary: PropTypes.func,
  description: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string,
  credit: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    categories: state.categories.get('types'),
  };
}

export default connect(mapStateToProps, actionCreators)(Charge);
