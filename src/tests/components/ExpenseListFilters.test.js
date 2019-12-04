import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { defaultFilters, filters } from '../fixtures/filters'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filters={defaultFilters}
        />)
})

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with non default filters', () => {
    wrapper.setProps({
        filters
    })
    expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
    const value = 'new text'
    wrapper.find('input').simulate('change', {
        target: { value }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
    // We first change the sortBy default value to amount and then change
    // it to date from the code
    wrapper.setProps({ filters })
    const value = 'date'
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
    const value = 'amount'
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date changes', () => {
    const value = {
        startDate: moment(0),
        endDate: moment(0).add(4, 'days')
    }
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(value)
    expect(setStartDate).toHaveBeenLastCalledWith(value.startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(value.endDate)
})

test('should handle date focus change', () => {
    const calendarFocused = 'startDate'
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})