import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './posts/reducer';
import comments from './comments/reducer';
import categories from './categories/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const { NODE_ENV } = process.env;

const reducers = {
    posts,
    comments,
    categories
};

export const initStore = (initialState = {}) => {
    const reducer = combineReducers(reducers);

    //Only put dev tools on development environemtn
    const composeEnhancers = NODE_ENV === 'development' ? composeWithDevTools : compose;

    const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    return store;
};