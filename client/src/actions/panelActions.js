import * as types from '../constants/actionTypes'

//panels - update for new notes
export const toggleLeft = (update) => {
  console.log('TOGGLE_LEFT:');  
    return {
      type: types.TOGGLE_LEFT
    };
}

export const toggleRight = (update) => {
  console.log('TOGGLE_RIGHT:');  
    return {
      type: types.TOGGLE_RIGHT
    };
}