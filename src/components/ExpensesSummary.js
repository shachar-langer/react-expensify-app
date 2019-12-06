import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import getVisibleExpenses from '../selectores/expenses'
import getExpensesTotal from '../selectores/expenses-total'

export const ExpensesSummary = (props) => {
    const expensesVariation = props.expenses.length !== 1 ? 'expenses' : 'expense'
    const formattedTotal = numeral(getExpensesTotal(props.expenses) / 100).format('$0,0.00')
    return (
        <div>
            <h1>
                Viewing {props.expenses.length} {expensesVariation} totalling {formattedTotal}
            </h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    expenses: getVisibleExpenses(state.expenses, state.filters)

})

export default connect(mapStateToProps)(ExpensesSummary)