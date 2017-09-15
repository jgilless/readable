import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Voting from './Voting';
import CommentCount from './CommentCount';
import { humanDateFromTimestamp } from '../utils/formatters';

const PostListItem = props => {
  const { post, dispatch } = props;
  return (
    <div className="list-item-container">
      <Voting
        id={post.id}
        type="post"
        score={post.voteScore}
        dispatch={dispatch}
      />
      <div className="list-item-detail">
        <p>
          {post.author} on {humanDateFromTimestamp(post.timestamp)}
        </p>
        <p>
          <Link to={'/' + post.category + '/' + post.id}>{post.title}</Link>
        </p>
        <CommentCount count={post.commentCount} />
      </div>
    </div>
  );
};

export default PostListItem;
