// This reducer is in charge of updating the user object in the state.
// We want to user ID the be stored when he's logged in and to remove it when he log out.
// We add an object to the state and not just the user ID as a string in case we want to
// add more user information in the future.
// The state we recieve in the reducer is only the user objet state.
export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }

}