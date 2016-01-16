import React from 'react';
import Editable from './Editable.jsx'
//Note class not declared so it does't have to be imported

export default ({notes, onValueClick, onEdit, onDelete}) => {
	return (
		<ul className = "notes">{notes.map((note) =>
				<li className = "note" key={note.id}> 
					<Editable 
						editting = {note.editting}
						value={note.task} 
					/*these methods will be passed to Note.jsx */
						onValueClick = {onValueClick.bind(null, note.id)}
						onEdit = {onEdit.bind(null, note.id)}
						onDelete = {onDelete.bind(null,note.id)} /> 	
				</li>
			)}</ul>
	);
}

