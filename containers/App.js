import Board from './Board';
import React from 'react';

export default class App extends React.Component {
    static propTypes = {
        gridSize: React.PropTypes.number
    }

    render() {
        return (
            <Board />
        );
    }
}
