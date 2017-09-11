import {
  sendScoreUpdate,
  sendNewComment,
  sendDeleteComment,
  sendUpdateComment
} from '../../utils/readableAPI';
import { uuid } from '../../utils/formatters';

import {
  COMMENTS_SET,
  COMMENTS_CREATE,
  COMMENTS_UPDATE,
  COMMENTS_SORT
} from './constants';

const propList = [
  'id',
  'parentId',
  'timestamp',
  'body',
  'author',
  'voteScore',
  'deleted',
  'parentDeleted'
];

/**
 * Sorts comments that exist in state
 * @param {string} property must be contained in propList
 * @param {string} direction asc/desc
 */
export const commentsSort = (property, direction = 'desc') => {
  if (propList.indexOf(property) === -1) {
    return {};
  }
  return {
    type: COMMENTS_SORT,
    data: {
      property,
      direction
    }
  };
};

/**
 * Sets state with array of comments
 * @param {array} comments array of comment objects
 */
export const commentsSet = comments => {
  return {
    type: COMMENTS_SET,
    data: {
      comments
    }
  };
};

/**
 * Vote on a comment by id with a direction
 * @param {string} id 
 * @param {string} direction upVote/downVote
 */
export const commentsVote = (id, direction) => {
  return (dispatch, getState) => {
    const { items } = getState().comments;
    sendScoreUpdate(id, 'comments', direction);
    let score = items.find(item => {
      return item.id === id;
    }).voteScore;

    if (direction === 'upVote') {
      score += 1;
    } else {
      score -= 1;
    }

    dispatch({
      type: COMMENTS_UPDATE,
      data: {
        id,
        voteScore: score
      }
    });
  };
};

/**
 * Create a new comment
 * @param {object} data {author, body} - all values strings
 */
export const commentsNew = data => {
  return dispatch => {
    const timestamp = Date.now();
    const id = uuid();
    const comment = Object.assign({}, data, { timestamp, id, voteScore: 0 });
    sendNewComment(comment);
    dispatch({
      type: COMMENTS_CREATE,
      data: {
        comment
      }
    });
  };
};

/**
 * sets a post to deleted in the reducer
 * @param {string} id post unique identifier
 */
export const commentsDelete = id => {
  return dispatch => {
    sendDeleteComment(id);
    dispatch({
      type: COMMENTS_UPDATE,
      data: {
        id,
        deleted: true
      }
    });
  };
};

/**
 * Updates a post model and sends an
 * @param {string} id 
 * @param {object} data {title, body} both strings
 */
export const commentsUpdate = (id, data) => {
  return dispatch => {
    sendUpdateComment(id, data);
    const commentData = Object.assign({}, { id }, data);
    dispatch({
      type: COMMENTS_UPDATE,
      data: {
        commentData
      }
    });
  };
};
