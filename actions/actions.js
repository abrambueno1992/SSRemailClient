import fetch from 'isomorphic-unfetch'
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_PERSON = 'FETCH_PERSON';
export const ERROR = 'ERROR';

export const fetchMessagesAction = (start, end) => {
    let string = '';
    for (let i = start; end > i; i++) {
        string += '&&'
        string += `id=${i}`
    }
    const root = 'https://morning-falls-3769.herokuapp.com/api/messages?';
    string = root + string;
    return async (dispatch) => {
        await fetch(string)
            // const data = await response.json()
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                dispatch({
                    type: FETCH_MESSAGES,
                    payload: res,
                    nothing: false
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err,
                    nothing: true
                })
            })
        // const data = await response.json();


    }
}

export const fetchPersonAction = (email) => {

    let emailToString = email.toString();
    let root = 'https://morning-falls-3769.herokuapp.com/api/people/';
    root += emailToString
    // console.log('data', emailToString, root)
    return async (dispatch) => {
        await fetch(root)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                dispatch({
                    type: FETCH_PERSON,
                    payload: res,
                    nothing: false
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err,
                    nothing: true
                })
            })
        // const data = await response.json();
        // dispatch({
        //     type: FETCH_PERSON,
        //     payload: data,
        // })

    }
}

