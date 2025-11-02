import { expect, test } from 'bun:test'
import { LruCacheFaster } from './LruCacheFaster.ts'

test('basic LRU eviction and access order', () => {
  const lru = new LruCacheFaster(2)
  lru.put(1, 1)
  lru.put(2, 2)

  // access key 1 to make it MRU
  expect(lru.get(1)).toBe(1)

  // inserting key 3 should evict key 2 (LRU)
  lru.put(3, 3)
  expect(lru.get(2)).toBe(-1)
  expect(lru.get(1)).toBe(1)
  expect(lru.get(3)).toBe(3)
})

test('updating existing key moves it to MRU and keeps value', () => {
  const lru = new LruCacheFaster(2)
  lru.put(1, 1)
  lru.put(2, 2)

  // update key 1
  lru.put(1, 10)
  expect(lru.get(1)).toBe(10)

  // adding a new key should evict key 2
  lru.put(3, 3)
  expect(lru.get(2)).toBe(-1)
  expect(lru.get(1)).toBe(10)
})

test('can store falsy values like 0', () => {
  const lru = new LruCacheFaster(1)
  lru.put(1, 0)
  expect(lru.get(1)).toBe(0)
})

test('capacity 0 behaves as no-op', () => {
  const lru = new LruCacheFaster(0)
  lru.put(1, 1)
  expect(lru.get(1)).toBe(-1)
})

test('keysMostToLeast returns correct MRU->LRU order', () => {
  const lru = new LruCacheFaster(3)
  lru.put(1, 1)
  lru.put(2, 2)
  lru.put(3, 3)

  // order after inserts (MRU -> LRU): 3,2,1
  expect(lru.keysMostToLeast()).toEqual([3, 2, 1])

  // access 2 to move it to head
  expect(lru.get(2)).toBe(2)
  expect(lru.keysMostToLeast()).toEqual([2, 3, 1])
})
