import React from "react";
import HelloWorld from '../components/HelloWorld';

class Container extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="main-wrapper">
				<HelloWorld />
			</div>
		);
	}
}

export default Container;
