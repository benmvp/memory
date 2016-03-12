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

export const addToSequence = gridSize => ({
    type: ADD_TO_SEQUENCE,
    payload: {
        next: Math.floor(Math.random() * gridSize)
    }
});

export const playSequence = () => ({
    type: PLAY_SEQUENCE
});

export const stopSequence = () => ({
    type: STOP_SEQUENCE
});

export const nextSequence = () => {
    // async action leveraging redux thunk middleware
    return dispatch => {
        // dispatch action to add to the sequence
        dispatch(addToSequence());
    };
};
