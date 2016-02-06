import React from 'react';

import { connect } from 'react-redux';

import ChargeInput from '../components/ChargeInput';
import * as actionCreators from '../actions';

const AddCharge = class extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			"id": 10,
			"date": "12/31/2015",
			"description": "",
			"credit": 181.41
		};
	}

	handleChange (event) {
		const message = event.target.value;
		console.log('change: ', message);

		this.setState({
			description: message
		});
	}

	submitCharge () {
		const currentState = this.state;
		console.log(currentState);
		this.props.addCharge(currentState);
		this.setState({
			description: '',
			id: this.state.id + 1
		});
	}

	render() {

		return <label>
			<span>Charge description: </span>
			<input
				type="text"
				value={this.state.description}
				onChange={this.handleChange.bind(this)}
			/>
		<button onClick={this.submitCharge.bind(this)}>
				Add Charge
			</button>
		</label>
	}
};

function mapStateToProps(state) {
  return {
    charges: state.get('credit')
  };
}

export default connect(mapStateToProps, actionCreators)(AddCharge);
