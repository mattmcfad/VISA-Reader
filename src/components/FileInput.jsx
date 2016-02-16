import React from 'react';

import { connect } from 'react-redux';

import * as actionCreators from '../actions';

// import Papa from 'todo...'

const FileInput = class extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			file: '',
			isLoading: false
		};
		this.parseCSV = this.parseCSV.bind(this);
	}

	handleChange (event) {
		this.setState({
			file: event.target.files[0]
		});
	}

	handleClick (event) {
		event.preventDefault();

		if (this.state.file) {
			this.setState({
				isLoading: true
			}, this.parseCSV());
		}
	}

	parseCSV () {
		var self = this;
		Papa.parse(this.state.file, {
			header: true,
			skipEmptyLines: true,
			beforeFirstChunk: function(chunk) {
				const headers = 'date,description,credit,debit,balance\r\n'
				return headers + chunk;
			},
			error: function(error, file) {
				console.error('error', error, file);
			},
			complete: function(results, file) {
				self.setState({
					file: '',
					isLoading: false
				});
				self.addCharges(results);
			}
		});
	}

	addCharges (results) {
		const data = results.data
		const startId = this.props.charges.first().get('id') + 1;

		data.forEach((charge, index) => {
			charge.id = startId + index;
			this.props.addCreditCharge(charge);
		});
	}

	render() {
		const submitButton = (!this.state.isLoading
			? <button
					onClick={this.handleClick.bind(this)}
					type='submit'
				>
					Upload
				</button>
			: <span>Loading!!!</span>
		);

		return <form>
			<input
				type='file'
				onChange={this.handleChange.bind(this)}
			/>
			{submitButton}
		</form>
	}
}

function mapStateToProps(state) {
  return {
    charges: state.get('credit')
  };
}

export default connect(mapStateToProps, actionCreators)(FileInput);