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
						<Charge key={charge.get('id')}
							date={charge.get('date')}
							description={charge.get('description')}
							credit={charge.get('credit')}
							category={charge.get('category')}
						/>
					)}
				</tbody>
			</table>
		);
	}
}

function mapStateToProps(state) {
  return {
    charges: state.get('credit')
  };
}

export default connect(mapStateToProps)(Chart);
