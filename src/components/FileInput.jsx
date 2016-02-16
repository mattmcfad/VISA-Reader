import React from 'react';

import { connect } from 'react-redux';

import * as actionCreators from '../actions';

import { fromJS } from 'immutable';

// import Papa from 'todo...'

const FileInput = class extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			file: ''
		};

		this.parseCSV = this.parseCSV.bind(this);
	}

	handleChange (event) {
		this.setState({
			file: event.target.files[0]
		});
	}

	handleClick (event) {
		this.parseCSV();
	}

	parseCSV () {
		var self = this;
		Papa.parse(this.state.file, {
			header: true,
			skipEmptyLines: true,
			beforeFirstChunk: function(chunk) {
				const headers = "date,description,credit,debit,balance\r\n"
				return headers + chunk;
			},
			error: function(error, file) {
				console.error("error", error, file);
			},
			complete: function(results, file) {
				//console.log("Parsing complete:", results);
				self.massageData(results);
			}
		});
	}

	massageData (results) {
		const data = fromJS(results.data);
		data.map(x => console.log(x.get('description'), x.get('credit')));
	}

	render() {
		return <div>
			<input
				type='file'
				onChange={this.handleChange.bind(this)}
			/>
			<button onClick={this.handleClick.bind(this)}>Upload</button>
		</div>
	}
}

export default connect(null, actionCreators)(FileInput);
