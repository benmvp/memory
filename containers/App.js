import React from 'react';
import Board from './Board'

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
