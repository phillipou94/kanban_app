import React from 'react';
import NoteStore from '../stores/NoteStore'

//properties : task,

export default class Note extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editting : false
		};
	}

	render() {
		if(this.state.editting) {
			return this.renderEdit();
		}
		return this.renderNote();
	}

	renderEdit = () => {
		return <input type = "text"
						autoFocus = {true}
						placeholder = {this.props.task}
						onBlur = {this.finishEdit}
						onKeyPress = {this.checkEnter} />;	//check for enter each key press
	};

	renderNote = () => {

	    const onDelete = this.props.onDelete;

	    return (
	      <div onClick={this.edit}>
	        <span className = "task">{this.props.task}</span>
	        {onDelete ? this.renderDelete() : null }	
	      </div> /*render delete button if onDelete */
	    );

	};

	 renderDelete = () => {
	    return <button className = "delete-note" onClick={this.props.onDelete}>x</button>;
	};

	edit = () => {
		this.setState({
			editting: true
		});
	};

	checkEnter = (keyPress) => {	//method takes in parameter
		if (keyPress.key === 'Enter') {
			this.finishEdit(keyPress)
		}
	};

	finishEdit = (keyPress) => {

		if(this.props.onEdit) {		//this onEdit refers to the onEdit = {onEdit.bind(null, note.id) defined in notes
			this.props.onEdit(keyPress.target.value);	//this is a callback (ie delegate method)
		}

		this.setState({
			editting: false
		});
	};

}