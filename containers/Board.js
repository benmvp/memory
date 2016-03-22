import './Board.scss';
import {addToSequence, addToUserSequence, buildBoard, clearActiveBox, nextActiveBox, userTimeout} from '../actions';
import Box from '../components/Box';
import classNames from 'classnames';
import {connect} from 'react-redux';
import GameOver from '../components/GameOver';
import {getUserSequenceMatches} from '../selectors';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import StartGame from '../components/StartGame';

class Board extends React.Component {
    static propTypes = {
        addToSequence: React.PropTypes.func.isRequired,
        addToUserSequence: React.PropTypes.func.isRequired,
        boxes: ImmutablePropTypes.listOf(React.PropTypes.object).isRequired,
        buildBoard: React.PropTypes.func.isRequired,
        clearActiveBox: React.PropTypes.func.isRequired,
        gridSize: React.PropTypes.number.isRequired,
        isPlaying: React.PropTypes.bool.isRequired,
        nextActiveBox: React.PropTypes.func.isRequired,
        sequence: ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
        sequenceNo: React.PropTypes.number.isRequired,
        isUserTimeout: React.PropTypes.bool.isRequired,
        userSequence: ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
        userSequenceMatches: React.PropTypes.bool.isRequired,
        userTimeout: React.PropTypes.func.isRequired
    }

    state = {
        animTime: 1000 // To be configured in UI as "difficulty"
    }

    componentDidUpdate() {
        let {sequence, sequenceNo} = this.props;

        if (sequenceNo < 0 || sequenceNo >= sequence.size) {
            clearInterval(this._playIntervalId);

            if (sequenceNo !== -1) {
                this.props.clearActiveBox();
            }
        }
    }

    _handleBoxSelect(boxNo, isPlaying) {
        if (!isPlaying) {
            clearTimeout(this._userTimeout);

            this._userTimeout = setTimeout(() => {
                if (this.props.sequence.size === this.props.userSequence.size) {
                    this._playSequence();
                }
                else {
                    this.props.userTimeout();
                }
            }, this.state.animTime * 2);

            this.props.addToUserSequence(boxNo);
        }
    }

    _getBoxes({boxes, gridSize, isPlaying, sequence, sequenceNo}) {
        let activeBoxNo = isPlaying ? sequence.get(sequenceNo) : -1;

        return boxes.map((boxInfo, boxNo) => {
            let boxPercentage = 100 / gridSize;
            let boxWidth = (boxPercentage - 0.1 * boxPercentage).toFixed(0);
            let boxContainerStyle = {flex: `0 0 ${boxWidth}%`};

            return (
                <Box
                    key={boxNo}
                    containerClass="board__box"
                    containerStyle={boxContainerStyle}
                    color={boxInfo.color}
                    isActive={boxNo === activeBoxNo}
                    isPlaying={isPlaying}
                    onSelect={this._handleBoxSelect.bind(this, boxNo, isPlaying)} />
            );
        });
    }

    _handleStart() {
        this._playSequence();
    }

    _playSequence() {
        let next = () => {
            if (this.props.sequenceNo < (this.props.sequence.size - 1)) {
                this.props.nextActiveBox();
            }
            else {
                this.props.clearActiveBox();
            }
        };

        this.props.addToSequence(this.props.gridSize);
        this._playIntervalId = setInterval(next, this.state.animTime);
    }

    _handleRestart() {
        this.props.buildBoard(this.props.gridSize);
    }

    render() {
        let {boxes, gridSize, isPlaying, sequence, sequenceNo, isUserTimeout, userSequenceMatches} = this.props;
        let boardClasses = classNames(
            'board',
            {
                'board--playing': isPlaying
            }
        );
        let playButtonProps = {};
        let startGameMessage, gameOverMessage;

        if (isPlaying) {
            playButtonProps.disabled = 'disabled';
        }

        if (sequence.size < 1) {
            startGameMessage = (
                <StartGame onStart={this._handleStart.bind(this)} />
            );
        }

        if (!userSequenceMatches || isUserTimeout) {
            gameOverMessage = (
                <GameOver isUserTimeout={isUserTimeout} onRestart={this._handleRestart.bind(this)} />
            );
            clearTimeout(this._userTimeout);
        }

        return (
            <div className={boardClasses}>
                <div className="board__boxes">
                    {this._getBoxes({boxes, gridSize, isPlaying, sequence, sequenceNo})}
                </div>
                {startGameMessage}
                <div className="board__scoreboard">
                    Sequence Count: {sequence.size}
                </div>
                {gameOverMessage}
            </div>
        );
    }
}

// Pass all redux state as props to Board
const mapStateToProps = (state) => ({
    ...state,
    gridSize: Math.sqrt(state.boxes.size),
    isPlaying: state.sequenceNo > -1,
    userSequenceMatches: getUserSequenceMatches(state.sequence, state.userSequence)
});

const mapDispatchToProps = {
    addToSequence,
    addToUserSequence,
    buildBoard,
    clearActiveBox,
    nextActiveBox,
    userTimeout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
