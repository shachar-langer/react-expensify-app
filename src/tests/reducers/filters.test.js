import moment from 'moment'
import filtersReducer from '../../reducers/filters'

const defaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual(defaultState)
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' }) 
    expect(state).toEqual({
        ...defaultState,
        sortBy: 'amount'       
    })
})

test('should set sortBy to date', () => {
    // We define the current state because by default the 'sortBy' attribute it set to 'date'.
    // We change the value to 'amount' and then check if the filterReducer changed it to 'date.
    const currentState = {
        ...defaultState,
        sortBy: 'amount'
    }
    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' }) 
    expect(state).toEqual({
        ...defaultState,
        sortBy: 'date'       
    })
})

test('should set text filter', () => {
    const text = 'new text'
    const state = filtersReducer(defaultState, {
        type: 'SET_TEXT_FILTER',
        text
    })
    expect(state).toEqual({
        ...defaultState,
        text
    })
})

test('shoud set startDate filter', () => {
    const date = moment(0).add(3, 'day')
    const state = filtersReducer(defaultState, {
        type: 'SET_START_DATE',
        date
    })
    expect(state).toEqual({
        ...defaultState,
        startDate: date
    })
})

test('shoud set endDate filter', () => {
    const date = moment(0).subtract(3, 'day')
    const state = filtersReducer(defaultState, {
        type: 'SET_END_DATE',
        date
    })
    expect(state).toEqual({
        ...defaultState,
        endDate: date
    })    
})