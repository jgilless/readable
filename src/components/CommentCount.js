import React, { Component } from 'react';

class CommentCount extends Component {
  render() {
    const { count } = this.props;
    if (!count) {
      return null;
    }
    let str = `${count} comment`;
    if (count > 1) {
      str += 's';
    }
    return <p>{str}</p>;
  }
}

export default CommentCount;
