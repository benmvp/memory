// Action type constants
export const BUILD_BOARD = 'BUILD_BOARD';
export const ADD_TO_SEQUENCE = 'ADD_TO_SEQUENCE';
export const SET_SEQUENCE_NO = 'SET_SEQUENCE_NO';
export const CLEAR_SEQUENCE_NO = 'CLEAR_SEQUENCE_NO';
export const ADD_TO_USER_SEQUENCE = 'ADD_TO_USER_SEQUENCE';
export const USER_TIMEOUT = 'USER_TIMEOUT';
export const SET_IS_PLAYING = 'SET_IS_PLAYING';
export const CLEAR_IS_PLAYING = 'CLEAR_IS_PLAYING';

// Helpers
const randomBoxId = (gridSize) => Math.floor(Math.random() * gridSize ** 2);

// Action creators
export const buildBoard = (gridSize) => ({
    type: BUILD_BOARD,
    payload: {
        gridSize,
        initialBoxId: randomBoxId(gridSize)
    }
});

export const addToSequence = (gridSize) => ({
    type: ADD_TO_SEQUENCE,
    payload: {
        newBoxId: randomBoxId(gridSize)
    }
});

export const setSequenceNo = (sequenceNo) => ({
    type: SET_SEQUENCE_NO,
    payload: {
        sequenceNo
    }
});

export const clearSequenceNo = () => ({
    type: CLEAR_SEQUENCE_NO
});

export const addToUserSequence = (boxId) => ({
    type: ADD_TO_USER_SEQUENCE,
    payload: {
        boxId
    }
});

export const userTimeout = () => ({
    type: USER_TIMEOUT
});

export const setIsPlaying = () => ({
    type: SET_IS_PLAYING
});

export const clearIsPlaying = () => ({
    type: CLEAR_IS_PLAYING
});
