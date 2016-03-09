import {combineReducers} from 'redux';
import {BUILD_BOARD, ADD_TO_SEQUENCE, START_PLAYING, STOP_PLAYING} from '../actions';
import {Map, Range, fromJS} from 'immutable';
import {getHexColor} from '../helpers';

export default (
    state = new Map(fromJS({boxes: [], sequence: [], playing: false})),
    {type, payload}
) => {
    switch (type) {
        case BUILD_BOARD:
            return state.set(
                'boxes',
                Range(0, payload.gridSize ** 2).map((v, boxNo) => ({
                    color: getHexColor(boxNo),
                    isActive: boxNo % 5 == 0
                }))
            );

        case ADD_TO_SEQUENCE:
            return state.update(
                    'sequence',
                    sequence => sequence.push(Math.floor(Math.random() * state.get('boxes').size)))
                .set('playing', true); // TODO: figure out how to dispatch START_PLAYING instead?

        case START_PLAYING:
            return state.set('playing', true);

        case STOP_PLAYING:
            return state.set('playing', false);

        default:
            return state;
    }
};
