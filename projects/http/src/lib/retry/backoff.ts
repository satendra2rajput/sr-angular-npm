export function calculateBackoff(attempt: number, delay: number, maxDelay: number): number {
  const exponentialDelay = delay * Math.pow(2, attempt - 1);

  return Math.min(exponentialDelay, maxDelay);
}
