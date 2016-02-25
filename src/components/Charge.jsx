import React from 'react';

import { connect } from 'react-redux';
// import { toJS } from 'immutable';

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
    this.props.addCategoryToCharge(this.props.description, value);
  }


  render() {
    const className = this.props.category ? {
      'gray': 'bg-light-gray',
      'blue': 'bg-light-blue',
      'green': 'bg-light-green',
    }
    : '';


    return (
      <tr className={`flex border-bottom py1 ${ '' }`}>
        <td className="col-2">{this.props.date}</td>
        <td className="col-5">{this.props.description}</td>
        <td className="col-2">{this.props.credit}</td>
        <td className="col-3 p0">
          <Select
            clearable={false}
            placeholder={' --- Select --- '}
            className={` center ${ className.blue }`}
            name={this.props.description}
            value={this.props.category}
            options={this.getCategories()}
            onChange={this.handleChange}
          />
        </td>
      </tr>
    );
  }
};

function mapStateToProps(state) {
  return {
    categories: state.get('categories'),
  };
}

export default connect(mapStateToProps, actionCreators)(Charge);
