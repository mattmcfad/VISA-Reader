import React from 'react';

import { connect } from 'react-redux';
import { toJS } from 'immutable';

import Select from 'react-select';
import * as actionCreators from '../actions';

const Charge = class extends React.Component {

	constructor(props) {
		super(props);
		this.getCategories = this.getCategories.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	getCategories() {
		return this.props.categories.map(category =>
			{
				return {
					"label": category,
					"value": category
				}
			}
		).toJS();
	}

	handleChange(value) {
		this.props.addCategoryToCharge(this.props.description, value);
	}

	render() {
		return (
			<tr>
				<td>{this.props.date} bruh</td>
				<td>{this.props.description}</td>
				<td>{this.props.credit}</td>
				<td>
					<Select
						name={this.props.description}
						value={this.props.category}
						options={this.getCategories()}
						onChange={this.handleChange}
						/>
				</td>
			</tr>
		);
	}
}

function mapStateToProps(state) {
  return {
    categories: state.get('categories')
  };
}

export default connect(mapStateToProps, actionCreators)(Charge);
