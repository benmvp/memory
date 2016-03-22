import './StartGame.scss';
import React from 'react';

export default class StartGame extends React.Component {
    static propTypes = {
        onStart: React.PropTypes.func.isRequired
    }

    render() {
        let {onStart} = this.props;

        return (
            <div className='start-game'>
                <h2>Let's Play!</h2>
                <button onClick={onStart}>START!</button>
            </div>
        );
    }
}
