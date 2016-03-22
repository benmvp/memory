import './GameOver.scss';
import React from 'react';

export default class GameOver extends React.Component {
    static propTypes = {
        isUserTimeout: React.PropTypes.bool.isRequired,
        onRestart: React.PropTypes.func.isRequired
    }

    render() {
        let {isUserTimeout, onRestart} = this.props;
        let userTimeoutMessage;

        if (isUserTimeout) {
            userTimeoutMessage = (
                <p>You ran out of time!</p>
            );
        }

        return (
            <div className='game-over'>
                <h2>Game Over!</h2>
                {userTimeoutMessage}
                <button onClick={onRestart}>PLAY AGAIN!</button>
            </div>
        );
    }
}
