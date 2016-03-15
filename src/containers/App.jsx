import React from 'react';
import ChargeList from './ChargeList';
// import AddCharge from './AddCharge';
import PieChart from './PieChart';
import BarChart from './BarChart';
import Categories from './Categories';
import FileInput from '../components/FileInput';

const App = () => {
  return (
    <div className="col-12 clearfix">
      <div className="wrapper col-8 mx-auto">
        <h1 className="blue pl2">TD VISA READER !!!!!!!!</h1>
        <ChargeList />
        <FileInput />
        <BarChart />
        <PieChart />
        { /* <AddCharge /> */ }
        <Categories />
      </div>
    </div>
  );
};

export default App;
