import {fromJS} from 'immutable';

const COLORS = fromJS([
    '000000', '000088', '0000ff', '008800', '0088ff', '00ff00', '00ff88', '00ffff',
    '880000', '880088', '8800ff', '888800', '888888', '88ff00', '88ff88', '88ffff',
    'ff0000', 'ff0088', 'ff00ff', 'ff8800', 'ff8888', 'ffff00', 'ffff88'
]);

export function getHexColor(num) {
    return COLORS.get(num % COLORS.size);
}
