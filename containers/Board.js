import './Board.scss';
import {addToSequence, addToUserSequence, buildBoard, clearIsPlaying, clearSequenceNo, setIsPlaying, setSequenceNo, userTimeout} from '../actions';
import Box from '../components/Box';
import classNames from 'classnames';
import {connect} from 'react-redux';
import GameOver from '../components/GameOver';
import {getUserSequenceMatches} from '../selectors';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import StartGame from '../components/StartGame';

const animPauseTime = 500;

class Board extends React.Component {
    static propTypes = {
        addToSequence: React.PropTypes.func.isRequired,
        addToUserSequence: React.PropTypes.func.isRequired,
        boxes: ImmutablePropTypes.listOf(React.PropTypes.object).isRequired,
        buildBoard: React.PropTypes.func.isRequired,
        clearIsPlaying: React.PropTypes.func.isRequired,
        clearSequenceNo: React.PropTypes.func.isRequired,
        gridSize: React.PropTypes.number.isRequired,
        isPlaying: React.PropTypes.bool.isRequired,
        sequence: ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
        sequenceNo: React.PropTypes.number.isRequired,
        setIsPlaying: React.PropTypes.func.isRequired,
        setSequenceNo: React.PropTypes.func.isRequired,
        isUserTimeout: React.PropTypes.bool.isRequired,
        userSequence: ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
        userSequenceMatches: React.PropTypes.bool.isRequired,
        userTimeout: React.PropTypes.func.isRequired
    }

    state = {
        animTime: 1000, // To be configured in UI as "difficulty"
        userWaitTime: 3000 // To be potentially configured in UI
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
            }, this.state.userWaitTime);

            this.props.addToUserSequence(boxNo);
        }
    }

    _getBoxes({boxes, gridSize, isPlaying, sequence, sequenceNo}) {
        let activeBoxNo = sequenceNo > -1 ? sequence.get(sequenceNo) : -1;

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
        let sequenceNo = -1;
        let next = () => {
            this.props.clearSequenceNo();
            setTimeout(() => {
                if (sequenceNo < (this.props.sequence.size - 1)) {
                    sequenceNo++;
                    this.props.setSequenceNo(sequenceNo);
                    setTimeout(next, this.state.animTime);
                }
                else {
                    this.props.clearIsPlaying();
                    this.props.clearSequenceNo();
                }
            }, animPauseTime);
        };

        this.props.setIsPlaying();
        this.props.addToSequence(this.props.gridSize);
        next();
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
    userSequenceMatches: getUserSequenceMatches(state.sequence, state.userSequence)
});

const mapDispatchToProps = {
    addToSequence,
    addToUserSequence,
    buildBoard,
    clearIsPlaying,
    clearSequenceNo,
    setIsPlaying,
    setSequenceNo,
    userTimeout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
