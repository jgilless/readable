import {
  sendScoreUpdate,
  sendNewPost,
  sendDeletePost
} from '../../utils/readableAPI';
import { uuid } from '../../utils/formatters';

import { POSTS_CREATE, POSTS_UPDATE, POSTS_SORT, POSTS_SET } from './constants';

const propList = [
  'id',
  'timestamp',
  'title',
  'body',
  'author',
  'category',
  'voteScore',
  'deleted'
];

/**
 * Sort posts on property and direction
 * @param {string} property anything included in propList
 * @param {string} direction asc/desc
 */
export const postsSort = (property, direction = 'desc') => {
  if (propList.indexOf(property) === -1) {
    return {};
  }
  return {
    type: POSTS_SORT,
    data: {
      property,
      direction
    }
  };
};

/**
 * Takes in an array of posts to be placed in state
 * @param {array} posts 
 */
export const postsSet = posts => {
  return {
    type: POSTS_SET,
    data: {
      posts
    }
  };
};

/**
 * Votes either up or down on a post
 * @param {string} id post id
 * @param {string} direction upVote/downVote
 */
export const postsVote = (id, direction) => {
  return (dispatch, getState) => {
    const { items } = getState().posts;
    sendScoreUpdate(id, 'posts', direction);
    let score = items.find(item => {
      return item.id === id;
    }).voteScore;

    if (direction === 'upVote') {
      score += 1;
    } else {
      score -= 1;
    }

    dispatch({
      type: POSTS_UPDATE,
      data: {
        id,
        voteScore: score
      }
    });
  };
};

/**
 * Creates a new post and adds it to state
 * @param {object} data {title, author, body, category} all values strings
 */
export const postsNew = data => {
  return dispatch => {
    const timestamp = Date.now();
    const id = uuid();
    const post = Object.assign({}, data, { timestamp, id, voteScore: 0 });
    sendNewPost(post);
    dispatch({
      type: POSTS_CREATE,
      data: {
        post
      }
    });
  };
};

/**
 * sets a post to deleted in the reducer
 * @param {string} id post unique identifier
 */
export const postsDelete = id => {
  return dispatch => {
    sendDeletePost(id);
    dispatch({
      type: POSTS_UPDATE,
      data: {
        id,
        deleted: true
      }
    });
  };
};
