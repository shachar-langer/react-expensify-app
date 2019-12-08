import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/dashboard" activeClassName="is-active" exact>Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
)

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    }
}

export default connect(undefined, mapDispatchToProps)(Header)