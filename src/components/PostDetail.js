import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PostComments from './PostComments';
import Voting from './Voting';
import ActionButton from './ActionButton';
import EditDelete from './EditDelete';

import { humanDateFromTimestamp } from '../utils/formatters';
import { fetchPostByID } from '../utils/readableAPI';
import { postsSet } from '../state/posts/actions';

class PostDetail extends Component {
  componentDidMount() {
    const { post, dispatch, match } = this.props;
    if (post) {
      return;
    }
    fetchPostByID(match.params.id).then(post => {
      dispatch(postsSet([post]));
    });
  }

  render() {
    const { dispatch, post, comments } = this.props;
    if (!post) {
      return null;
    }

    return (
      <div className="container">
        <div className="post-info-container">
          <div className="title-vote">
            <Voting
              score={post.voteScore}
              id={post.id}
              dispatch={dispatch}
              type="post"
            />
            <h1>{post.title}</h1>
            <EditDelete
              type="post"
              id={post.id}
              post={post}
              dispatch={dispatch}
            />
          </div>
          <span>By {post.author}</span>
          <span> on {humanDateFromTimestamp(post.timestamp)}</span>
          <span>
            {' '}
            in <Link to={'/' + post.category}>{post.category}</Link>
          </span>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
        </div>

        <PostComments post={post} comments={comments} dispatch={dispatch} />
        <ActionButton destination={`/${post.category}/${post.id}/comment`} />
      </div>
    );
  }
}

export default PostDetail;
