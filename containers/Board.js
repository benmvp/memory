import './Board.scss';
import {addToUserSequence, buildBoard, clearActiveBox, nextActiveBox} from '../actions';
import Box from '../components/Box';
import classNames from 'classnames';
import {connect} from 'react-redux';
import GameOver from '../components/GameOver';
import {getUserSequenceMatches} from '../selectors';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

class Board extends React.Component {
    static propTypes = {
        addToUserSequence: React.PropTypes.func.isRequired,
        boxes: ImmutablePropTypes.listOf(React.PropTypes.object).isRequired,
        buildBoard: React.PropTypes.func.isRequired,
        clearActiveBox: React.PropTypes.func.isRequired,
        gridSize: React.PropTypes.number.isRequired,
        isPlaying: React.PropTypes.bool.isRequired,
        nextActiveBox: React.PropTypes.func.isRequired,
        sequence: ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
        sequenceNo: React.PropTypes.number.isRequired,
        userSequence: ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
        userSequenceMatches: React.PropTypes.bool.isRequired
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

    _onBoxSelect(boxNo, isPlaying) {
        if (!isPlaying) {
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
                    onSelect={this._onBoxSelect.bind(this, boxNo, isPlaying)} />
            );
        });
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

        this._playIntervalId = setInterval(next, this.state.animTime);
        next();
    }

    _handleRestart() {
        this.props.buildBoard(this.props.gridSize);
    }

    render() {
        let {boxes, gridSize, isPlaying, sequence, sequenceNo, userSequenceMatches} = this.props;
        let boardClasses = classNames(
            'board',
            {
                'board--playing': isPlaying
            }
        );
        let playButtonProps = {
            onClick: this._playSequence.bind(this)
        };
        let playButtonText = sequence.size <= 1 ? 'START!' : 'NEXT!';
        let gameOverMessage;

        if (isPlaying) {
            playButtonProps.disabled = 'disabled';
        }

        if (!userSequenceMatches) {
            gameOverMessage = (
                <GameOver onRestart={this._handleRestart.bind(this)} />
            );
        }

        return (
            <div className={boardClasses}>
                <div className="board__boxes">
                    {this._getBoxes({boxes, gridSize, isPlaying, sequence, sequenceNo})}
                </div>
                <div className="board__actions">
                    <button {...playButtonProps}>{playButtonText}</button>
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

const mapDispatchToProps = {addToUserSequence, buildBoard, clearActiveBox, nextActiveBox};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
