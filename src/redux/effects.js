import service from '@/service';
import { camelize, camelizeKeys } from '@/utils/utils';
import { toast } from 'react-toastify';
import * as actions from './actions';

const DEFAULT_SHEET_ID = import.meta.env.VITE_MAIN_SHEET_ID;
const reserveRegex = /^Reserve/;

const fetchTrackList = (store, action) => {
	if (action.type === actions.FETCH_TRACK_LIST) {
		store.dispatch(actions.setTrackList({ loading: true }));
		service
			.getTrackList()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data)?.map((row) => ({
					...row,
					key: camelize(row.track),
					label: row.track,
				}));

				store.dispatch(
					actions.setTrackList({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setTrackList({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchParticipants = (store, action) => {
	if (action.type === actions.FETCH_PARTICIPANTS) {
		store.dispatch(actions.setParticipants({ loading: true }));
		service
			.getParticipants()
			.then((response) => {
				const data = response[0].data?.map((row) => ({
					driver: row.Driver,
					car: row.Car,
					isPrimary: row.Primary === 'TRUE',
					number: row.Number,
					country: row.Country,
				}));

				store.dispatch(
					actions.setParticipants({
						loading: false,
						content: data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setParticipants({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchQualifying = (store, action) => {
	if (action.type === actions.FETCH_QUALIFYING) {
		store.dispatch(actions.setQualifying({ loading: true }));
		service
			.getQualifying()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setQualifying({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setQualifying({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchRaceResults = (store, action) => {
	if (action.type === actions.FETCH_RACE_RESULTS) {
		store.dispatch(actions.setRaceResults({ loading: true }));
		service
			.getRaceResults()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setRaceResults({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setRaceResults({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchFastestLaps = (store, action) => {
	if (action.type === actions.FETCH_FASTEST_LAPS) {
		store.dispatch(actions.setFastestLaps({ loading: true }));
		service
			.getFastestLaps()
			.then((response) => {
				const data = camelizeKeys(response[0].data)?.[0] || {};

				store.dispatch(
					actions.setFastestLaps({
						loading: false,
						content: data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setFastestLaps({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchPenalties = (store, action) => {
	if (action.type === actions.FETCH_PENALTIES) {
		store.dispatch(actions.setPenalties({ loading: true }));
		service
			.getPenalties()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setPenalties({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setPenalties({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchMedalCount = (store, action) => {
	if (action.type === actions.FETCH_MEDAL_COUNT) {
		store.dispatch(actions.setMedalCount({ loading: true }));
		service
			.getMedalCount()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setMedalCount({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setMedalCount({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchHighlights = (store, action) => {
	if (action.type === actions.FETCH_HIGHLIGHTS) {
		store.dispatch(actions.setHighlights({ loading: true }));
		service
			.getHighlights()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setHighlights({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setHighlights({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchDriverPoints = (store, action) => {
	if (action.type === actions.FETCH_DRIVER_POINTS) {
		store.dispatch(actions.setDriverPoints({ loading: true }));
		service
			.getDriverPoints()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setDriverPoints({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setDriverPoints({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchDriverStats = (store, action) => {
	if (action.type === actions.FETCH_DRIVER_STATS) {
		store.dispatch(actions.setDriverStats({ loading: true }));
		service
			.getDriverStats()
			.then((response) => {
				const { data } = response[0];

				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setDriverStats({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setDriverStats({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchConstructorPoints = (store, action) => {
	if (action.type === actions.FETCH_CONSTRUCTOR_POINTS) {
		store.dispatch(actions.setConstructorPoints({ loading: true }));
		service
			.getConstructorPoints()
			.then((response) => {
				const { data } = response[0];
				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setConstructorPoints({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setConstructorPoints({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchConstructorStats = (store, action) => {
	if (action.type === actions.FETCH_CONSTRUCTOR_STATS) {
		store.dispatch(actions.setConstructorStats({ loading: true }));
		service
			.getConstructorStats()
			.then((response) => {
				const { data } = response[0];

				const formattedData = camelizeKeys(data);

				store.dispatch(
					actions.setConstructorStats({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setConstructorStats({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchArchives = (store, action) => {
	if (action.type === actions.FETCH_ARCHIVES) {
		store.dispatch(actions.setArchives({ loading: true }));
		service
			.getArchives()
			.then((response) => {
				const { data } = response[0];

				const formattedData = camelizeKeys(data);

				store.dispatch(actions.setSelectedSeason(formattedData.length));

				store.dispatch(
					actions.setArchives({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setArchives({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchArchiveStats = (store, action) => {
	if (action.type === actions.FETCH_ARCHIVE_STATS) {
		store.dispatch(actions.setArchiveStats({ loading: true }));
		const { selectedSeason, archiveStats, archives } = store.getState();

		if (archiveStats.content[selectedSeason.content]) return;

		const selectedArchiveSheetId =
			archives.content.find(({ season }) => +season === +selectedSeason.content)
				?.sheetId || DEFAULT_SHEET_ID;

		service
			.getArchiveStats(selectedArchiveSheetId)
			.then((response) => {
				const driverData = response[0].data;
				const constructorData = response[1].data;

				const formattedDriverData = camelizeKeys(driverData);
				const formattedConstructorData = camelizeKeys(constructorData);

				store.dispatch(
					actions.setArchiveStats({
						loading: false,
						content: {
							...archiveStats.content,
							[selectedSeason.content]: {
								driverData: formattedDriverData,
								constructorData: formattedConstructorData,
							},
						},
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setArchiveStats({ loading: false, error, fetched: true })
				);
			});
	}
};

const setSelectedSeason = (store, action) => {
	if (action.type === actions.SET_SELECTED_SEASON) {
		const selectedSeason = action.payload.selectedSeason.content;
		store.dispatch(actions.fetchArchiveStats(selectedSeason));
	}
};

const fetchDriverTrackStats = (store, action) => {
	if (action.type === actions.FETCH_ARCHIVES) {
		store.dispatch(actions.setDriverTrackStats({ loading: true }));
		service
			.getDriverTrackStats()
			.then((response) => {
				const [
					{ data: totalRacesData },
					{ data: avgFinishData },
					{ data: avgQualifyingData },
					{ data: totalDnfData },
					{ data: fastestLapsData },
					{ data: polesData },
					{ data: totalPenaltiesData },
					{ data: winsData },
				] = response;

				const trackList = Object.keys(totalRacesData[0] || {})
					.filter((key) => key !== 'Driver')
					.map((track) => ({ label: track, value: camelize(track) }));

				store.dispatch(actions.setAllTracks(trackList));

				store.dispatch(actions.setSelectedTrack(trackList[0]?.value));

				const formattedTotalRacesData = camelizeKeys(totalRacesData);
				const formattedAvgFinishData = camelizeKeys(avgFinishData);
				const formattedAvgQualifyingData = camelizeKeys(avgQualifyingData);
				const formattedTotalDnfData = camelizeKeys(totalDnfData);
				const formattedFastestLapsData = camelizeKeys(fastestLapsData);
				const formattedPolesData = camelizeKeys(polesData);
				const formattedTotalPenaltiesData = camelizeKeys(totalPenaltiesData);
				const formattedWinsData = camelizeKeys(winsData);

				const driverTrackData = {};

				for (
					let driverIndex = 0;
					driverIndex < formattedTotalRacesData.length;
					driverIndex++
				) {
					const driverTotalRaceStats =
						Object.values(formattedTotalRacesData[driverIndex]) || [];
					const driver = driverTotalRaceStats[0];
					if (!driver.match(reserveRegex)) {
						const avgFinishesStats =
							Object.values(formattedAvgFinishData[driverIndex]) || [];
						const avgQualifyingStats =
							Object.values(formattedAvgQualifyingData[driverIndex]) || [];
						const totalDnfDataStats =
							Object.values(formattedTotalDnfData[driverIndex]) || [];
						const fastestLapsDataStats =
							Object.values(formattedFastestLapsData[driverIndex]) || [];
						const polesDataStats =
							Object.values(formattedPolesData[driverIndex]) || [];
						const totalPenaltiesDataStats =
							Object.values(formattedTotalPenaltiesData[driverIndex]) || [];
						const winsDataStats =
							Object.values(formattedWinsData[driverIndex]) || [];

						for (
							let trackIndex = 1;
							trackIndex < driverTotalRaceStats.length;
							trackIndex++
						) {
							const trackKey = trackList[trackIndex - 1]?.value;
							const existingTrackData = driverTrackData[trackKey] || [];
							driverTrackData[trackKey] = [
								...existingTrackData,
								{
									driver,
									totalRaces: driverTotalRaceStats[trackIndex],
									averageFinish: avgFinishesStats[trackIndex],
									averageQualifying: avgQualifyingStats[trackIndex],
									totalDnfs: totalDnfDataStats[trackIndex],
									fastestLaps: fastestLapsDataStats[trackIndex],
									poles: polesDataStats[trackIndex],
									totalPenalties: totalPenaltiesDataStats[trackIndex],
									wins: winsDataStats[trackIndex],
									finishRate:
										(1 -
											totalDnfDataStats[trackIndex] /
												driverTotalRaceStats[trackIndex]) *
											100 || 100,
								},
							];
						}
					}
				}

				store.dispatch(
					actions.setDriverTrackStats({
						loading: false,
						content: driverTrackData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setDriverTrackStats({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchHistoricalDriverStats = (store, action) => {
	if (action.type === actions.FETCH_HISTORICAL_DRIVER_STATS) {
		store.dispatch(actions.setHistoricalDriverStats({ loading: true }));
		service
			.getHistoricalDriverStats()
			.then((response) => {
				const { data } = response[0];

				const formattedData = camelizeKeys(data).filter(
					({ driver }) => !driver.match(reserveRegex)
				);

				store.dispatch(
					actions.setHistoricalDriverStats({
						loading: false,
						content: formattedData,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setHistoricalDriverStats({
						loading: false,
						error,
						fetched: true,
					})
				);
			});
	}
};

const login = (store, action) => {
	if (action.type === actions.LOGIN) {
		store.dispatch(actions.setActiveUser({ loading: true }));
		return service
			.login(action.payload.loginBody)
			.then(() => {
				store.dispatch(actions.fetchActiveUser());
			})
			.catch((error) => {
				toast.error('Invalid username or password');
				store.dispatch(
					actions.setActiveUser({
						loading: false,
						content: null,
						error,
						fetched: true,
					})
				);
			});
	}
};

const logout = (store, action) => {
	if (action.type === actions.LOGOUT) {
		store.dispatch(actions.setActiveUser({ loading: true }));
		return service
			.logout()
			.then(() => {
				toast.success('Successfully logged out');
				store.dispatch(
					actions.setActiveUser({
						loading: false,
						content: null,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				toast.error('Error logging out');
				store.dispatch(
					actions.setActiveUser({
						loading: false,
						content: null,
						error,
						fetched: true,
					})
				);
			});
	}
};

const fetchActiveUser = (store, action) => {
	if (action.type === actions.FETCH_ACTIVE_USER) {
		store.dispatch(actions.setActiveUser({ loading: true }));
		return service
			.getActiveUser()
			.then((response) => {
				store.dispatch(
					actions.setActiveUser({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setActiveUser({
						loading: false,
						content: null,
						error,
						fetched: true,
					})
				);
			});
	}
};

const updateActiveUser = (store, action) => {
	if (action.type === actions.UPDATE_ACTIVE_USER) {
		return service
			.updateActiveUser(action.payload.updateBody)
			.then(() => {
				store.dispatch(actions.fetchActiveUser());
				toast.success('Update successful');
			})
			.catch(() => {
				toast.error('Unable to update account settings');
			});
	}
};

const fetchSeasons = (store, action) => {
	if (action.type === actions.FETCH_SEASONS) {
		store.dispatch(actions.setSeasons({ loading: true }));
		service
			.getSeasons()
			.then((response) => {
				store.dispatch(
					actions.setSeasons({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setSeasons({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchSeasonDrivers = (store, action) => {
	if (action.type === actions.FETCH_SEASON_DRIVERS) {
		store.dispatch(actions.setSeasonDrivers({ loading: true }));
		service
			.getSeasonDrivers(action.payload.seasonId)
			.then((response) => {
				store.dispatch(
					actions.setSeasonDrivers({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setSeasonDrivers({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchSeasonTracks = (store, action) => {
	if (action.type === actions.FETCH_SEASON_TRACKS) {
		store.dispatch(actions.setSeasonTracks({ loading: true }));
		service
			.getSeasonTracks(action.payload.seasonId)
			.then((response) => {
				store.dispatch(
					actions.setSeasonTracks({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTracks({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchDrivers = (store, action) => {
	if (action.type === actions.FETCH_DRIVERS) {
		store.dispatch(actions.setDrivers({ loading: true }));
		service
			.getDrivers()
			.then((response) => {
				store.dispatch(
					actions.setDrivers({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setDrivers({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchConstructors = (store, action) => {
	if (action.type === actions.FETCH_CONSTRUCTORS) {
		store.dispatch(actions.setConstructors({ loading: true }));
		service
			.getConstructors()
			.then((response) => {
				store.dispatch(
					actions.setConstructors({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setConstructors({ loading: false, error, fetched: true })
				);
			});
	}
};

const createSeasonDriver = (store, action) => {
	if (action.type === actions.CREATE_SEASON_DRIVER) {
		store.dispatch(actions.setSeasonDrivers({ loading: true }));
		const { seasonId } = action.payload;
		service
			.createSeasonDriver(seasonId)
			.then(() => store.dispatch(actions.fetchSeasonDrivers(seasonId)))
			.catch((error) => {
				store.dispatch(
					actions.setSeasonDrivers({ loading: false, error, fetched: true })
				);
			});
	}
};

const deleteSeasonDriver = (store, action) => {
	if (action.type === actions.DELETE_SEASON_DRIVER) {
		store.dispatch(actions.setSeasonDrivers({ loading: true }));
		const { seasonId, seasonDriverId } = action.payload;
		service
			.deleteSeasonDriver(seasonId, seasonDriverId)
			.then(() => store.dispatch(actions.fetchSeasonDrivers(seasonId)))
			.catch((error) => {
				store.dispatch(
					actions.setSeasonDrivers({ loading: false, error, fetched: true })
				);
			});
	}
};

const updateSeasonDriver = (store, action) => {
	if (action.type === actions.UPDATE_SEASON_DRIVER) {
		store.dispatch(actions.setSeasonDrivers({ loading: true }));
		const { seasonId, seasonDriverId, updateBody } = action.payload;
		service
			.updateSeasonDriver(seasonId, seasonDriverId, updateBody)
			.then(() => store.dispatch(actions.fetchSeasonDrivers(seasonId)))
			.catch((error) => {
				store.dispatch(
					actions.setSeasonDrivers({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchTracks = (store, action) => {
	if (action.type === actions.FETCH_TRACKS) {
		store.dispatch(actions.setTracks({ loading: true }));
		service
			.getTracks()
			.then((response) => {
				store.dispatch(
					actions.setTracks({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setTracks({ loading: false, error, fetched: true })
				);
			});
	}
};

const createSeasonTrack = (store, action) => {
	if (action.type === actions.CREATE_SEASON_TRACK) {
		store.dispatch(actions.setSeasonTracks({ loading: true }));
		const { seasonId } = action.payload;
		service
			.createSeasonTrack(seasonId)
			.then(() => store.dispatch(actions.fetchSeasonTracks(seasonId)))
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTracks({ loading: false, error, fetched: true })
				);
			});
	}
};

const deleteSeasonTrack = (store, action) => {
	if (action.type === actions.DELETE_SEASON_TRACK) {
		store.dispatch(actions.setSeasonTracks({ loading: true }));
		const { seasonId, seasonTrackId } = action.payload;
		service
			.deleteSeasonTrack(seasonId, seasonTrackId)
			.then(() => store.dispatch(actions.fetchSeasonTracks(seasonId)))
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTracks({ loading: false, error, fetched: true })
				);
			});
	}
};

const updateSeasonTrack = (store, action) => {
	if (action.type === actions.UPDATE_SEASON_TRACK) {
		store.dispatch(actions.setSeasonTracks({ loading: true }));
		const { seasonId, seasonTrackId, updateBody } = action.payload;
		service
			.updateSeasonTrack(seasonId, seasonTrackId, updateBody)
			.then(() => store.dispatch(actions.fetchSeasonTracks(seasonId)))
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTracks({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchSeasonTrack = (store, action) => {
	if (action.type === actions.FETCH_SEASON_TRACK) {
		store.dispatch(actions.setSeasonTrack({ loading: true }));
		const { seasonId, seasonTrackId } = action.payload;
		service
			.getSeasonTrack(seasonId, seasonTrackId)
			.then((response) => {
				store.dispatch(
					actions.setSeasonTrack({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTrack({ loading: false, error, fetched: true })
				);
			});
	}
};

const fetchSeasonTrackQualifyingResults = (store, action) => {
	if (action.type === actions.FETCH_SEASON_TRACK_QUALIFYING_RESULTS) {
		store.dispatch(actions.setSeasonTrackQualifyingResults({ loading: true }));
		const { seasonId, seasonTrackId } = action.payload;
		service
			.getSeasonTrackQualifyingResults(seasonId, seasonTrackId)
			.then((response) => {
				store.dispatch(
					actions.setSeasonTrackQualifyingResults({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTrackQualifyingResults({
						loading: false,
						error,
						fetched: true,
					})
				);
			});
	}
};

const fetchSeasonTrackRaceResults = (store, action) => {
	if (action.type === actions.FETCH_SEASON_TRACK_RACE_RESULTS) {
		store.dispatch(actions.setSeasonTrackRaceResults({ loading: true }));
		const { seasonId, seasonTrackId } = action.payload;
		service
			.getSeasonTrackRaceResults(seasonId, seasonTrackId)
			.then((response) => {
				store.dispatch(
					actions.setSeasonTrackRaceResults({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTrackRaceResults({
						loading: false,
						error,
						fetched: true,
					})
				);
			});
	}
};

const updateSeasonTrackQualifyingResults = (store, action) => {
	if (action.type === actions.UPDATE_SEASON_TRACK_QUALIFYING_RESULTS) {
		const { seasonId, seasonTrackId, results } = action.payload;
		service
			.updateSeasonTrackQualifyingResults(seasonId, seasonTrackId, results)
			.then(() => {
				store.dispatch(
					actions.fetchSeasonTrackQualifyingResults(seasonId, seasonTrackId)
				);
			})
			.catch(() => {
				toast.error('There was a problem updating qualifying results');
				store.dispatch(
					actions.fetchSeasonTrackQualifyingResults(seasonId, seasonTrackId)
				);
			});
	}
};

const updateSeasonTrackRaceResults = (store, action) => {
	if (action.type === actions.UPDATE_SEASON_TRACK_RACE_RESULTS) {
		const { seasonId, seasonTrackId, results } = action.payload;
		service
			.updateSeasonTrackRaceResults(seasonId, seasonTrackId, results)
			.then(() => {
				store.dispatch(
					actions.fetchSeasonTrackRaceResults(seasonId, seasonTrackId)
				);
			})
			.catch(() => {
				toast.error('There was a problem updating race results');
				store.dispatch(
					actions.fetchSeasonTrackRaceResults(seasonId, seasonTrackId)
				);
			});
	}
};

const fetchSeasonTrackIncidents = (store, action) => {
	if (action.type === actions.FETCH_SEASON_TRACK_INCIDENTS) {
		store.dispatch(actions.setSeasonTrackIncidents({ loading: true }));
		const { seasonId, seasonTrackId } = action.payload;
		service
			.getSeasonTrackIncidents(seasonId, seasonTrackId)
			.then((response) => {
				store.dispatch(
					actions.setSeasonTrackIncidents({
						loading: false,
						content: response.data,
						error: null,
						fetched: true,
					})
				);
			})
			.catch((error) => {
				store.dispatch(
					actions.setSeasonTrackIncidents({
						loading: false,
						error,
						fetched: true,
					})
				);
			});
	}
};

const effects = [
	fetchTrackList,
	fetchParticipants,
	fetchQualifying,
	fetchRaceResults,
	fetchFastestLaps,
	fetchPenalties,
	fetchMedalCount,
	fetchHighlights,
	fetchDriverPoints,
	fetchDriverStats,
	fetchConstructorPoints,
	fetchConstructorStats,
	fetchArchives,
	fetchArchiveStats,
	setSelectedSeason,
	fetchDriverTrackStats,
	fetchHistoricalDriverStats,
	login,
	logout,
	fetchActiveUser,
	updateActiveUser,
	fetchSeasons,
	fetchSeasonDrivers,
	fetchSeasonTracks,
	fetchDrivers,
	fetchConstructors,
	createSeasonDriver,
	deleteSeasonDriver,
	updateSeasonDriver,
	fetchTracks,
	createSeasonTrack,
	deleteSeasonTrack,
	updateSeasonTrack,
	fetchSeasonTrack,
	fetchSeasonTrackQualifyingResults,
	fetchSeasonTrackRaceResults,
	updateSeasonTrackQualifyingResults,
	updateSeasonTrackRaceResults,
	fetchSeasonTrackIncidents,
];

export default effects;
