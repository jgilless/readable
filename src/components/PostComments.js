import React, { Component } from 'react';

import { fetchPostComments } from '../utils/readableAPI';
import { commentsSet } from '../state/comments/actions';

import CommentDetail from './CommentDetail';
import EditDelete from './EditDelete';
import SortBy from './SortBy';
import Voting from './Voting';

class PostComments extends Component {
  componentDidMount() {
    const { post, dispatch } = this.props;
    fetchPostComments(post.id).then(res => {
      dispatch(commentsSet(res));
    });
  }

  render() {
    const { comments, dispatch, post } = this.props;
    return (
      <div>
        <h4>{comments.length} comments</h4>
        <SortBy type="comments" dispatch={dispatch} />
        <ul className="list-container">
          {comments.map(comment => {
            return (
              <li className="list-item-container" key={comment.id}>
                <Voting
                  score={comment.voteScore}
                  id={comment.id}
                  dispatch={dispatch}
                  type="comment"
                />
                <CommentDetail comment={comment} dispatch={dispatch} />
                <EditDelete
                  type="comment"
                  id={comment.id}
                  post={post}
                  dispatch={dispatch}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PostComments;
