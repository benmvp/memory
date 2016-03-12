import React from 'react';
import {connect} from 'react-redux'
import Box from '../components/Box';
import {addToSequence} from '../actions';
import './Board.scss';

class Board extends React.Component {
    _getBoxes() {
        let {boxes} = this.props;
        let gridSize = Math.sqrt(boxes.size);

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
                    isActive={boxInfo.isActive} />
            );
        });
    }

    render() {
        let goButtonProps = {
            onClick: this.props.onNextRound.bind(this, this.props.boxes.size)
        };

        if (this.props.playing)
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => (
    {
        onNextRound: gridSize => {
            dispatch(addToSequence(gridSize));
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
