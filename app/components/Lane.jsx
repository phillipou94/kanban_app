import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

//properties : task,

export default class Lane extends React.Component {

	componentDidMount() {
		NoteStore.listen(this.storeChanged);
	}

	componentWillUnmount() {
		NoteStore.unlisten(this.storeChanged);
	}

	storeChanged = (state) => {
		this.setState(state);
	};

	render() {
		const {lane, ...props} = this.props;	
		/*
			let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
			x; // 1
			y; // 2
			z; // { a: 3, b: 4 }
		*/

		return(
			<div {...props}>
				<div className="lane-header"></div>
				<div className="lane-add-notes">
					<button onClick = {this.addNote}> + </button>
				</div>
			<Notes notes={NoteStore.getState().notes} 
  				onEdit={this.editNote}
  				onDelete={this.deleteNote}/>
  		</div>

		);

	}

	addNote() {
		NoteActions.create({task:'New task'});
	}

	editNote = (id, task) => {
  	NoteActions.update({id, task});

  };

  deleteNote = (id) => {
  	NoteActions.delete(id);
  };
}