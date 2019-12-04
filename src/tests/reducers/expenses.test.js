import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove an expense by ID', () => {
    const state = expensesReducer(expenses, {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    })
    expect(state).toEqual([expenses[1], expenses[2]])
})

test('should not remove an expense if ID not found', () => {
    const state = expensesReducer(expenses, {
        type: 'REMOVE_EXPENSE',
        id: -1
    })
    expect(state).toEqual(expenses)
})

test('should add an expense', () => {
    const newExpense = {
        id: 104,
        description: 'new expense',
        note: '',
        amount: 100,
        createdAt: 4
    }
    const state = expensesReducer(expenses, {
        type: 'ADD_EXPENSE',
        expense: newExpense
    })
    expect(state).toEqual([
        ...expenses,
        newExpense
    ])
})

test('should edit an expense by ID', () => {
    const updatedExpenseData = {
        amount: 123456789
    }
    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: updatedExpenseData
    })
    expect(state).toEqual([
        {
            ...expenses[0],
            ...updatedExpenseData
        },
        expenses[1], 
        expenses[2]
    ])
})

test('should not edit an expense if ID not found', () => {
    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: { description: 'updated description' }
    })
    expect(state).toEqual(expenses)
})