// Action type constants
export const BUILD_BOARD = 'BUILD_BOARD';
export const ADD_TO_SEQUENCE = 'ADD_TO_SEQUENCE';
export const PLAY_SEQUENCE = 'PLAY_SEQUENCE';
export const STOP_SEQUENCE = 'STOP_SEQUENCE';
export const NEXT_SEQUENCE = 'NEXT_SEQUENCE';

// Action creators
export const buildBoard = gridSize => ({
    type: BUILD_BOARD,
    payload: {
        gridSize
    }
});

export const addToSequence = () => ({
    type: ADD_TO_SEQUENCE
});

export const playSequence = () => ({
    type: PLAY_SEQUENCE
});

export const stopSequence = () => ({
    type: STOP_SEQUENCE
});
