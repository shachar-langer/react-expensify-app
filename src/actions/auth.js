import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

// We don't dispatch the login action above here, because this will update the state
// only when we explicitly log in. We also want to update the state when the user refresh for example.
// Thus we will call the two action separately.
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}