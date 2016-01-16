import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import assign from 'object-assign';

class LaneStore {
	constructor() {
		this.bindActions(LaneActions);
		this.lanes = [];
	}

	create(lane) {
		const lanes = this.lanes
		lane.id = uuid.v4();
		lane.notes = lane.notes || [];
		this.setState({
			lanes: lanes.concat(lane)
		});
	}

	update(updatedLane) {
		const lanes = this.lanes.map( (lane) => {
			if (lane.id === updatedLane.id) {
				return assign({}, lane,updatedLane);
			}
			return lane;
		});
		this.setState({lanes});
	}

	delete(id) {
		const lanes = this.lanes.filter( (lane) => lane.id !== id);
		this.setState({lanes});
	}

	attachToLane({laneId, noteId}) {
		const lanes = this.lanes.map( (lane) => {
			if(lane.id === laneId) {
				if(lane.notes.indexOf(noteId) === -1) {
					lane.notes.push(noteId);
				} else {
					console.warn('Already attached this note to lane', lanes);
				}
			}
			return lane;
		});

		this.setState({lanes});
	}

	detachFromLane({laneId, noteId}) {
		const lanes = this.lanes.map( (lane) => {
			if(lane.id === laneId) {
				lane.notes = lane.notes.filter((note) => note.id !== noteId);
			}
			return lane;
		});

		this.setState({lanes});
	}

}

export default alt.createStore(LaneStore,'LaneStore');
