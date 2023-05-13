import { getOneOf } from '../utils/RandomUtils';

const Colors = Object.freeze({
    RED: Symbol('red'),
    BLUE: Symbol('blue'),
    GREEN: Symbol('green'),

    [Symbol.iterator]() {
        return Object.values(Colors)[Symbol.iterator]();
    }
});

function getRandomColor() {
    return getOneOf(...Colors);
}

export { Colors, getRandomColor };