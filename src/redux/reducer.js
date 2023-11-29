import * as actions from './actions';

const INITIAL_STATE = {
	trackList: { loading: false, content: [], error: null, fetched: false },
	participants: { loading: false, content: [], error: null, fetched: false },
	qualifying: { loading: false, content: [], error: null, fetched: false },
	raceResults: { loading: false, content: [], error: null, fetched: false },
	fastestLaps: { loading: false, content: [], error: null, fetched: false },
	penalties: { loading: false, content: [], error: null, fetched: false },
	medalCount: { loading: false, content: [], error: null, fetched: false },
	highlights: { loading: false, content: [], error: null, fetched: false },
	driverPoints: { loading: false, content: [], error: null, fetched: false },
	driverStats: { loading: false, content: [], error: null, fetched: false },
	constructorPoints: { loading: false, content: [], error: null, fetched: false },
	constructorStats: { loading: false, content: [], error: null, fetched: false },
	archives: { loading: false, content: [], error: null, fetched: false },
	archiveStats: { loading: false, content: {}, error: null, fetched: false },
	selectedSeason: { content: null },
	driverTrackStats: { loading: false, content: {}, error: null, fetched: false },
	selectedTrack: { content: null },
	allTracks: { content: [] },
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actions.SET_TRACK_LIST:
			return { ...state, trackList: { ...state.trackList, ...action.payload.trackList } };
		case actions.SET_PARTICIPANTS:
			return { ...state, participants: { ...state.participants, ...action.payload.participants } };
		case actions.SET_QUALIFYING:
			return { ...state, qualifying: { ...state.qualifying, ...action.payload.qualifying } };
		case actions.SET_RACE_RESULTS:
			return { ...state, raceResults: { ...state.raceResults, ...action.payload.raceResults } };
		case actions.SET_FASTEST_LAPS:
			return { ...state, fastestLaps: { ...state.fastestLaps, ...action.payload.fastestLaps } };
		case actions.SET_PENALTIES:
			return { ...state, penalties: { ...state.penalties, ...action.payload.penalties } };
		case actions.SET_MEDAL_COUNT:
			return { ...state, medalCount: { ...state.medalCount, ...action.payload.medalCount } };
		case actions.SET_HIGHLIGHTS:
			return { ...state, highlights: { ...state.highlights, ...action.payload.highlights } };
		case actions.SET_DRIVER_POINTS:
			return { ...state, driverPoints: { ...state.driverPoints, ...action.payload.driverPoints } };
		case actions.SET_DRIVER_STATS:
			return { ...state, driverStats: { ...state.driverStats, ...action.payload.driverStats } };
		case actions.SET_CONSTRUCTOR_POINTS:
			return { ...state, constructorPoints: { ...state.constructorPoints, ...action.payload.constructorPoints } };
		case actions.SET_CONSTRUCTOR_STATS:
			return { ...state, constructorStats: { ...state.constructorStats, ...action.payload.constructorStats } };
		case actions.SET_ARCHIVES:
			return { ...state, archives: { ...state.archives, ...action.payload.archives } };
		case actions.SET_ARCHIVE_STATS:
			return { ...state, archiveStats: { ...state.archiveStats, ...action.payload.archiveStats } };
		case actions.SET_SELECTED_SEASON:
			return { ...state, selectedSeason: {...state.selectedSeason, ...action.payload.selectedSeason} };
		case actions.SET_DRIVER_TRACK_STATS:
			return { ...state, driverTrackStats: { ...state.driverTrackStats, ...action.payload.driverTrackStats } };
		case actions.SET_SELECTED_TRACK:
			return { ...state, selectedTrack: {...state.selectedTrack, ...action.payload.selectedTrack} };
		case actions.SET_ALL_TRACKS:
			return { ...state, allTracks: {...state.allTracks, ...action.payload.allTracks} };
	
		default:
			return state;
	}
};

export default reducer;
