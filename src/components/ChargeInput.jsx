import React from 'react';

const ChargeInput = class extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			'type': props.type,
			'value': ''
		};
	}

	handleChange (event) {
		this.setState({
			value: event.target.value
		});
	}

	handleBlur (event) {
		this.props.updateValue({
		  [this.state.type]: this.state.value
		});
	}

	render() {

		return <label>
			<span>{this.props.type}</span>
			<input
				type='text'
				value={this.state.value}
				onChange={this.handleChange.bind(this)}
				onBlur={this.handleBlur.bind(this)}
			/>
		</label>
	}
};

export default ChargeInput;
