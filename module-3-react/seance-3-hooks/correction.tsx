// ✅ Correction - Hooks

import { useState, useEffect, useRef, useMemo } from 'react';

// 1. Timer
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return <div>Secondes: {seconds}</div>;
}

// 2. AutoFocus
function AutoFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}

// 3. ExpensiveCalculation
function ExpensiveCalculation({ numbers }: { numbers: number[] }) {
  const sum = useMemo(() => {
    console.log('Calcul...');
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);

  return <div>Somme: {sum}</div>;
}

export { Timer, AutoFocus, ExpensiveCalculation };
