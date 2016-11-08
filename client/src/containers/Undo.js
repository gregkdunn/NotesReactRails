import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo-immutable'
import FlatButton from 'material-ui/FlatButton'

let Undo = ({ canUndo, canRedo, onUndo, onRedo }) => {
	//console.log('Undo')

   const shouldDisable = (list) => {
       //console.log('testCan')
       //console.dir(list)
       //console.log(list.size)
       return (list.size <= 0)
   }

    const undoClick = () => {
        console.log('undoClick')
        if(!(shouldDisable(canUndo))) {
            console.log('canUndo = YES')
            onUndo();
        }
   }

   const redoClick = () => {
        console.log('redoClick')
        if(!(shouldDisable(canUndo))) {
            console.log('canRedo = YES')
            onRedo();
        }
   }

    return (
    	<div>
          <FlatButton label="< Undo" disabled={shouldDisable(canUndo)} secondary={true} onClick={e => {undoClick()}}/>
          <FlatButton label="> Redo" disabled={shouldDisable(canRedo)} secondary={true} onClick={e => {redoClick()}} />
        </div>
    )
}

Undo.propTypes = {
	canUndo: PropTypes.object.isRequired,
    canRedo: PropTypes.object.isRequired,
	onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
      canUndo: state.getIn(['notes', 'past']),
      canRedo: state.getIn(['notes', 'future']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

Undo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Undo)

export default Undo