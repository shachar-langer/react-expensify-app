import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense)

        // We get the history property from 'react-redux'.
        // The push method redirect us to a different page with refreshing the broswer
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

// mapDispatchToProps is created here to make a more testable component.
// We can check only the arguments passed to addExpense without worrying about
// the 'dispatch' call and how to access the inner 'addExpense' call
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)