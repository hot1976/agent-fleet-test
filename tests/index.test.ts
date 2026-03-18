import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '../src/index';

describe('Math functions', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(-1, 1)).toBe(0);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(1, 1)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(0, 5)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(6, 2)).toBe(3);
      expect(divide(5, 2)).toBe(2.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(1, 0)).toThrow('Cannot divide by zero');
    });
  });
});
