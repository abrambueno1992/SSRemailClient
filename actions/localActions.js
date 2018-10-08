export const REORGANIZE = 'REORGANIZE';
export const CHOSE_PERSON = 'CHOSE_PERSON';

export const reorganizeAction = (persons, messages) => {
    return dispatch => {
        dispatch({
            type: REORGANIZE,
            persons: persons,
            messages: messages,
            organized: true
        })
    }
}

export const chosenPersonAction = (person) => {
    
    return dispatch => {
        dispatch({
            type: CHOSE_PERSON,
            payload: person
        })
    }
}