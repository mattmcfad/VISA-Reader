import React from 'react';
import Chart from './Chart';
// import AddCharge from './AddCharge';
import Graph from './Graph';
import Categories from './Categories';
import FileInput from '../components/FileInput';

const App = () => {
  return (
    <div className="col-12 clearfix">
      <div className="wrapper col-8 mx-auto">
        <h1 className="blue pl2">TD VISA READER !!!!!!!!</h1>
        <Chart />
        <FileInput />
        <Graph />
        { /* <AddCharge /> */ }
        <Categories />
      </div>
    </div>
  );
};

export default App;
