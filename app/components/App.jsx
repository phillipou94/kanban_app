
import React from 'react';
import uuid from 'node-uuid';
import Lanes from './Lanes.jsx'
import LaneActions from '../actions/LaneActions'
import LaneStore from '../stores/LaneStore'


export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = LaneStore.getState();
	}

	componentDidMount() {
		LaneStore.listen(this.storeChanged);
	}

	componentWillUnmount() {
		LaneStore.unlisten(this.storeChanged);
	}

	storeChanged = (state) => {
		this.setState(state);
	};

	render() {
    return (
    		<div>
    			<button className = "add-lane" onClick = {this.addLane}> Add </button>
    			<Lanes lanes={LaneStore.getState().lanes}/>
    		</div>
    	);
  }

	addLane = () => {
		LaneActions.create({name: 'New Lane'});
	};

}