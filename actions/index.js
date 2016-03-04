// Action type constants
export const BUILD_BOARD = 'BUILD_BOARD'

// Action creators
export function buildBoard(gridSize) {
    return {
        type: BUILD_BOARD,
        payload: {
            gridSize
        }
    }
}
