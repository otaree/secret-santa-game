import shuffle, { randomNumberRange } from "../../scr/libs/shuffle.mjs";

describe("Random number generator between a range", () => {
    it("should generate a number between 1 and 10", () => {
        const randomNumber = randomNumberRange(1, 10);
        expect(randomNumber).toBeGreaterThanOrEqual(1);
        expect(randomNumber).toBeLessThan(10);
    });
});

describe("Shuffle Array", () => {
    it("should shuffle the array element", () => {
        const originalArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffle(originalArray);

        expect(originalArray).not.toEqual(shuffledArray);
        expect(originalArray).toHaveLength(shuffledArray.length);
        expect(new Set(originalArray)).toEqual(new Set(shuffledArray));
    });
});