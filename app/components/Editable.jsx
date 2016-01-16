import React from 'react';

export default class Editable extends React.Component {
	render() {
		const {value, onEdit, onValueClick, editting, ...props} = this.props;

		return (
			<div {...props}>
				{editting ? this.renderEdit() : this.renderValue()}
			</div>
		);

	};

	renderEdit = () => {
		return (
			<input type = "text"
					autofocus = {true}
					placeholder={this.props.value}
					onBlur={this.finishEdit}
					onKeyPress={this.checkEnter} />
		);
	};

	renderValue = () => {
		const onDelete = this.props.onDelete;

		return (
			<div onClick = {this.props.onValueClick}>
				<span className="value">{this.props.value}</span>
				{onDelete ? this.renderDelete() : null}
			</div>
		);
	};

	renderDelete = () => {
		return <button className = "delete" onClick={this.props.onDelete}>x</button>;
	};

	checkEnter = (keyPress) => {
		if (keyPress.key === 'Enter') {
			this.finishEdit(keyPress);
		}
	};

	finishEdit = (keyPress) => {
		if(this.props.onEdit) {
			this.props.onEdit(keyPress.target.value);
		}
	};

}