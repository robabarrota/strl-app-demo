const prefix = 'sheets-store';

export const SET_TRACK_LIST = `${prefix}/SET_TRACK_LIST`;
export const setTrackList = trackList => ({ type: SET_TRACK_LIST, payload: { trackList } });

export const FETCH_TRACK_LIST = `${prefix}/FETCH_TRACK_LIST`;
export const fetchTrackList = () => ({ type: FETCH_TRACK_LIST });

export const SET_QUALIFYING = `${prefix}/SET_QUALIFYING`;
export const setQualifying = qualifying => ({ type: SET_QUALIFYING, payload: { qualifying } });

export const FETCH_QUALIFYING = `${prefix}/FETCH_QUALIFYING`;
export const fetchQualifying = () => ({ type: FETCH_QUALIFYING });

