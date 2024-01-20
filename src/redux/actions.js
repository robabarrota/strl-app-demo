const prefix = 'sheets-store';

export const SET_TRACK_LIST = `${prefix}/SET_TRACK_LIST`;
export const setTrackList = trackList => ({ type: SET_TRACK_LIST, payload: { trackList } });

export const FETCH_TRACK_LIST = `${prefix}/FETCH_TRACK_LIST`;
export const fetchTrackList = () => ({ type: FETCH_TRACK_LIST });

export const SET_PARTICIPANTS = `${prefix}/SET_PARTICIPANTS`;
export const setParticipants = participants => ({ type: SET_PARTICIPANTS, payload: { participants } });

export const FETCH_PARTICIPANTS = `${prefix}/FETCH_PARTICIPANTS`;
export const fetchParticipants = () => ({ type: FETCH_PARTICIPANTS });

export const SET_QUALIFYING = `${prefix}/SET_QUALIFYING`;
export const setQualifying = qualifying => ({ type: SET_QUALIFYING, payload: { qualifying } });

export const FETCH_QUALIFYING = `${prefix}/FETCH_QUALIFYING`;
export const fetchQualifying = () => ({ type: FETCH_QUALIFYING });

export const SET_RACE_RESULTS = `${prefix}/SET_RACE_RESULTS`;
export const setRaceResults = raceResults => ({ type: SET_RACE_RESULTS, payload: { raceResults } });

export const FETCH_RACE_RESULTS = `${prefix}/FETCH_RACE_RESULTS`;
export const fetchRaceResults = () => ({ type: FETCH_RACE_RESULTS });

export const SET_FASTEST_LAPS = `${prefix}/SET_FASTEST_LAPS`;
export const setFastestLaps = fastestLaps => ({ type: SET_FASTEST_LAPS, payload: { fastestLaps } });

export const FETCH_FASTEST_LAPS = `${prefix}/FETCH_FASTEST_LAPS`;
export const fetchFastestLaps = () => ({ type: FETCH_FASTEST_LAPS });

export const SET_PENALTIES = `${prefix}/SET_PENALTIES`;
export const setPenalties = penalties => ({ type: SET_PENALTIES, payload: { penalties } });

export const FETCH_PENALTIES = `${prefix}/FETCH_PENALTIES`;
export const fetchPenalties = () => ({ type: FETCH_PENALTIES });

export const SET_MEDAL_COUNT = `${prefix}/SET_MEDAL_COUNT`;
export const setMedalCount = medalCount => ({ type: SET_MEDAL_COUNT, payload: { medalCount } });

export const FETCH_MEDAL_COUNT = `${prefix}/FETCH_MEDAL_COUNT`;
export const fetchMedalCount = () => ({ type: FETCH_MEDAL_COUNT });

export const SET_HIGHLIGHTS = `${prefix}/SET_HIGHLIGHTS`;
export const setHighlights = highlights => ({ type: SET_HIGHLIGHTS, payload: { highlights } });

export const FETCH_HIGHLIGHTS = `${prefix}/FETCH_HIGHLIGHTS`;
export const fetchHighlights = () => ({ type: FETCH_HIGHLIGHTS });

export const SET_DRIVER_POINTS = `${prefix}/SET_DRIVER_POINTS`;
export const setDriverPoints = driverPoints => ({ type: SET_DRIVER_POINTS, payload: { driverPoints } });

export const FETCH_DRIVER_POINTS = `${prefix}/FETCH_DRIVER_POINTS`;
export const fetchDriverPoints = () => ({ type: FETCH_DRIVER_POINTS });

export const SET_DRIVER_STATS = `${prefix}/SET_DRIVER_STATS`;
export const setDriverStats = driverStats => ({ type: SET_DRIVER_STATS, payload: { driverStats } });

export const FETCH_DRIVER_STATS = `${prefix}/FETCH_DRIVER_STATS`;
export const fetchDriverStats = () => ({ type: FETCH_DRIVER_STATS });

export const SET_CONSTRUCTOR_POINTS = `${prefix}/SET_CONSTRUCTOR_POINTS`;
export const setConstructorPoints = constructorPoints => ({ type: SET_CONSTRUCTOR_POINTS, payload: { constructorPoints } });

export const FETCH_CONSTRUCTOR_POINTS = `${prefix}/FETCH_CONSTRUCTOR_POINTS`;
export const fetchConstructorPoints = () => ({ type: FETCH_CONSTRUCTOR_POINTS });

export const SET_CONSTRUCTOR_STATS = `${prefix}/SET_CONSTRUCTOR_STATS`;
export const setConstructorStats = constructorStats => ({ type: SET_CONSTRUCTOR_STATS, payload: { constructorStats } });

export const FETCH_CONSTRUCTOR_STATS = `${prefix}/FETCH_CONSTRUCTOR_STATS`;
export const fetchConstructorStats = () => ({ type: FETCH_CONSTRUCTOR_STATS });

export const SET_ARCHIVES = `${prefix}/SET_ARCHIVES`;
export const setArchives = archives => ({ type: SET_ARCHIVES, payload: { archives } });

export const FETCH_ARCHIVES = `${prefix}/FETCH_ARCHIVES`;
export const fetchArchives = () => ({ type: FETCH_ARCHIVES });

export const SET_ARCHIVE_STATS = `${prefix}/SET_ARCHIVE_STATS`;
export const setArchiveStats = archiveStats => ({ type: SET_ARCHIVE_STATS, payload: { archiveStats } });

