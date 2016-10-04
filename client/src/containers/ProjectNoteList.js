import { connect } from 'react-redux';
import NoteList from '../components/NoteList';

const mapStateToProps = (state) => ({
    notes: state.notes
});

const mapDispatchToProps =  ({
});

const ProjectNoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteList);

export default ProjectNoteList;