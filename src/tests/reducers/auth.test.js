import authReducer from '../../reducers/auth'

test('should set user id for login', () => {
    const uid = 'd2rv5qq'
    const state = authReducer({}, {
        type: 'LOGIN',
        uid
    })
    expect(state).toEqual({ uid })
})

test('should remove user id for logout', () => {
    const state = authReducer({ uid: 'dsdf321g' }, {
        type: 'LOGOUT'
    })
    expect(state).toEqual({})
})