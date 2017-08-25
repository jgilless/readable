import React, { Component } from 'react';

import PostListItem from './PostListItem';

class PostList extends Component {
    render() {
        const { posts, dispatch } = this.props;
        return (
            <div className="container">
                <ul className="list-container">
                    {posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <PostListItem 
                                    post={post}
                                    dispatch={dispatch}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default PostList;