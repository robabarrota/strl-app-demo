
const getDomainsState = state => state;

export const getTrackList = state => getDomainsState(state).trackList;
export const getQualifying = state => getDomainsState(state).qualifying;

