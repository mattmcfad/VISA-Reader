import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import * as actionCreators from '../actions';

const FileInput = class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: '',
    };
  }

  handleChange(event) {
    this.setState({
      file: event.target.files[0],
    });
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.file) {
      this.props.parseCSV(this.state.file);
    }
  }

  render() {
    const buttonClassNames = 'btn border white col-2';
    const submitButton = (!this.props.isLoading
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
  parseCSV: PropTypes.func,
  isLoading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isLoading: state.ui.get('loading'),
  };
}

export default connect(mapStateToProps, actionCreators)(FileInput);
