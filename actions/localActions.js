export const REORGANIZE = 'REORGANIZE';

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