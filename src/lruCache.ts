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
    private store = new Map<number, number>(); // to store the cache data
    private hitCounter = new Map<number, number>; // to store counts
    private counter: number = 0;

    constructor(private capacity: number) {
    }

    private evict(): number {
        let lowestHitCount = -1
        let lowestHitKey = -1
        this.hitCounter.entries().forEach((pair) => {
            const [k,hits] = pair
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
        console.log("--store start--")
        this.store.entries().forEach(entry => {
            console.log(`Key => ${entry[0]}, Value => ${entry[1]}`)
        })
        console.log("--store end--")
        console.log("--counter start--")
        this.hitCounter.entries().forEach(entry => {
            console.log(`Key => ${entry[0]}, Hits => ${entry[1]}`)
        })
        console.log("--counter end--")
    }

    public put(key: number, value: number){
        if (this.counter < this.capacity) {
            this.store.set(key, value)
            if(!this.hitCounter.has(key)) {
                this.hitCounter.set(key, 1)
            }
            this.counter = this.counter + 1
        } else {
            const evicted = this.evict()
            const yeeted = this.store.delete(evicted)
            if(yeeted) {
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


type DataNode<TKey, TValue> {
    key: TKey
    value: TValue
    previous: DataNode<TKey, TValue> | null
    next: DataNode<TKey, TValue> | null
}


export class LruCacheFaster {
    private store = new Map<number, DataNode<number, number>>()

    constructor(private maxSize: number){}

    public get(key: number) {}
    public set(key:number, value: number) {}
    public printCacheContent() {
        console.log(Object.fromEntries(this.store))
    }

    private insertAtHead(dataNode: DataNode<number, number>) {}
    private moveToHead(dataNode: DataNode<number, number>){}
    private removeTail(dataNode: DataNode<number, number>) {}
}

