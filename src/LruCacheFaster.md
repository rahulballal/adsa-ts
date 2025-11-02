# Example simulation of the LruCacheFaster implementation


## Cache Operations Simulation (Capacity: 2)

| Step | Operation | Key | Value | Cache State | Head | Tail | Notes |
|------|-----------|-----|-------|-------------|------|------|-------|
| 1 | Initial | - | - | `{}` | null | null | Empty cache |
| 2 | Insert | A | 1 | `{A: 1}` | A | A | First item added |
| 3 | Insert | B | 2 | `{A: 1, B: 2}` | B | A | Cache at capacity |
| 4 | Update | A | 10 | `{B: 2, A: 10}` | A | B | A moved to most recent |
| 5 | Get | A | - | `{B: 2, A: 10}` | A | B | A accessed, stays most recent |
| 6 | Insert | C | 3 | `{A: 10, C: 3}` | C | A | B evicted (LRU), C added |

### Final State
- **Most Recent (Head)**: C (key: C, value: 3)
- **Least Recent (Tail)**: A (key: A, value: 10)
- **Evicted**: B (was least recently used when C was inserted)
