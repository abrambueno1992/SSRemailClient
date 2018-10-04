import {FETCH_MESSAGES} from '../actions/actions'
const startState = {
    nothing: true,
    agencies: ''
}
const reducer = (state = startState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
            return (Object.assign({}, state, {
                agencies: action.payload,
                nothing: action.nothing
            }))
        default: 
            return state
    }
}

export default reducer