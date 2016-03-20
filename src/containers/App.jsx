import React from 'react';

import FileInput from '../components/FileInput';
import Charts from './Charts';
import CategoryList from './CategoryList';
import TransactionList from './TransactionList';

// import AddCharge from './AddCharge';

// import Categories from './Categories';

const App = () => {
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
};

export default App;
