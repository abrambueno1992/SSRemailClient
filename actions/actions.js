import fetch from 'isomorphic-unfetch'
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_PERSON = 'FETCH_PERSON';
export const ERROR = 'ERROR';
export const DONE_FETCHING = 'DONE_FETCHING';

export const fetchMessagesAction = (start, end) => {
    let string = '';
    for (let i = start; end > i; i++) {
        string += '&&'
        string += `id=${i}`
    }
    const rootMessage = 'https://morning-falls-3769.herokuapp.com/api/messages?';
    string = rootMessage + string;
    return async (dispatch) => {
        await fetch(string)
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
    }
}

export const fetchPersonAction = (email) => {
    
        let emailToString = email.toString();
        let root = 'https://morning-falls-3769.herokuapp.com/api/people/';
        root += emailToString
        return async (dispatch) => {
            await fetch(root)
                .then((data) => {
                    return data.json()
                })
                .then((res) => {
                    dispatch({
                        type: FETCH_PERSON,
                        payload: res,
                    })
                })
                .catch(err => {
                    dispatch({
                        type: ERROR,
                        payload: err,
                    })
                })
        }
}

export const doneAction = () => {
    return dispatch => {
        dispatch({
            type: DONE_FETCHING,
            payload: true
        })
    }
}

