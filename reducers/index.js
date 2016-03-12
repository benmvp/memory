import {combineReducers} from 'redux';
import * as Actions from '../actions';
import {List, Range} from 'immutable';
import {getHexColor} from '../helpers';

const boxes = (state = new List(), {type, payload}) => {
    if (type == Actions.BUILD_BOARD) {
        state = Range(0, payload.gridSize ** 2).map((v, boxNo) => ({
            color: getHexColor(boxNo)
        }));
    }

    return state;
};

const sequence = (state = new List(), {type, payload}) => {
    if (type == Actions.BUILD_BOARD) {
        state = List.of(payload.initial);
    }
    else if (type == Actions.ADD_TO_SEQUENCE) {
        state = state.push(payload.next);
    }

    return state;
};

const sequenceNo = (state = -1, {type, payload}) => {
    if (type == Actions.NEXT_ACTIVE_BOX) {
        state = state + 1;
    }
    else if (type == Actions.CLEAR_ACTIVE_BOX) {
        state = -1;
    }
    return state;
};

export default combineReducers({
    boxes,
    sequence,
    sequenceNo
});
