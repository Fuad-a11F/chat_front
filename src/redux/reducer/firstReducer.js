let initialState = {
    photo: []
}

export function firstReducer(state = initialState, action)  {
    switch (action.type) {
        case 'GET_PHOTO':
            return {...state, photo: action.payload};
    
        default:
            return state;
    }
} 