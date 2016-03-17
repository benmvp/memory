import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';
import Box from '../components/Box';
import {nextActiveBox, clearActiveBox} from '../actions';
import './Board.scss';

class Board extends React.Component {
    static propTypes = {
        boxes: React.PropTypes.object.isRequired,
        clearActiveBox: React.PropTypes.func.isRequired,
        nextActiveBox: React.PropTypes.func.isRequired,
        sequence: React.PropTypes.object.isRequired,
        sequenceNo: React.PropTypes.number.isRequired
    }

    state = {
        animTime: 2000 // To be configured in UI as "difficulty"
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

    _onBoxSelect(boxNo) {
        console.log('box clicked!', boxNo);
    }

    _getBoxes({boxes, sequence, sequenceNo, isPlaying}) {
        let gridSize = Math.sqrt(boxes.size);
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
                    onSelect={this._onBoxSelect.bind(this, boxNo)} />
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

    render() {
        let {boxes, sequence, sequenceNo} = this.props;
        let isPlaying = sequenceNo > -1;
        let boardClasses = classNames(
            'board',
            {
                'board--playing': isPlaying
            }
        );
        let playButtonProps = {
            onClick: this._playSequence.bind(this)
        };
        let playButtonText = sequence.size <= 1
            ? 'START!'
            : 'NEXT!';

        if (isPlaying)
            playButtonProps.disabled = 'disabled';

        return (
            <div className={boardClasses}>
                <div className="board__boxes">
                    {this._getBoxes({boxes, sequence, sequenceNo, isPlaying})}
                </div>
                <div className="board__actions">
                    <button {...playButtonProps}>{playButtonText}</button>
                </div>
            </div>
        );
    }
}

// Pass all redux state as props to Board
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    nextActiveBox: () => dispatch(nextActiveBox()),
    clearActiveBox: () => dispatch(clearActiveBox())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
