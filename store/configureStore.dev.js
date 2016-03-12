import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {Map} from 'immutable';
import rootReducer from '../reducers';

const stateTransformer = state => (
    Map(state).toJS()
);
const logger = createLogger({
    stateTransformer
})

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger)
  )
};
