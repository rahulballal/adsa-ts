/**
 * DOUBLY LINKED LIST WITH QUEUE OPERATIONS
 * 
 * This data structure maintains a sequence of nodes where each node has:
 * - A value (the data we want to store)
 * - A pointer to the previous node (or null if it's the first node)
 * - A pointer to the next node (or null if it's the last node)
 * 
 * The list maintains references to both the HEAD (first node) and TAIL (last node)
 * to enable O(1) operations at both ends.
 * 
 * ============================================================================
 * ALGORITHM SIMULATION WITH SAMPLE DATA
 * ============================================================================
 * 
 * Initial State:
 * head = null, tail = null
 * 
 * ----------------------------------------------------------------------------
 * Step 1: enqueue(10)
 * ----------------------------------------------------------------------------
 * List is empty, so new node becomes both head and tail
 * 
 *     head/tail
 *         ↓
 *   [null ← 10 → null]
 * 
 * ----------------------------------------------------------------------------
 * Step 2: enqueue(20)
 * ----------------------------------------------------------------------------
 * New node is added to the head. Old head's prev points to new node.
 * 
 *     head              tail
 *       ↓                 ↓
 *   [null ← 20 ↔ 10 → null]
 * 
 * ----------------------------------------------------------------------------
 * Step 3: enqueue(30)
 * ----------------------------------------------------------------------------
 * Another node added to head
 * 
 *     head                      tail
 *       ↓                         ↓
 *   [null ← 30 ↔ 20 ↔ 10 → null]
 * 
 * ----------------------------------------------------------------------------
 * Step 4: enqueue(40)
 * ----------------------------------------------------------------------------
 *     head                              tail
 *       ↓                                 ↓
 *   [null ← 40 ↔ 30 ↔ 20 ↔ 10 → null]
 * 
 * ----------------------------------------------------------------------------
 * Step 5: dequeue()
 * ----------------------------------------------------------------------------
 * Remove from tail (returns node with value 10)
 * Tail moves to previous node, and new tail's next becomes null
 * 
 *     head                      tail
 *       ↓                         ↓
 *   [null ← 40 ↔ 30 ↔ 20 → null]    [10] (removed)
 * 
 * ----------------------------------------------------------------------------
 * Step 6: promoteToHead(node with value 20)
 * ----------------------------------------------------------------------------
 * Node 20 is removed from its position and moved to head
 * - Remove 20: 30.next = null (20 was at tail)
 * - Move to head: 20.next = 40, 40.prev = 20, 20.prev = null
 * - Update tail: tail now points to 30
 * 
 *     head              tail
 *       ↓                 ↓
 *   [null ← 20 ↔ 40 ↔ 30 → null]
 * 
 * ----------------------------------------------------------------------------
 * Step 7: enqueue(50)
 * ----------------------------------------------------------------------------
 *     head                      tail
 *       ↓                         ↓
 *   [null ← 50 ↔ 20 ↔ 40 ↔ 30 → null]
 * 
 * ----------------------------------------------------------------------------
 * Step 8: dequeue()
 * ----------------------------------------------------------------------------
 * Remove from tail (returns node with value 30)
 * 
 *     head              tail
 *       ↓                 ↓
 *   [null ← 50 ↔ 20 ↔ 40 → null]    [30] (removed)
 * 
 * ============================================================================
 */

/**
 * Node class for the doubly linked list
 * 
 * Each node contains:
 * - value: The data stored in this node
 * - prev: Reference to the previous node (null if this is the first node)
 * - next: Reference to the next node (null if this is the last node)
 */
export class ListNode<T> {
  value: T;
  prev: ListNode<T> | null = null;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
    // prev and next are initialized to null by default
    // They will be set when the node is added to the list
  }
}

/**
 * Doubly Linked List with Queue Operations
 * 
 * This implementation maintains:
 * - head: Points to the first node (front of queue)
 * - tail: Points to the last node (back of queue)
 * - size: Number of nodes currently in the list
 * 
 * All operations (enqueue, dequeue, promoteToHead) run in O(1) constant time
 * because we maintain references to both ends and can update pointers directly.
 */
export class DoublyLinkedList<T> {
  private head: ListNode<T> | null = null;  // First node in the list
  private tail: ListNode<T> | null = null;  // Last node in the list
  private size: number = 0;                  // Number of nodes in the list

  /**
   * Enqueue - Add a new node to the HEAD (front) of the queue
   * Time Complexity: O(1)
   * 
   * Algorithm:
   * 1. Create a new node with the given value
   * 2. If list is empty, new node becomes both head and tail
   * 3. Otherwise:
   *    a. Set new node's next to current head
   *    b. Set current head's prev to new node
   *    c. Update head to point to new node
   * 4. Increment size
   */
  enqueue(value: T): ListNode<T> {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      // Case 1: Empty list
      // The new node becomes both the head and tail
      this.head = newNode;
      this.tail = newNode;
      // newNode.prev and newNode.next remain null
    } else {
      // Case 2: List has at least one node
      // Insert new node at the head
      
      newNode.next = this.head;     // New node points forward to old head
      this.head.prev = newNode;     // Old head points back to new node
      this.head = newNode;          // Update head reference to new node
      // newNode.prev remains null (it's the first node)
    }
    
