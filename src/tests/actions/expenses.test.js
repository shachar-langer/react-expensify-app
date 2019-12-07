import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    startAddExpense,
    addExpense,
    startRemoveExpense,
    removeExpense,
    editExpense,
    startSetExpenses,
    setExpenses
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense('123abc')
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove expenses from firebase', (done) => {
    const store = createMockStore({})
    const id = expenses[0].id
    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })

        // If the snapshot was deleted, the value of the snapshot should be null
        return database.ref(`expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeNull()
        done()
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'new note' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new note'
        }
    })
})

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        note: 'This is for last month rent',
        createdAt: 1234
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        
        // Check if the ADD_EXPENSE action was dispatched with the correct value
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })

        // Check if the data was inserted correctly to the database
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('should add expense with default to database and store', (done) => {
    const store = createMockStore({})
    const defaultExpenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0 
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()

        // Check if the ADD_EXPENSE action was dispatched with the correct value
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        })

        // Check if the data was inserted correctly to the database
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData)
        done()
    })
})

test('should setup set expenses action object with provided values', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({})

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()

        // Check the set expenses action was called
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })

        done()
    })
})