/*
### 🧩 Problem: Two Sum

**Objective:**  
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to the target.

---

### 🔢 Inputs

- `nums`: List of integers (e.g., `[2, 7, 11, 15]`)
- `target`: Integer value (e.g., `9`)

---

### 🎯 Output

- A list of two integers representing the indices of the elements in `nums` that sum to `target`  
  - Example: `[0, 1]` → because `nums[0] + nums[1] = 2 + 7 = 9`
---
### 📌 Constraints
- Each input has **exactly one solution**
- You **may not use the same element twice**
- Return the answer in **any order**
- Time complexity should ideally be **O(n)** using a hash map
- **1 ≤ nums.length ≤ 10⁴**
- **-10⁹ ≤ nums[i] ≤ 10⁹**
- **-10⁹ ≤ target ≤ 10⁹**
---
### ✅ Example
```python
Input: nums = [3, 2, 4], target = 6  
Output: [1, 2]  # Because nums[1] + nums[2] = 2 + 4 = 6
```
*/


export function twoSum(nums: number[], target: number) {
    if (nums === null || nums === undefined) return []
    if (target === null || target === undefined) return []

    if (nums.length < 2) return []

    if (nums.length === 2) {
        if (nums[0] === null || nums[0] === undefined || nums[1] === null || nums[1] === undefined) return []
        if ((nums[0] + nums[1]) === target) return [0, 1]
        return []
    }

    let startIndex = 0
    let other: number | undefined = undefined
    for (let i = 0; i < nums.length; i++) {
        startIndex = i
        const currentNum = nums[i]
        const remaining = target - currentNum!
        for (let j = 0; j < nums.length; j++) {
            if (i !== j && nums[j] === remaining) {
                other = j
            }
            if (other !== undefined) {
                break;
            }
        }
        if (other) {
            break;
        }

    }
    if (other) return [startIndex, other]

    return []
}

export function twoSumFaster(nums: number[], target: number): number [] {
    if (nums === null || nums === undefined) return []
    if (target === null || target === undefined) return []

    if (nums.length < 2) return []

    if (nums.length === 2) {
        if (nums[0] === null || nums[0] === undefined || nums[1] === null || nums[1] === undefined) return []
        if ((nums[0] + nums[1]) === target) return [0, 1]
        return []
    }
    const lookup = new Map<number, number>()
    nums.forEach((element, index) => {
        lookup.set(element, index)
    })

    // const {startIndex, endIndex}: { startIndex: number, endIndex: number } = nums.reduce((acc, currentValue, currentIndex) => {
    //     if (acc.endIndex > 0) return acc;
    //     const difference = Math.abs(target - currentValue)
    //     if (lookup.get(difference) !== undefined) {
    //         return {startIndex: currentIndex, endIndex: lookup.get(difference)!}
    //     }
    //     return acc
    // }, {startIndex: 0, endIndex: 0})

    let startIndex = 0, endIndex = 0;

    for (let i = 0; i < nums.length; i++) {
        let difference = Math.abs(target - nums[i]!)
        let foundIndex = lookup.get(difference)
        if (foundIndex !== undefined && foundIndex !== i) {
            startIndex = i
            endIndex = foundIndex
            break;
        }
    }

    if (endIndex > 0) return [startIndex, endIndex]
    return []
}