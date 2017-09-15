import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchCategoryPosts } from '../utils/readableAPI';

import { postsSet } from '../state/posts/actions';

const CategoryListItem = props => {
  const { category, dispatch } = props;
  const getCategoryPosts = () => {
    fetchCategoryPosts(category.path).then(posts => {
      dispatch(postsSet(posts));
    });
  };
  return (
    <Link to={'/' + category.path} onClick={getCategoryPosts}>
      {category.name}
    </Link>
  );
};

export default CategoryListItem;
