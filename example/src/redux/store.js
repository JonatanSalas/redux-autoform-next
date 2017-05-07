import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { combineReducers, applyMiddleware, createStore } from 'redux';

export default createStore(
    combineReducers({
        form
    }),
    applyMiddleware(thunk)
);