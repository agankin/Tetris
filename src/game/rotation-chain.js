const create = (currentRotation, getPrevRotation, getNextRotation) => ({
    currentRotation,
    rotateClockwise: getNextRotation,
    rotateCounterClockwise: getPrevRotation
});

const createRotationChain = (...rotations) => {
    const len = rotations.length;
    if (len <= 0) {
        throw new Error('Rotation states must be provided.');
    }
    
    const getPrevIdx = idx => idx <= 0 ? len - 1 : idx - 1;
    const getNextIdx = idx => idx >= len - 1 ? 0 : idx + 1;

    let chainedRotations;

    const createChained = (currentRotation, idx) => create(
        currentRotation,
        () => chainedRotations[getPrevIdx(idx)],
        () => chainedRotations[getNextIdx(idx)]);

    chainedRotations = rotations.map(createChained);

    return chainedRotations[0];
};

export { createRotationChain };