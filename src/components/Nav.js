import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CategoryList from './CategoryList';

class NavBar extends Component {
  render() {
    const { dispatch, categories } = this.props;
    return (
      <nav id="navbar">
        <div className="homeBtn">
          <Link to="/">Home</Link>
        </div>
        <CategoryList categories={categories} dispatch={dispatch} />
      </nav>
    );
  }
}

export default NavBar;
