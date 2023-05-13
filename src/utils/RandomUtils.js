function getOneOf(...items) {
    const itemsCount = items.length;
    const randomIdx = Math.floor(itemsCount * Math.random());

    return items[randomIdx];
}

function random(value, probability) {
    return {
        values: [[value, probability]],

        and(value, probability) {
            const randomValue = random(value, probability);

            return {
                ...randomValue,
                values: [...this.values, [[value, probability]]]
            };
        },

        generator() {
            
        }
    };
}

export { getOneOf };