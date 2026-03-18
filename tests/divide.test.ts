import { describe, it, expect } from 'vitest';
import { divide } from '../src/divide';

describe('divide function', () => {
  it('should divide two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(10, -2)).toBe(-5);
  });

  it('should return decimal results', () => {
    expect(divide(7, 2)).toBe(3.5);
    expect(divide(1, 3)).toBeCloseTo(0.333333);
  });

  it('should throw error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });

  it('should handle zero dividend', () => {
    expect(divide(0, 5)).toBe(0);
  });
});
