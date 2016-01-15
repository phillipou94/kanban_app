import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';
import assign from 'object-assign';


class NoteStore {
	constructor() {
		this.bindActions(NoteActions);		//allow actions from NoteActions.js. bind to method name
		this.notes = [];
	}

	/*we have create, update, and delete actions */

	create(note) {
		const notes = this.notes;
		note.id = uuid.v4();
		this.setState({
			notes: notes.concat(note)
		});

	}

	update(updatedNote) {
		const notes = this.notes.map( (note) => {
			if (note.id === updatedNote.id) {
				return assign({},note,updatedNote);	//assign({}, originalObj, replaceOriginalObj)
			}
			return note
		});
		
		this.setState({notes});
	}

	delete(id) {
		const notes = this.notes.filter( (note) => note.id !== id)
		this.setState({notes});
	}
}

export default alt.createStore(NoteStore, 'NoteStore');	//create store for NoteStore called NoteStore
