// Action type constants
export const BUILD_BOARD = 'BUILD_BOARD';
export const ADD_TO_SEQUENCE = 'ADD_TO_SEQUENCE';
export const NEXT_ACTIVE_BOX = 'NEXT_ACTIVE_BOX';
export const CLEAR_ACTIVE_BOX = 'CLEAR_ACTIVE_BOX';
export const ADD_TO_USER_SEQUENCE = 'ADD_TO_USER_SEQUENCE';
export const USER_TIMEOUT = 'USER_TIMEOUT';

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

export const nextActiveBox = () => ({
    type: NEXT_ACTIVE_BOX
});

export const clearActiveBox = () => ({
    type: CLEAR_ACTIVE_BOX
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
