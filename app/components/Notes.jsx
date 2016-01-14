import React from 'react';
import Note from './Note.jsx';

export default ({notes, onEdit, onDelete}) => {
	return (
		<ul className = "notes">{notes.map((note) =>
				<li className = "note" key={note.id}> 
					<Note 
						task={note.task} 
					/*these methods will be passed to Note.jsx */
						onEdit = {onEdit.bind(null, note.id)}
						onDelete = {onDelete.bind(null,note.id)} /> 	
				</li>
			)}</ul>
	);
}
