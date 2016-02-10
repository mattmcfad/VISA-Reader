import React from 'react';
import Chart from './Chart';
import AddCharge from './AddCharge';
import Categories from './Categories';

const App = (props) => {
	return (
		<div className='main-wrapper'>
			<h1>This app actually works. Wow.</h1>
			<Chart />
			<AddCharge />
			<Categories />
		</div>
	);
}

export default App;
