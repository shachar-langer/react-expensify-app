import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)

    // We check that the error is empty before clicking submit
    expect(wrapper.state('error').length).toBe(0)

    // Making sure that when the error state is empty, nothing get rendered
    expect(wrapper).toMatchSnapshot()

    // Clicking submit
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })

    // We didn't give any description or amount so there should be an error
    expect(wrapper.state('error').length).toBeGreaterThan(0)

    // Making sure that after the error state is changed, it's actually get rendered
    expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
    const value = 'new description'
    const wrapper = shallow(<ExpenseForm />)

    // Simulate the change event on the description input. This is the first input out of many
    // so we access it by using 'at(0)'.
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
    const value = 'new note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
    const value = '1888.75'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if invalid input', () => {
    const value = '1888.755'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount').length).toBe(0)
})

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[2].description,
        amount: expenses[2].amount,
        note: expenses[2].note,
        createdAt: expenses[2].createdAt
    })
})

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('sould set calendarFocused on data picker focus change', () => {
    const focused = { focused: true }
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')(focused)
    expect(wrapper.state('calendarFocused')).toBe(focused.focused)
})