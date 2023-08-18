import './helpers'
import { expect, test } from 'vitest'
import { compoundInterest,simpleInterest } from './helpers'

test('Annually Compounding with Full Year', () => {
  expect(compoundInterest(100, 5, 24, 12)).toBe(110.25)
})

test('Annually Compounding with Less than one pay period', () => {
  expect(compoundInterest(100, 5, 6, 12)).toBe(102.5)
})

test('Annual Compounding with Partial Pay Period (6 extra months)', () => {
  expect(compoundInterest(100, 5, 18, 12)).toBe(107.62)
})

test('Annual Compounding with Partial Pay Period (2 extra months)', () => {
  expect(compoundInterest(100, 5, 26, 12)).toBe(111.17)
})

test('Monthly Compounding with full year', () => {
  expect(compoundInterest(100, 5, 24, 1)).toBe(110.49)
})

test('Simple Interest Rate', () => {
  expect(simpleInterest(100, 5, 24)).toBe(110.00)
})