/**
 * Doubly-linked-list based LRU cache.
 *
 * Characteristics:
 * - get and put are O(1) average time
 * - uses a Map for fast key -> node lookup and a doubly linked list to track recency
 * - handles edge cases: capacity <= 0, storing falsy values like 0, updating existing keys
 */

type Node = {
  key: number
  value: number
  prev: Node | null
  next: Node | null
}

export class LruCacheFaster {
  private map = new Map<number, Node>()
  private head: Node | null = null // most recently used
  private tail: Node | null = null // least recently used

  constructor(private capacity: number) {
    if (capacity < 0) {
      // normalize negative capacities to 0
      this.capacity = 0
    }
  }

  // Return value if found and mark node as most recently used, otherwise -1
  public get(key: number): number {
    const node = this.map.get(key)
    if (!node) return -1

    // move this node to the head (MRU)
    this.moveToHead(node)
    return node.value
  }

  // Insert or update value. When capacity is exceeded, evict LRU node.
  public put(key: number, value: number): void {
    if (this.capacity === 0) {
      // nothing can be stored
      return
    }

    const existing = this.map.get(key)
    if (existing) {
      // update in-place (preserve pointers) and refresh recency
      existing.value = value
      this.moveToHead(existing)
      return
    }

    // create new node
    const node: Node = { key, value, prev: null, next: null }
    this.map.set(key, node)
    this.addToHead(node)

    // if we exceeded capacity, remove LRU (tail)
    if (this.map.size > this.capacity) {
      this.removeTail()
    }
  }

  // ---- helpers (DLL operations) ----

  private addToHead(node: Node) {
    node.prev = null
    node.next = this.head
    if (this.head) this.head.prev = node
    this.head = node

    if (!this.tail) {
      // first node added
      this.tail = node
    }
  }

  private removeNode(node: Node) {
    const { prev, next } = node

    if (prev) prev.next = next
    else this.head = next

    if (next) next.prev = prev
    else this.tail = prev

    // help GC
    node.prev = null
    node.next = null
  }

  private moveToHead(node: Node) {
    if (this.head === node) return
    this.removeNode(node)
    this.addToHead(node)
  }

  private removeTail() {
    if (!this.tail) return
    const oldTail = this.tail
    this.removeNode(oldTail)
    this.map.delete(oldTail.key)
  }

  // Utility for tests / debugging: return keys from most- to least-recent
  public keysMostToLeast(): number[] {
    const res: number[] = []
    let cur = this.head
    while (cur) {
      res.push(cur.key)
      cur = cur.next
    }
    return res
  }

  // Utility: show contents (key -> value) in MRU -> LRU order
  public showContents(): void {
    let cur = this.head
    const rows: string[] = []
    while (cur) {
      rows.push(`${cur.key}=${cur.value}`)
      cur = cur.next
    }
    console.log('LRU cache (MRU -> LRU):', rows.join(' -> '))
  }
}

