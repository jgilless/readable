import React, { Component } from 'react';

import { fetchPostComments } from '../utils/readableAPI';
import { commentsSet } from '../state/comments/actions';

import CommentDetail from './CommentDetail';

class PostComments extends Component {
    componentDidMount() {
        const { postId, dispatch } = this.props;
        fetchPostComments(postId).then((res) => {
            dispatch(commentsSet(res));
        });
    };

    render() {
        const { comments } = this.props;
        return (
            <div>
                {comments.map((comment) => {
                    return (
                        <CommentDetail comment={comment} />
                    )
                })}
            </div>
        );
    };
}

export default PostComments;