    this.size++;
    return newNode;  // Return reference to the newly created node
  }

  /**
   * Dequeue - Remove and return the node from the TAIL (back) of the queue
   * Time Complexity: O(1)
   * 
   * Algorithm:
   * 1. If list is empty, return null
   * 2. Save reference to tail node (this will be removed)
   * 3. If only one node exists, set both head and tail to null
   * 4. Otherwise:
   *    a. Move tail pointer to the previous node
   *    b. Set new tail's next to null (it's now the last node)
   *    c. Set removed node's prev to null (cleanup)
   * 5. Decrement size
   * 6. Return the removed node
   */
  dequeue(): ListNode<T> | null {
    if (!this.tail) {
      // Case 1: Empty list
      return null;
    }

    const removedNode = this.tail;  // Save reference to node being removed

    if (this.head === this.tail) {
      // Case 2: Only one node in the list
      // After removal, list will be empty
      this.head = null;
      this.tail = null;
    } else {
      // Case 3: Multiple nodes in the list
      // Remove the tail node
      
      this.tail = this.tail.prev;   // Move tail to previous node
      if (this.tail) {
        this.tail.next = null;      // New tail's next should be null
      }
      removedNode.prev = null;      // Cleanup: removed node no longer points back
    }

    this.size--;
    return removedNode;  // Return the removed node
  }

  /**
   * PromoteToHead - Move an existing node to the HEAD (front) of the queue
   * Time Complexity: O(1)
   * 
   * This is useful for LRU (Least Recently Used) cache implementations where
   * accessing an item should move it to the front of the queue.
   * 
   * Algorithm:
   * 1. If node is null or already at head, do nothing
   * 2. Remove node from current position:
   *    a. Update the previous node's next pointer to skip this node
   *    b. Update the next node's prev pointer to skip this node
   *    c. If node is at tail, update tail reference
   * 3. Insert node at head:
   *    a. Set node's prev to null (it will be first)
   *    b. Set node's next to current head
   *    c. Update current head's prev to point to this node
   *    d. Update head reference to this node
   */
  promoteToHead(node: ListNode<T>): void {
    // Guard clauses: no action needed in these cases
    if (!node || node === this.head) {
      return;  // Node is already at head or invalid
    }

    // Step 1: Remove node from its current position
    // Update the surrounding nodes to skip this node
    
    if (node.prev) {
      // If there's a previous node, make it point to this node's next
      node.prev.next = node.next;
    }
    
    if (node.next) {
      // If there's a next node, make it point to this node's prev
      node.next.prev = node.prev;
    }

    // Special case: if we're moving the tail node
    if (node === this.tail) {
      this.tail = node.prev;  // Update tail to the previous node
    }

    // Step 2: Insert node at the head
    
    node.prev = null;           // Node will be first, so prev is null
    node.next = this.head;      // Node points to current head
    
    if (this.head) {
      this.head.prev = node;    // Current head points back to node
    }
    
    this.head = node;           // Update head reference

    // Edge case: if list was empty (shouldn't happen, but handle it)
    if (!this.tail) {
      this.tail = node;
    }
  }

  /**
   * Helper method to convert the list to an array
   * Useful for debugging and testing
   * Time Complexity: O(n) where n is the number of nodes
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    // Traverse from head to tail, collecting values
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  /**
   * Get the number of nodes in the list
   * Time Complexity: O(1)
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Get the head node
   * Time Complexity: O(1)
   */
  getHead(): ListNode<T> | null {
    return this.head;
  }

  /**
   * Get the tail node
   * Time Complexity: O(1)
   */
  getTail(): ListNode<T> | null {
    return this.tail;
  }
}

export function exmapleUsage() {

  // ============================================================================
  // EXAMPLE USAGE
  // ============================================================================
  
  const list = new DoublyLinkedList<number>();
  
  console.log("=== Creating a Doubly Linked List ===\n");
  
  // Enqueue some values
  console.log("Step 1: Enqueue 10, 20, 30, 40");
  const node10 = list.enqueue(10);
  const node20 = list.enqueue(20);
  const node30 = list.enqueue(30);
  const node40 = list.enqueue(40);
  console.log("List:", list.toArray());  // [40, 30, 20, 10]
  console.log("Head:", list.getHead()?.value);  // 40
  console.log("Tail:", list.getTail()?.value);  // 10
  console.log();
  
  // Dequeue from tail
  console.log("Step 2: Dequeue (remove from tail)");
  const removed = list.dequeue();
  console.log("Removed:", removed?.value);  // 10
  console.log("List:", list.toArray());  // [40, 30, 20]
  console.log("New Tail:", list.getTail()?.value);  // 20
  console.log();
  
  // Promote a middle node to head
  console.log("Step 3: Promote node with value 20 to head");
  list.promoteToHead(node20);
  console.log("List:", list.toArray());  // [20, 40, 30]
  console.log("New Head:", list.getHead()?.value);  // 20
  console.log("New Tail:", list.getTail()?.value);  // 30
  console.log();
  
  // Enqueue another value
  console.log("Step 4: Enqueue 50");
  list.enqueue(50);
  console.log("List:", list.toArray());  // [50, 20, 40, 30]
  console.log();
  
  // Dequeue again
  console.log("Step 5: Dequeue (remove from tail)");
  const removed2 = list.dequeue();
  console.log("Removed:", removed2?.value);  // 30
  console.log("Final List:", list.toArray());  // [50, 20, 40]
  console.log("Size:", list.getSize());  // 3
}
