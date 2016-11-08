import * as types from '../constants/actionTypes'
import Immutable from 'immutable'

const initialState = Immutable.Map({
        isLeftOpen: false,
        isRightOpen: false
    }
)

const panels = (state = initialState, action) => {
    console.log(' >>>Panel State:' + state)

    switch (action.type) {
        //FRONTEND ACTIONS
        case types.TOGGLE_LEFT:
            return state.set('isLeftOpen', !(state.get('isLeftOpen'))).set('isRightOpen', false)
        case types.TOGGLE_RIGHT:
            return state.set('isRightOpen', !(state.get('isRightOpen'))).set('isLeftOpen', false) 
        default:
            return state
    }
};

export default panels