import {combineReducers} from 'redux';
import * as Actions from '../actions';
import {List, Range} from 'immutable';
import {getHexColor} from '../helpers';

const boxes = (state = new List(), {type, payload}) => {
    if (type == Actions.BUILD_BOARD) {
        state = Range(0, payload.gridSize ** 2).map((v, boxNo) => ({
            color: getHexColor(boxNo),
            isActive: boxNo % 5 == 0 // TODO: Remove
        }));
    }

    return state;
};

const sequence = (state = new List(), {type, payload}) => {
    if (type == Actions.ADD_TO_SEQUENCE) {
        state = state.push(payload.next);
    }

    return state;
};

const playing = (state, {type}) => {
    return type == Actions.ADD_TO_SEQUENCE || type == Actions.START_PLAYING;
};

export default combineReducers({
    boxes,
    sequence,
    playing
});
