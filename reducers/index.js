import {combineReducers} from 'redux';
import * as Actions from '../actions';
import {List, Range} from 'immutable';
import {getHexColor} from '../helpers';

const boxes = (state = new List(), {type, payload}) => {
    if (type === Actions.BUILD_BOARD) {
        return Range(0, payload.gridSize ** 2).map((v, boxNo) => ({
            color: getHexColor(boxNo)
        })).toList();
    }

    return state;
};

const sequence = (state = new List(), {type, payload}) => {
    if (type === Actions.BUILD_BOARD) {
        return List.of(payload.boxId);
    }
    else if (type === Actions.ADD_TO_SEQUENCE) {
        return state.push(payload.boxId);
    }

    return state;
};

const sequenceNo = (state = -1, {type}) => {
    if (type === Actions.NEXT_ACTIVE_BOX) {
        return state + 1;
    }
    else if (type === Actions.CLEAR_ACTIVE_BOX) {
        return -1;
    }
    return state;
};

const userSequence = (state = new List(), {type, payload}) => {
    if (type === Actions.ADD_TO_USER_SEQUENCE) {
        return state.push(payload.boxId);
    }

    return state;
};

export default combineReducers({
    boxes,
    sequence,
    sequenceNo,
    userSequence
});
