
const getDomainsState = state => state;

export const getTrackList = state => getDomainsState(state).trackList;
export const getParticipants = state => getDomainsState(state).participants;
export const getQualifying = state => getDomainsState(state).qualifying;
export const getRaceResults = state => getDomainsState(state).raceResults;
export const getFastestLaps = state => getDomainsState(state).fastestLaps;

