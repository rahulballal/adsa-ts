import {twoSum} from "./twoSum";
import {test, expect} from "bun:test";

const testData = [
    [[], 9, []],
    [[0], 9, []],
    [[1, 8], 9, [0, 1]],
    [[8, 8], 9, []],
    [[1,4,3,8], 4, [0,2]]
]
test.each(testData)('twoSum(%p, %i)', (nums, target, expected) => {
    if (!Array.isArray(nums)) throw Error("Messed up input");
    if (Array.isArray(target)) throw Error("Messed up input")
    if (!Array.isArray(expected)) throw Error("Messed up input")

    const actual = twoSum(nums, target)
    expect(actual).toEqual(expected)
})

