/**
 * https://www.jointaro.com/interviews/questions/lru-cache/?src=taro75
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 *
 * Implement the LRUCache class:
 *
 * -- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
 * -- int get(int key) Return the value of the key if the key exists, otherwise return -1.
 * -- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache.
 * If the number of keys exceeds the capacity from this operation, evict the least recently used key.
 * The functions get and put must each run in O(1) average time complexity.
 * Example:
 * Input
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * Output
 * [null, null, null, 1, null, -1, null, -1, 3, 4]
 *
 * Explanation
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // cache is {1=1}
 * lRUCache.put(2, 2); // cache is {1=1, 2=2}
 * lRUCache.get(1);    // return 1
 * lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
 * lRUCache.get(2);    // returns -1 (not found)
 * lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
 * lRUCache.get(1);    // return -1 (not found)
 * lRUCache.get(3);    // return 3
 * lRUCache.get(4);    // return 4
 *
 * Constraints:
 *
 * 1 <= capacity <= 3000
 * 0 <= key <= 104
 * 0 <= value <= 105
 * At most 2 * 105 calls will be made to get and put.
 * */

export class LruCache {
  private store = new Map<number, number>() // to store the cache data
  private hitCounter = new Map<number, number>() // to store counts
  private counter: number = 0

  constructor(private capacity: number) {}

  private evict(): number {
    let lowestHitCount = -1
    let lowestHitKey = -1
    this.hitCounter.entries().forEach((pair) => {
      const [k, hits] = pair
      if (lowestHitKey === -1) {
        lowestHitKey = k
        lowestHitCount = hits
      } else {
        if (hits < lowestHitCount) {
          lowestHitCount = hits
          lowestHitKey = k
        }
      }
    })
    console.log(`🚮 ${lowestHitKey} evicted`)
    return lowestHitKey
  }

  private increaseHitCounter(key: number) {
    if (this.hitCounter.has(key)) {
      this.hitCounter.set(key, this.hitCounter.get(key)! + 1)
    } else {
      this.hitCounter.set(key, 1)
    }
  }

  public getKeys() {
    return this.store.keys().toArray()
  }

  public showContents() {
    console.log('--store start--')
    this.store.entries().forEach((entry) => {
      console.log(`Key => ${entry[0]}, Value => ${entry[1]}`)
    })
    console.log('--store end--')
    console.log('--counter start--')
    this.hitCounter.entries().forEach((entry) => {
      console.log(`Key => ${entry[0]}, Hits => ${entry[1]}`)
    })
    console.log('--counter end--')
  }

  public put(key: number, value: number) {
    if (this.counter < this.capacity) {
      this.store.set(key, value)
      if (!this.hitCounter.has(key)) {
        this.hitCounter.set(key, 1)
      }
      this.counter = this.counter + 1
    } else {
      const evicted = this.evict()
      const yeeted = this.store.delete(evicted)
      if (yeeted) {
        console.log(`🚀 ${evicted}`)
      }
      this.store.set(key, value)
    }
  }

  public get(key: number) {
    const value = this.store.get(key)
    if (value) {
      this.increaseHitCounter(key)
      return value
    }
    return -1
  }
}

type DataNode<TKey, TValue> = {
  key: TKey
  value: TValue
  previous: DataNode<TKey, TValue> | null
  next: DataNode<TKey, TValue> | null
}

export class LruCacheFaster {
  private store = new Map<number, DataNode<number, number>>()
  private head: DataNode<number, number> | null = null
  private tail: DataNode<number, number> | null = null

  constructor(private maxSize: number) {}

  public get(key: number) {
    if (!this.store.has(key)) {
      return null
    }
    const val = this.store.get(key)!
    // move to head if exists in DLL
    this.moveToHead(val) // refresh hit for usage scenario
    return val.value
  }
  public set(key: number, value: number) {
    if (this.store.has(key)) {
      this.store.set(key, { key, value, next: null, previous: null })
      this.moveToHead(this.store.get(key)!) // refresh hit for update scenario
      return
    }
    if (this.store.size === this.maxSize) {
      this.evict()
    }
    const newNode: DataNode<number, number> = {
      key,
      value,
      next: null,
      previous: null,
    }
    this.store.set(key, newNode)
    this.insertAtHead(newNode)
  }
  public printCacheContent() {
    console.log(Object.fromEntries(this.store))
  }

  private evict() {
    if (this.tail) {
      const lruKey = this.tail.key
      this.removeNode(this.tail)
      this.store.delete(lruKey)
    }
    return
  }

  private insertAtHead(dataNode: DataNode<number, number>) {
    // 1. Point the new node's next to the current head
    dataNode.next = this.head
    dataNode.previous = null

    // 2. Point the current head's prev to the new dataNode (if head exists)
    if (this.head) {
      this.head.previous = dataNode
    }

    // 3. Make the new dataNode the head
    this.head = dataNode

    // 4. If the list was empty, the new dataNode is also the tail
    if (!this.tail) {
      this.tail = dataNode
    }
  }
  private moveToHead(node: DataNode<number, number>) {
    if (node === this.head) {
      // Already MRU
      return
    }

    // 1. Remove it from its current position
    this.removeNode(node)

    // 2. Insert it at the head
    this.insertAtHead(node)
  }
  private removeNode(node: DataNode<number, number>) {
    const prev = node.previous
    const next = node.next

    if (prev) {
      prev.next = next
    } else {
      // Node is the head
      this.head = next
    }

    if (next) {
      next.previous = prev
    } else {
      // Node is the tail
      this.tail = prev
    }

    // Clean up pointers on the node being removed (optional but good practice)
    node.previous = null
    node.next = null
  }
}
