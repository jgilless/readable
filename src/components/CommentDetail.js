import React, { Component } from 'react';

import { humanDateFromTimestamp } from '../utils/formatters';

class CommentDetail extends Component {
  render() {
    const { comment } = this.props;

    return (
      <div className="list-item-detail">
        <p>
          {comment.author} at{' '}
          <time>{humanDateFromTimestamp(comment.timestamp)}</time>
        </p>
        <p>{comment.body}</p>
      </div>
    );
  }
}

export default CommentDetail;
