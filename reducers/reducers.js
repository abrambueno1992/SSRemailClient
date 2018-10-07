import { DONE_FETCHING, FETCH_MESSAGES, FETCH_PERSON, ERROR, DONE_MESSAGES } from '../actions/actions';
import { REORGANIZE } from '../actions/localActions'
const startState = {
    nothing: true,
    messages: null,
    persons: [],
    error: null,
    fetchPersonsComplete: false,
    fetchMessagesComplete: false,
    organized: false
}
const reducer = (state = startState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
            return (Object.assign({}, state, {
                messages: action.payload,
                nothing: action.nothing,
            }))
        case FETCH_PERSON:
            return (Object.assign({}, state, {
                persons: [...state.persons, action.payload],
            }))
        case DONE_FETCHING:
            return Object.assign({}, state, {
                fetchPersonsComplete: action.payload
            });
            case DONE_MESSAGES:
            return Object.assign({}, state, {
                fetchMessagesComplete: action.payload
            })
        case REORGANIZE:
            return Object.assign({}, state, {
                persons: action.persons,
                messages: action.messages,
                organized: action.organized
            })
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