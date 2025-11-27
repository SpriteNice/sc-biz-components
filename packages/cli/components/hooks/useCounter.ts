import { useState } from 'react';

/**
 * useCounter - 一个简单的计数器 Hook
 * @param initialValue 初始值，默认为 0
 * @returns 包含当前计数值和操作方法的对象
 */
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
