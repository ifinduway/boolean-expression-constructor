export default {
    getRandomFromRange(from, to) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    },
    getRandomFromArray(array) {
        return array[this.getRandomFromRange(0, array.length - 1)];
    },
    getRandomBoolean() {
        return Math.random() >= 0.5;
    },

    shuffle(a) {
        // eslint-disable-next-line no-plusplus
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // eslint-disable-next-line no-param-reassign
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
};
