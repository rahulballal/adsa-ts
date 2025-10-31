import { LruCache } from './lruCache.ts'
import { test, expect } from 'bun:test'

test('Cache can evict when capacity is reached', () => {
  const lru = new LruCache(2)
  lru.put(1, 1)
  lru.showContents()

  lru.put(2, 2)
  lru.showContents()

  lru.get(1)

  lru.put(3, 3)
  lru.showContents()

  expect(lru.getKeys()).toEqual([1, 3])
})
