var React = require("react");
var HelloWorld = require('./HelloWorld.jsx');

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

module.exports = Container;