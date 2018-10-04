import {FETCH_MESSAGES, FETCH_PERSON, ERROR} from '../actions/actions'
const startState = {
    nothing: true,
    messages: null,
    persons: [],
    error: null
}
const reducer = (state = startState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
            return (Object.assign({}, state, {
                messages: action.payload,
                nothing: action.nothing
            }))
            case FETCH_PERSON:
            return (Object.assign({}, state, {
                persons: [...state.persons, action.payload],
                // nothing: action.nothing
            }))
            case ERROR:
            return (Object.assign({}, state, {
                error: action.payload,
                nothing: action.nothing
            }))

        default: 
            return state
    }
}

export default reducer