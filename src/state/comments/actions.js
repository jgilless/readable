import {
    COMMENTS_SET,
    COMMENTS_CREATE,
    COMMENTS_UPDATE,
    COMMENTS_DELETE,
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

export const commentsSort = (property) => {
    if (propList.indexOf(property) === -1) {
        return {};
    }
    return {
        type: COMMENTS_SORT,
        data: {
            property
        }
    }
};

export const commentsSet = (comments) => {
    return {
        type: COMMENTS_SET,
        data: {
            comments
        }
    }
}