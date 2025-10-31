import { twoSum, twoSumFaster } from './twoSum'
import { describe, it, expect } from 'bun:test'

const testData = [
  [[], 9, []], // empty array but target provided
  [[0], 9, []], // single element in the array no pair
  [[1, 8], 9, [0, 1]], // given array is already the solution
  [[8, 8], 9, []], // array has only two elements that dont add to target
  [[1, 4, 3, 8], 9, [0, 3]], // small array target exists
  [[1, 9, 15, 0, 8, 6, 7], 9, [0, 4]], // target has a value less than one of the elements in array
  [[1, 9, 15, 0, 8, 6, 7], 1, [0, 3]],
]
describe('Brute Force', () => {
  it.each(testData)('twoSum(%p, %i)', (nums, target, expected) => {
    if (!Array.isArray(nums)) throw Error('Messed up input')
    if (Array.isArray(target)) throw Error('Messed up input')
    if (!Array.isArray(expected)) throw Error('Messed up input')

    const actual = twoSum(nums, target)
    expect(actual).toEqual(expected)
  })
})

describe('Faster using Map', () => {
  it.each(testData)('twoSumFaster(%p, %i)', (nums, target, expected) => {
    if (!Array.isArray(nums)) throw Error('Messed up input')
    if (Array.isArray(target)) throw Error('Messed up input')
    if (!Array.isArray(expected)) throw Error('Messed up input')

    const actual = twoSumFaster(nums, target)
    expect(actual).toEqual(expected)
  })
})
