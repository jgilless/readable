import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { fetchPostByID } from '../utils/readableAPI';
import { postsNew, postsSet, postsUpdate } from '../state/posts/actions';

class PostForm extends Component {
  componentDidMount() {
    const { post, match, dispatch } = this.props;
    if (post || !match.params.id) {
      return;
    }
    fetchPostByID(match.params.id).then(post => {
      dispatch(postsSet([post]));
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, history, post } = this.props;

    //Validation of empty case
    if (!this.title.value) {
      alert('Title field cannot be empty');
      return;
    } else if (this.author && !this.author.value && !post) {
      alert('Author field cannot be empty');
      return;
    } else if (this.category && !this.category.value && !post) {
      alert('Category field cannot be empty');
      return;
    } else if (!this.body.value) {
      alert('Body field cannot be empty');
      return;
    }

    const postObj = {
      title: this.title.value,
      body: this.body.value
    };

    if (post) {
      dispatch(postsUpdate(post.id, postObj));
      history.push(`/${post.category}`);
    } else {
      postObj.category = this.category.value;
      postObj.author = this.author.value;
      dispatch(postsNew(postObj));
      history.push(`/${this.category.value}`);
    }
  };

  render() {
    const { post, categories } = this.props;
    const title = post ? post.title : 'Post title';
    const author = post ? post.author : 'Post author';
    const body = post ? post.body : 'Post body';
    const category = post ? post.category : 'react';

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

    let categoryNode = (
      <label className="form-label">
        <div className="form-label-text">Category</div>
        <select
          className="form-item"
          id="category"
          name="category"
          type="select"
          defaultValue={category}
          ref={input => (this.category = input)}
        >
          {categories.map(cat => {
            return <option key={cat.name}>{cat.name}</option>;
          })}
        </select>
      </label>
    );

    if (post) {
      authorNode = null;
      categoryNode = null;
    }
    return (
      <div className="container">
        <form
          id="post-form"
          className="post-form"
          onSubmit={this.handleSubmit}
          key={post ? `form-${post.id}` : 'form'}
        >
          <label className="form-label">
            <div className="form-label-text">Title</div>
            <input
              className="form-item"
              id="title"
              name="title"
              type="text"
              defaultValue={title}
              ref={input => (this.title = input)}
            />
          </label>
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
          {categoryNode}
          <input type="submit" value="Submit" className="form-submit-button" />
        </form>
      </div>
    );
  }
}

export default withRouter(PostForm);
