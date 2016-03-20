import React from 'react';
import TransactionList from './TransactionList';
import CategoryList from './CategoryList';

// import AddCharge from './AddCharge';
import PieChart from './PieChart';
// import BarChart from './BarChart';
// import Categories from './Categories';
import FileInput from '../components/FileInput';

const App = () => {
  return (
    <div className="col-12">
      <div className="wrapper col-10 mx-auto">
        <h1 className="blue pl2">TD VISA READER 💳🔍</h1>
        <div className="flex">
            <PieChart/>
            { /* <BarChart /> */ }
            <CategoryList />
        </div>
        <FileInput />
        <TransactionList />
        { /* <Categories /> */}
        { /* <AddCharge /> */ }
      </div>
    </div>
  );
};

export default App;
