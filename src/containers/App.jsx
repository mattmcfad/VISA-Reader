import React from 'react';
import Chart from './Chart';
import AddCharge from './AddCharge';

const App = (props) => {
	return (
		<div className='main-wrapper'>
			<h1>This app actually works. Wow.</h1>
			<Chart />
			<AddCharge />
		</div>
	);
}

export default App;
