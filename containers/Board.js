import React from 'react';
import {connect} from 'react-redux'
import Box from '../components/Box';
import {nextActiveBox, clearActiveBox} from '../actions';
import './Board.scss';

class Board extends React.Component {
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

    _getBoxes() {
        let {boxes, sequence, sequenceNo} = this.props;
        let gridSize = Math.sqrt(boxes.size);
        let activeBoxNo = sequenceNo > -1 ? sequence.get(sequenceNo) : -1;

        return boxes.map((boxInfo, boxNo) => {
            let boxPercentage = 100 / gridSize;
            let boxWidth = (boxPercentage - 0.1 * boxPercentage).toFixed(0);
            let boxContainerStyle = {flex: `0 0 ${boxWidth}%`};

            return (
                <Box
                    key={boxNo}
                    containerClass="Board-box"
                    containerStyle={boxContainerStyle}
                    color={boxInfo.color}
                    isActive={boxNo === activeBoxNo} />
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
        let goButtonProps = {
            onClick: this._playSequence.bind(this)
        };

        if (this.props.sequenceNo > -1)
            goButtonProps.disabled = 'disabled';

        return (
            <div className="Board">
                <div className="Board__boxes">
                    {this._getBoxes()}
                </div>
                <div className="Board__actions">
                    <button {...goButtonProps}>GO!</button>
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
