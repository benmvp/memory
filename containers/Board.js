import React from 'react';
import {connect} from 'react-redux'
import Box from '../components/Box';
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
                    color={boxInfo.color} />
            );
        });
    }

    render() {
        return (
            <div className="Board">
                {this._getBoxes()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    boxes: state.boxes
  }
}

export default connect(
  mapStateToProps
)(Board)
