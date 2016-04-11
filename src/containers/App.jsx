import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import FileInput from '../components/FileInput';
import Charts from './Charts';
import CategoryList from './CategoryList';
import TransactionList from './TransactionList';

import * as actionCreators from '../actions';

// import AddCharge from './AddCharge';

// import Categories from './Categories';

const App = class extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCredit();
  }

  render() {
    return (
      <div className="col-12">
        <div className="wrapper col-10 mx-auto">
          <h1 className="blue pl2">TD VISA READER 💳🔍</h1>
          <FileInput />
          <div className="flex">
              <Charts />
              <CategoryList />
          </div>
          <TransactionList />
          { /* <Categories /> */}
          { /* <AddCharge /> */ }
        </div>
      </div>
    );
  }
};

function mapStateToProps() {
  return { };
}

App.propTypes = {
  getCredit: PropTypes.func,
};


export default connect(mapStateToProps, actionCreators)(App);
