import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {buildBoard} from './actions';

import App from './containers/App';

const store = configureStore();
const GRID_SIZE = 4;

// fire off action to build the board
store.dispatch(buildBoard(GRID_SIZE));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
