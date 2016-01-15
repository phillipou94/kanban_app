import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

//properties : task,

export default class Lane extends React.Component {

	constructor(props) {
		super(props);

		const laneId = props.lane.id;
		this.addNote = this.addNote.bind(this,laneId);	//pass laneId to these methods
		this.deleteNote = this.deleteNote.bind(this,laneId);
	}

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
			<Notes notes={NoteStore.get(lane.notes)} 
  				onEdit={this.editNote}
  				onDelete={this.deleteNote}/>
  		</div>

		);

	}

	addNote(laneId) {
		//adding note to a Lane
		const note = NoteActions.create({task:'New task'});
		LaneActions.attachToLane({
			noteId: note.id,
			laneId: laneId
		});
	}

	editNote = (id, task) => {
  	NoteActions.update({id, task});

  };

  deleteNote = (laneId, noteId) => {
  	LaneActions.detachFromLane({laneId, noteId});
  	NoteActions.delete(noteId);
  };
}