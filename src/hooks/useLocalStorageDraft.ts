/**
 * @file useLocalStorageDraft.ts
 * @description Production-grade custom React hook providing persistent state
 * synchronization with browser localStorage, multi-tab change listening,
 * safe SSR fallback handling, and memory leak prevention.
 */

"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook that synchronizes state with localStorage, persisting drafts across page reloads
 * and synchronizing state changes automatically across multiple open browser tabs.
 *
 * @template T - The type of the state value.
 * @param {string} key - The localStorage key under which the draft is saved.
 * @param {T} initialValue - The initial value to fall back to if no stored data exists.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A tuple containing the stateful value and its setter.
 */
export function useLocalStorageDraft<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // Lazy initialization to fetch from localStorage securely on mount (SSR safe)
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Optimized setter function that updates both local state and localStorage atomically,
   * fully supporting functional state updates matching standard React setState signatures.
   */
  const setValue = useCallback(
    (valueOrUpdater: T | ((val: T) => T)) => {
      try {
        setStoredValue((prevValue) => {
          const valueToStore =
            valueOrUpdater instanceof Function
              ? valueOrUpdater(prevValue)
              : valueOrUpdater;

          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }

          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error writing to localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  /**
   * Synchronizes state across multiple browser tabs and cleans up event listeners
   * on unmount to prevent browser memory leaks.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.warn(
            `Error parsing storage sync update for key "${key}":`,
            error,
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener to prevent memory leaks
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
