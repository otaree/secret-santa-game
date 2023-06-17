/**
 * @description Generate a random number between a given range where min is inclusive and max is exclusive
 * @param {number} min - Minimum number in range(inclusive)
 * @param {number} max - Maximum number in range(exclusive)
 * @returns {number}
 */
export function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @description Shuffles the array using  Fisher–Yates shuffle
 * @param {Array} array - Array to be shuffle 
 * @returns {Array} shuffled array
 * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle} - Wikipedia page for Fisher–Yates shuffle
 */
export default function shuffle(array) {
    // Shallow copy the array
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
        if (i > 0) {
            const j = randomNumberRange(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    return arr;
}