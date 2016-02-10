import React from 'react';

import { connect } from 'react-redux';

// import Category from '../components/Category';

const Categories = class extends React.Component {
	constructor(props) {
		super(props);
	}

	getCategories() {
		return this.props.categories;
	}

	render() {
		return <ul>
			<h3>Categories</h3>
			{this.getCategories().map(category =>
				<li key={category}>{ category }</li>
			)}
		</ul>
	}
}


function mapStateToProps(state) {
  return {
    categories: state.get('categories')
  };
}

export default connect(mapStateToProps)(Categories);
