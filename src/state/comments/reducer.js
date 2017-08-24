import {
    COMMENTS_SET,
    COMMENTS_CREATE,
    COMMENTS_UPDATE,
    COMMENTS_DELETE
} from './constants';

const defaultState = {
    order: 'voteScore',
    items: []
};

export default (state = defaultState, action) => {
    const { type, data } = action;

    switch(type) {
        case COMMENTS_SET:
            return Object.assign({}, state, {
                items: data.comments
            });
        case COMMENTS_CREATE:
            return state;
        case COMMENTS_UPDATE:
            return state;
        case COMMENTS_DELETE:
            return state;
        default:
            return state;
    }
}