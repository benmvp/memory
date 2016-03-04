import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from './reducers';
import {buildBoard} from './actions';

import App from './containers/App';

const store = createStore(reducer);
const GRID_SIZE = 4;

// fire off action to build the board
store.dispatch(buildBoard(GRID_SIZE));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
