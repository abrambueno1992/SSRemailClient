import fetch from 'isomorphic-unfetch'
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const ERROR = 'ERROR';

export const fetchMessagesAction = (start, end) => {
    let string = '';
    for (let i = start; end >= i; i++) {
        string += '&&'
        string += `id=${i}`
    }
    const root = 'https://jsonplaceholder.typicode.com/posts?';
    string = root + string;
    return async (dispatch) => {
        const response =  await fetch(string)
        const data = await response.json();
        dispatch({
            type: FETCH_MESSAGES,
            payload: data,
            nothing: false
        })
        
    }
}