import * as ActionTypes from '../actions';
import {List, Range} from 'immutable';
import {combineReducers} from 'redux';
import {getHexColor} from '../helpers';

const boxes = (state = new List(), {type, payload}) => {
    if (type === ActionTypes.BUILD_BOARD) {
        return Range(0, payload.gridSize ** 2).map((v, boxNo) => ({
            color: getHexColor(boxNo)
        })).toList();
    }

    return state;
};

const sequence = (state = new List(), {type, payload}) => {
    if (type === ActionTypes.BUILD_BOARD) {
        return List.of(payload.initialBoxId);
    }
    else if (type === ActionTypes.ADD_TO_SEQUENCE) {
        return state.push(payload.newBoxId);
    }

    return state;
};

const sequenceNo = (state = -1, {type}) => {
    if (type === ActionTypes.BUILD_BOARD || type === ActionTypes.CLEAR_ACTIVE_BOX) {
        return -1;
    }
    else if (type === ActionTypes.NEXT_ACTIVE_BOX) {
        return state + 1;
    }

    return state;
};

const userSequence = (state = new List(), {type, payload}) => {
    if (type === ActionTypes.BUILD_BOARD) {
        return new List();
    }
    else if (type === ActionTypes.ADD_TO_USER_SEQUENCE) {
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
