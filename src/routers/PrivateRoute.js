import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({
    isAuthenticated,
    // We rename this prop to begin with a capital letter so we can render it in React
    component: Component,
    ...rest
}) => (
    // We get the 'props' in the component function from Route
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            // When redirect get renderred, it redirect you
            <Redirect to="/" />
        )
    )}/>
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)
