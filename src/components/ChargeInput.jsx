import React from 'react';

export default (props) => {
	const {
		date,
		description,
		credit
	} = props;

	return (
		<tr>
			<td>{date}</td>
			<td>{description}</td>
			<td>{credit}</td>
		</tr>
	);
}


class AddCharge extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return
		<label>

		</label>
	}


};
