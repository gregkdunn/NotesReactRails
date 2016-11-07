import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import * as actions from '../notesActions'
import * as types from '../../constants/actionTypes'
import * as requests from '../../constants/requests'
import { parseJSON, mockResponse } from '../../helpers/async'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const notes = [{"content":"Dont forget the milk.", "created_at":"2016-10-28T02:03:55.700Z", "id":67, "title":"Cereal Day", "updated_at":"2016-10-28T02:03:55.700Z"}]
const notesString = JSON.stringify(notes)

window.fetch = jest.fn().mockImplementation(() =>
 Promise.resolve(mockResponse(200, null, notesString)))

let store = mockStore({})

describe('async actions', () => {
  beforeAll(() => {
    
  })
  it('creates FETCH_NOTES_SUCCESS when fetching notes is complete', () => {        
    store.dispatch(actions.fetchNotes())
    .then(() => {
      const actualActions = store.getActions()
      console.log('Actuals')
      console.dir(actualActions)

      //obviously these are not working
      expect(false).toEqual(true)
      expect(actualActions.length).toBe(2)
      expect(actualActions[0]).toEqual({ type: types.FETCH_NOTES_REQUEST })
      expect(actualActions[1]).toEqual({ type: types.FETCH_NOTES_SUCCESS, 'notes': notes  })

    })
  })

  it('x', () => {
    expect(true).toEqual(true)
  })
})