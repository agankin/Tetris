const R0 = Symbol('R0');
const R90 = Symbol('R90');
const R180 = Symbol('R180');
const R270 = Symbol('R270');

const create = (state, getPrevState, getNextState) => ({
    state,
    rotateClockWise: getNextState,
    rotateCounterClockWise: getPrevState
});

const chainRotation = (...states) => {
    const len = states.length;
    if (len <= 0) {
        throw new Error('States must be provided.');
    }
    
    const getPrevIdx = idx => idx <= 0 ? len - 1 : idx - 1;
    const getNextIdx = idx => idx >= len - 1 ? 0 : idx + 1;

    let chainedStates;

    const createChained = (state, idx) => create(
        state,
        () => chainedStates[getPrevIdx(idx)],
        () => chainedStates[getNextIdx(idx)]);

    chainedStates = states.map(createChained);

    return chainedStates[0];
};

export { R0, R90, R180, R270, chainRotation };