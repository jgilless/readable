import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { commentsNew } from '../state/comments/actions';
import { fetchPostByID, fetchCommentByID } from '../utils/readableAPI';
import { postsSet } from '../state/posts/actions';
import { commentsSet, commentsUpdate } from '../state/comments/actions';

class CommentForm extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    if (match.params.postId) {
      fetchPostByID(match.params.postId).then(post => {
        dispatch(postsSet([post]));
      });
    }
    if (match.params.commentId) {
      fetchCommentByID(match.params.commentId).then(comment => {
        dispatch(commentsSet([comment]));
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, post, history, comment, match } = this.props;
    //Validation of empty case
    if (this.author && !this.author.value && !post) {
      alert('Author field cannot be empty');
      return;
    } else if (!this.body.value) {
      alert('Body field cannot be empty');
      return;
    }
    const commentObj = {
      body: this.body.value
    };

    if (comment) {
      dispatch(commentsUpdate(match.params.commentId, commentObj));
    } else {
      commentObj.author = this.author.value;
      commentObj.parentId = post.id;
      dispatch(commentsNew(commentObj));
    }
    history.push(`/${match.params.category}/${match.params.postId}`);
  };

  render() {
    const { comment } = this.props;
    const author = comment ? comment.author : 'Comment Author';
    const body = comment ? comment.body : 'Comment body';
    let authorNode = (
      <label className="form-label">
        <div className="form-label-text">Author</div>
        <input
          className="form-item"
          id="author"
          name="author"
          type="text"
          defaultValue={author}
          ref={input => (this.author = input)}
        />
      </label>
    );
    if (comment) {
      authorNode = null;
    }
    return (
      <div className="container">
        <form
          id="comment-form"
          className="post-form"
          onSubmit={this.handleSubmit}
          key={comment ? `form-${comment.id}` : 'comment-form'}
        >
          {authorNode}
          <label className="form-label">
            <div className="form-label-text">Body</div>
            <textarea
              form="post-form"
              className="form-item"
              id="body"
              name="body"
              type="text"
              defaultValue={body}
              ref={input => (this.body = input)}
            />
          </label>
          <input type="submit" value="Submit" className="form-submit-button" />
        </form>
      </div>
    );
  }
}

export default withRouter(CommentForm);
