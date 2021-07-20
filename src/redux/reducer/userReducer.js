let initialState = {
    user: {}
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            state.user = {...action.payload};
    
        default:
            return state
    }

}