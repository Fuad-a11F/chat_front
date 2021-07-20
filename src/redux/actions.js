import axios from "axios"

export  const  getPhoto =  ()  => dispatch  => {
    dispatch(loading_show())
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=5')
    .then(data  => {
        dispatch({type: 'GET_PHOTO', payload: data.data});
        dispatch(loading_hide())
    })
    
}

export function loading_show() {
    return {type: 'SHOW_LOADING'}
}

export function loading_hide() {
    return {type: 'HIDE_LOADING'}
}

export function set_user(payload) {
    return {
        type: 'SET_USER',
        payload: payload
    }
}