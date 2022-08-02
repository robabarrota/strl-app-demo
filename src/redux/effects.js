import service from 'src/service';
import * as actions from './actions';

const fetchTrackList = (store, action) => {
	if (action.type === actions.FETCH_TRACK_LIST) {
		store.dispatch(actions.setTrackList({ loading: true }));
		service
			.getTrackList()
			.then((response) => {
				const data = response[0].data.map(trackObject => trackObject['Tracks']);

				store.dispatch(
					actions.setTrackList({
						loading: false,
						content: data,
						error: null,
					}),
				);
			})
			.catch((error) => {
				store.dispatch(actions.setTrackList({ loading: false, error }));
			});
	}
};

const fetchQualifying = (store, action) => {
	if (action.type === actions.FETCH_QUALIFYING) {
		store.dispatch(actions.setQualifying({ loading: true }));
		service
			.getQualifying()
			.then((response) => {
				const data = response[0].data;

				store.dispatch(
					actions.setQualifying({
						loading: false,
						content: data,
						error: null,
					}),
				);
			})
			.catch((error) => {
				store.dispatch(actions.setQualifying({ loading: false, error }));
			});
	}
};

const fetchRaceResults = (store, action) => {
	if (action.type === actions.FETCH_RACE_RESULTS) {
		store.dispatch(actions.setRaceResults({ loading: true }));
		service
			.getRaceResults()
			.then((response) => {
				const data = response[0].data;

				store.dispatch(
					actions.setRaceResults({
						loading: false,
						content: data,
						error: null,
					}),
				);
			})
			.catch((error) => {
				store.dispatch(actions.setRaceResults({ loading: false, error }));
			});
	}
};

const effects = [fetchTrackList, fetchQualifying, fetchRaceResults];

export default effects;
