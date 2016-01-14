import React from 'react';

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
		return <div onClick={this.edit}> {this.props.task} </div>
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

		if(this.props.onEdit) {
			console.log("editting")
			this.props.onEdit(keyPress.target.value);	//this is a callback (ie delegate method)
		}

		this.setState({
			editting: false
		});
	};

}