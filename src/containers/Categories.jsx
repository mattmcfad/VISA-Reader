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
    return (
      <ul className="list-reset">
        <h3 className="h1 m0 p2 bg-blue white">Categories</h3>
        {this.getCategories().map(category =>
          <li key={ category } className="p1 pl2 border">
            <span className="h3">
              { category }
            </span>
          </li>
        )}
      </ul>
    );
  }
};


function mapStateToProps(state) {
  return {
    categories: state.get('categories'),
  };
}

export default connect(mapStateToProps)(Categories);
