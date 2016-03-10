import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import * as actionCreators from '../actions';

const FileInput = class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: '',
      isLoading: false,
    };
    this.parseCSV = this.parseCSV.bind(this);
  }

  handleChange(event) {
    this.setState({
      file: event.target.files[0],
    });
  }

  handleClick(event) {
    event.preventDefault();

    if (this.state.file) {
      this.setState({
        isLoading: true,
      }, this.parseCSV());
    }
  }

  parseCSV() {
    const self = this;
    Papa.parse(this.state.file, {
      header: true,
      skipEmptyLines: true,
      beforeFirstChunk: (chunk) => {
        // todo: have different options for different banks
        const headers = 'date,description,credit,debit,balance\r\n';
        return headers + chunk;
      },
      error: (error, file) => {
        console.error('Papaparse error:', error, file);
      },
      complete: (results) => {
        self.setState({
          file: '',
          isLoading: false,
        });
        self.addCharges(results.data);
      },
    });
  }

  addCharges(charges) {
    this.props.batchAdd(charges);
  }

  render() {
    const buttonClassNames = 'btn border white col-2';
    const submitButton = (!this.state.isLoading
      ? <button
          className={ `${buttonClassNames} bg-blue ` }
          onClick={this.handleClick.bind(this)}
          type="submit">
          Parse it!
        </button>
      : <button
          className={ `${buttonClassNames} bg-orange disabled` }
          disabled="true">
          Loading....
        </button>
    );

    return (
    <section className="my2 col-12">
      <form className="flex">
        <input
          className="border py2 pl2 bold col-10"
          type="file"
          onChange={this.handleChange.bind(this)}
        />
        {submitButton}
      </form>
    </section>
    );
  }
};

FileInput.propTypes = {
  batchAdd: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    charges: state.get('credit'),
  };
}

export default connect(mapStateToProps, actionCreators)(FileInput);
