import React from 'react';

export default (props) => {
	const {
		date,
		description,
		credit,
		category
	} = props;

	return (
		<tr>
			<td>{date}</td>
			<td>{description}</td>
			<td>{credit}</td>
			<td>{category}</td>
		</tr>
	);
}
