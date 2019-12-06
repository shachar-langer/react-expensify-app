import getExpensesTotal from '../../selectores/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
    const sum = getExpensesTotal([])
    expect(sum).toBe(0)
})

test('should correctly add up a single expense', () => {
    const sum = getExpensesTotal([expenses[0]])
    expect(sum).toBe(expenses[0].amount)
})

test('should correct add up multiple expenses', () => {
    const sum = getExpensesTotal(expenses)
    expect(sum).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount)
})