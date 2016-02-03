import React from "react";
import Charge from '../components/Charge';
import mockData from '../mock/data.json';

export class Chart extends React.Component {
	constructor(props) {
		super(props);
	}

	getData() {
		return mockData;
	}
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Credit</th>
					</tr>
				</thead>
				<tbody>
					{this.getData().map(charge =>
						<Charge key={charge.id}
							date={charge.date}
							description={charge.description}
							credit={charge.credit}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
