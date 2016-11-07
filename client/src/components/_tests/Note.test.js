import React from 'react'
import Immutable from 'Immutable'
import { shallow } from 'enzyme'
import Note from './Note'

let enzymeWrapper
const exampleNote = Immutable.fromJS({
            'uuid': 2,
            'id': 0,
            'title': 'Taco Tuesday',
            'content': 'Always Awesome',
            'created_at': '', 
            'updated_at': '',
            'isEditing': false,
            'isSaving': false,
            'isDeleting': false
          })
const onEdit = () => {}
const onDelete = () => {}

const props = {
    note: exampleNote,
    onEditHandler: onEdit,
    onDeleteHandler: onDelete
}

describe('components', () => {
  beforeEach(() => {
      enzymeWrapper = shallow(<Note note={props.note} onEditOpenHandler={props.onEditHandler} onDeleteHandler={props.onDeleteHandler}  />)
 })

  describe('Note', () => {
    it('should display the id', () => {
      expect(enzymeWrapper.find('span').hasClass('idDisplay')).toBe(true)
      expect(enzymeWrapper.find('.idDisplay').text()).toEqual('0')
    })

    it('should display the title', () => {
      expect(enzymeWrapper.find('CardTitle').props().title).toBe('Taco Tuesday')
    })

  })
})