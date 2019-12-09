import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import getVisibleExpenses from '../selectores/expenses'
import getExpensesTotal from '../selectores/expenses-total'

export const ExpensesSummary = (props) => {
    const expensesVariation = props.expenses.length !== 1 ? 'expenses' : 'expense'
    const formattedTotal = numeral(getExpensesTotal(props.expenses) / 100).format('$0,0.00')
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Viewing <span>{props.expenses.length}</span> {expensesVariation} totalling <span>{formattedTotal}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    expenses: getVisibleExpenses(state.expenses, state.filters)

})

export default connect(mapStateToProps)(ExpensesSummary)