export const FETCH_ARCHIVE_STATS = `${prefix}/FETCH_ARCHIVE_STATS`;
export const fetchArchiveStats = (seasonNumber) => ({ type: FETCH_ARCHIVE_STATS, payload: { seasonNumber } });

export const SET_SELECTED_SEASON = `${prefix}/SET_SELECTED_SEASON`;
export const setSelectedSeason = selectedSeason => ({ type: SET_SELECTED_SEASON, payload: { selectedSeason: {content: selectedSeason} } });

export const SET_DRIVER_TRACK_STATS = `${prefix}/SET_DRIVER_TRACK_STATS`;
export const setDriverTrackStats = driverTrackStats => ({ type: SET_DRIVER_TRACK_STATS, payload: { driverTrackStats } });

export const FETCH_DRIVER_TRACK_STATS = `${prefix}/FETCH_DRIVER_TRACK_STATS`;
export const fetchDriverTrackStats = () => ({ type: FETCH_DRIVER_TRACK_STATS });

export const SET_SELECTED_TRACK = `${prefix}/SET_SELECTED_TRACK`;
export const setSelectedTrack = selectedTrack => ({ type: SET_SELECTED_TRACK, payload: { selectedTrack: {content: selectedTrack} } });

export const SET_ALL_TRACKS = `${prefix}/SET_ALL_TRACKS`;
export const setAllTracks = allTracks => ({ type: SET_ALL_TRACKS, payload: { allTracks: {content: allTracks} } });

export const SET_HISTORICAL_DRIVER_STATS = `${prefix}/SET_HISTORICAL_DRIVER_STATS`;
export const setHistoricalDriverStats = historicalDriverStats => ({ type: SET_HISTORICAL_DRIVER_STATS, payload: { historicalDriverStats } });

export const FETCH_HISTORICAL_DRIVER_STATS = `${prefix}/FETCH_HISTORICAL_DRIVER_STATS`;
export const fetchHistoricalDriverStats = () => ({ type: FETCH_HISTORICAL_DRIVER_STATS });

export const LOGIN = `${prefix}/LOGIN`;
export const login = (loginBody) => ({ type: LOGIN, payload: { loginBody } });

export const LOGOUT = `${prefix}/LOGOUT`;
export const logout = () => ({ type: LOGOUT });

export const SET_ACTIVE_USER = `${prefix}/SET_ACTIVE_USER`;
export const setActiveUser = activeUser => ({ type: SET_ACTIVE_USER, payload: { activeUser } });

export const FETCH_ACTIVE_USER = `${prefix}/FETCH_ACTIVE_USER`;
export const fetchActiveUser = () => ({ type: FETCH_ACTIVE_USER });

export const UPDATE_ACTIVE_USER = `${prefix}/UPDATE_ACTIVE_USER`;
export const updateActiveUser = (updateBody) => ({ type: UPDATE_ACTIVE_USER, payload: { updateBody }  });

export const FETCH_SEASONS = `${prefix}/FETCH_SEASONS`;
export const fetchSeasons = () => ({ type: FETCH_SEASONS });

export const SET_SEASONS = `${prefix}/SET_SEASONS`;
export const setSeasons = seasons => ({ type: SET_SEASONS, payload: { seasons } });

export const FETCH_SEASON_DRIVERS = `${prefix}/FETCH_SEASON_DRIVERS`;
export const fetchSeasonDrivers = (seasonId) => ({ type: FETCH_SEASON_DRIVERS, payload: { seasonId } });

export const SET_SEASON_DRIVERS = `${prefix}/SET_SEASON_DRIVERS`;
export const setSeasonDrivers = seasonDrivers => ({ type: SET_SEASON_DRIVERS, payload: { seasonDrivers } });

export const FETCH_SEASON_TRACKS = `${prefix}/FETCH_SEASON_TRACKS`;
export const fetchSeasonTracks = (seasonId) => ({ type: FETCH_SEASON_TRACKS, payload: { seasonId } });

export const SET_SEASON_TRACKS = `${prefix}/SET_SEASON_TRACKS`;
export const setSeasonTracks = seasonTracks => ({ type: SET_SEASON_TRACKS, payload: { seasonTracks } });

export const FETCH_DRIVERS = `${prefix}/FETCH_DRIVERS`;
export const fetchDrivers = () => ({ type: FETCH_DRIVERS });

export const SET_DRIVERS = `${prefix}/SET_DRIVERS`;
export const setDrivers = drivers => ({ type: SET_DRIVERS, payload: { drivers } });

export const FETCH_CONSTRUCTORS = `${prefix}/FETCH_CONSTRUCTORS`;
export const fetchConstructors = () => ({ type: FETCH_CONSTRUCTORS });

export const SET_CONSTRUCTORS = `${prefix}/SET_CONSTRUCTORS`;
export const setConstructors = constructors => ({ type: SET_CONSTRUCTORS, payload: { constructors } });

export const CREATE_SEASON_DRIVER = `${prefix}/CREATE_SEASON_DRIVER`;
export const createSeasonDriver = seasonId => ({ type: CREATE_SEASON_DRIVER, payload: { seasonId } });

export const DELETE_SEASON_DRIVER = `${prefix}/DELETE_SEASON_DRIVER`;
export const deleteSeasonDriver = (seasonId, seasonDriverId) => ({ type: DELETE_SEASON_DRIVER, payload: { seasonId, seasonDriverId } });

export const UPDATE_SEASON_DRIVER = `${prefix}/UPDATE_SEASON_DRIVER`;
export const updateSeasonDriver = (seasonId, seasonDriverId, updateBody) => ({ type: UPDATE_SEASON_DRIVER, payload: { seasonId, seasonDriverId, updateBody } });

