import React, { Component } from 'react';

import PostListItem from './PostListItem';
import ActionButton from './ActionButton';

import SortBy from './SortBy';

import { fetchCategoryPosts, fetchPosts } from '../utils/readableAPI';

import { postsSet } from '../state/posts/actions';

class PostList extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props;
    if (match.params.category) {
      fetchCategoryPosts(match.params.category).then(posts => {
        dispatch(postsSet(posts));
      });
    } else {
      fetchPosts().then(posts => {
        dispatch(postsSet(posts));
      });
    }
  }

  render() {
    const { match, posts, dispatch } = this.props;
    const heading = match.params.category ? match.params.category : 'home';
    return (
      <div>
        <div className="container">
          <h1 className="list-heading">{heading}</h1>
          <SortBy type="posts" dispatch={dispatch} />
          <ul className="list-container">
            {posts.map(post => {
              return (
                <li className="post-list-item" key={post.id}>
                  <PostListItem post={post} dispatch={dispatch} />
                </li>
              );
            })}
          </ul>
        </div>
        <ActionButton destination="/posts/new" />
      </div>
    );
  }
}

export default PostList;
