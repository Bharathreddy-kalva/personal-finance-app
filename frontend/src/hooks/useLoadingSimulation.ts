import { useState, useEffect } from 'react';

/**
 * Simulates async data loading with a configurable delay.
 * Returns { data, isLoading } where data is null during loading.
 * Used as a placeholder until real Spring Boot API integration.
 */
export function useLoadingSimulation<T>(mockData: T, delayMs = 800): { data: T | null; isLoading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    const timer = setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, delayMs);
    return () => clearTimeout(timer);
    // Only re-run if delayMs changes — mockData is static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayMs]);

  return { data, isLoading };
}
