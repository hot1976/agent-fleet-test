/**
 * Divide function - Phase 3 CI/CD test
 * @param a - dividend
 * @param b - divisor
 * @returns quotient
 * @throws Error if divisor is zero
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}
