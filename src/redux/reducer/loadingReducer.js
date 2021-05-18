let initialState = {
    loading: false
}

export function secondReducer(state = initialState, action)  {
    switch (action.type) {
        case 'SHOW_LOADING': 
            return {loading: true};
        case 'HIDE_LOADING':
            return {loading: false};
        default:
            return state;
    }
} 