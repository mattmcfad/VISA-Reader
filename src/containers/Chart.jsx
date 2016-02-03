import React from 'react';
import {connect} from 'react-redux';

import Charge from '../components/Charge';

const Chart = class extends React.Component {
	constructor(props) {
		super(props);
	}

	getData() {

		return this.props.charges;
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

function mapStateToProps(state) {
  return {
    charges: state.get('credit').toJS()
  };
}

export default connect(mapStateToProps)(Chart);
