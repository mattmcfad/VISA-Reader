import React from 'react';

import { connect } from 'react-redux';

import ChargeInput from '../components/ChargeInput';
import * as actionCreators from '../actions';

const AddCharge = class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 10,
      date: '',
      description: '',
      credit: ''
    };
  }

  updateValue (state) {
    this.setState(state);
  }

  submitCharge (event) {
    event.preventDefault();

    this.props.addCreditCharge(this.state);
    this.setState({
      id: this.state.id + 1,
      date: '',
      description: '',
      credit: ''
    });
  }

  render() {

    return <form>
      <ChargeInput type='description' updateValue={this.updateValue.bind(this)} />
      <ChargeInput type='date' updateValue={this.updateValue.bind(this)} />
      <ChargeInput type='credit' updateValue={this.updateValue.bind(this)} />
      <ChargeInput type='category' updateValue={this.updateValue.bind(this)} />
      <button onClick={this.submitCharge.bind(this)}>
        Add Charge
      </button>
    </form>
  }
};

function mapStateToProps(state) {
  return {
    charges: state.get('credit')
  };
}

export default connect(mapStateToProps, actionCreators)(AddCharge);
