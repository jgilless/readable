import React, { Component } from 'react';

import { humanDateFromTimestamp } from '../utils/formatters';

import Voting from './Voting';

class CommentDetail extends Component {
  render() {
    const { comment, dispatch } = this.props;

    return (
      <div className="list-item-container">
        <div className="list-item-detail">
          <p>
            {comment.author} at{' '}
            <time>{humanDateFromTimestamp(comment.timestamp)}</time>
          </p>
          <p>{comment.body}</p>
        </div>
      </div>
    );
  }
}

export default CommentDetail;
