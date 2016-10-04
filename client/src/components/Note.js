import React, {PropTypes} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

var cardStyle = {width:'320px'};



const Note = ({note}) => {
    return (
        <li>
       		<Card style={cardStyle}>
       			 <CardTitle title={note.title} subtitle={note.created} />
       			 <CardText>{note.message}</CardText>
       		</Card>
        </li>
    );
};

Note.propTypes = {
    note: PropTypes.object.isRequired
};

export default Note;
