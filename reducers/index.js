import {combineReducers} from 'redux';
import {BUILD_BOARD} from '../actions';
import {List, Range} from 'immutable';
import {getHexColor} from '../helpers';

function boxes(state = new List(), action) {
    switch (action.type) {
        case BUILD_BOARD:
            return Range(0, action.payload.gridSize ** 2).map((v, boxNo) => ({
                color: getHexColor(boxNo)
            }));
        default:
            return state;
    }
}

export default combineReducers({
    boxes
})
