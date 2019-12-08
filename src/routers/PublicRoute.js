import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
    isAuthenticated,
    // We rename this prop to begin with a capital letter so we can render it in React
    component: Component,
    ...rest
}) => (
    // We get the 'props' in the component function from Route
    <Route {...rest} component={(props) => (
        !isAuthenticated ? (
            // if we're logged out and we want to reach the component that's public, render the component
            <Component {...props} />
        ) : (
            // if we're logged in and we try to redirect to a public route (like the login page) without refreshing,
            // we will redirect to the dashboard
            <Redirect to="/dashboard" />
        )
    )}/>
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)
