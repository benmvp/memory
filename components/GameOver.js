import './GameOver.scss';
import React from 'react';

export default class GameOver extends React.Component {
    static propTypes = {
        onRestart: React.PropTypes.func.isRequired
    }

    render() {
        let {onRestart} = this.props;

        return (
            <div className='game-over'>
                <h2>Game Over!</h2>
                <button onClick={onRestart}>PLAY AGAIN!</button>
            </div>
        );
    }
}
