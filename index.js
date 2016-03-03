import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';

render(
    <App gridSize={4} />,
    document.getElementById('app')
)
