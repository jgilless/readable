import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CategoryList from './CategoryList';

const NavBar = props => {
  const { dispatch, categories } = props;
  return (
    <nav id="navbar">
      <div className="homeBtn">
        <Link to="/">Home</Link>
      </div>
      <CategoryList categories={categories} dispatch={dispatch} />
    </nav>
  );
};

export default NavBar;
