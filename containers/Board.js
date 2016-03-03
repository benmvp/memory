import React from 'react';
import {Range} from 'immutable';
import Box from '../components/Box';
import './Board.scss';

export default class Board extends React.Component {
    static propTypes = {
        gridSize: React.PropTypes.number
    }

    static defaultProps = {
        gridSize: 3
    }

    _getBoxes() {
        return Range(0, this.props.gridSize ** 2).map((v, boxNo) => {
            let boxPercentage = 100 / this.props.gridSize;
            let boxWidth = (boxPercentage - 0.1 * boxPercentage).toFixed(0);
            let boxContainerStyle = {flex: `0 0 ${boxWidth}%`};

            return (
                <Box
                    key={boxNo}
                    containerClass="Board-box"
                    containerStyle={boxContainerStyle} />
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
