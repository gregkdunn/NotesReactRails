import * as actions from '../notesActions'
import * as types from '../../constants/actionTypes'

describe('actions', () => {
  it('should create an action to add a note', () => {
    const note = {
    	title: 'hey there',
    	content: 'this is amazing'
    }

    const expectedAction = {
      type: types.ADD_NOTE,
      note
    }
    expect(actions.addNote(note).note).toEqual(expectedAction.note)
    expect(actions.addNote(note).type).toEqual(expectedAction.type)
  })
})
