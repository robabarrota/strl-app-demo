import axios from 'axios';
import { fetchGoogleSheetsData } from 'google-sheets-mapper';
import { seasonSheetConfig } from './utils/constants';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const service = {
	getTrackList: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Track List' }],
		}),

	getParticipants: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Participants' }],
		}),

	getQualifying: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Qualifying' }],
		}),

	getRaceResults: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Race Results' }],
		}),

	getFastestLaps: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Fastest Lap' }],
		}),

	getPenalties: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Penalties' }],
		}),

	getMedalCount: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Medal Count' }],
		}),

	getHighlights: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Highlights' }],
		}),

	getDriverPoints: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Driver Points' }],
		}),

	getDriverStats: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Driver Stats' }],
		}),

	getConstructorPoints: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Constructor Points' }],
		}),

	getConstructorStats: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Constructor Stats' }],
		}),

	getArchives: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Archives' }],
		}),

	getArchiveStats: async (sheetId) =>
		fetchGoogleSheetsData({
			apiKey: seasonSheetConfig.apiKey,
			sheetId,
			sheetsOptions: [{ id: 'Driver Stats' }, { id: 'Constructor Stats' }],
		}),

	getDriverTrackStats: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [
				{ id: 'Driver Track Stats - Total Races' },
				{ id: 'Driver Track Stats - Average Finish' },
				{ id: 'Driver Track Stats - Avg Qualifying' },
				{ id: 'Driver Track Stats - DNFs' },
				{ id: 'Driver Track Stats - Fastest Laps' },
				{ id: 'Driver Track Stats - Poles' },
				{ id: 'Driver Track Stats - Total Penalties' },
				{ id: 'Driver Track Stats - Wins' },
			],
		}),

	getHistoricalDriverStats: async () =>
		fetchGoogleSheetsData({
			...seasonSheetConfig,
			sheetsOptions: [{ id: 'Total Driver Stats' }],
		}),

	signup: async (body) => axios.post(`${apiBaseUrl}/signup`, body),

	login: async (body) => axios.post(`${apiBaseUrl}/login`, body),

	logout: async (body) => axios.post(`${apiBaseUrl}/logout`, body),

	getActiveUser: async () => axios.get(`${apiBaseUrl}/me`),

	updateActiveUser: async (body) => axios.post(`${apiBaseUrl}/me`, body),

	getSeasons: async () => axios.get(`${apiBaseUrl}/seasons`),

	getSeasonDrivers: async (seasonId) =>
		axios.get(`${apiBaseUrl}/season/${seasonId}/drivers`),

	getSeasonTracks: async (seasonId) =>
		axios.get(`${apiBaseUrl}/season/${seasonId}/tracks`),

	getDrivers: async () => axios.get(`${apiBaseUrl}/drivers`),

	getConstructors: async () => axios.get(`${apiBaseUrl}/constructors`),

	createSeasonDriver: async (seasonId) =>
		axios.post(`${apiBaseUrl}/season/${seasonId}/drivers`),

	deleteSeasonDriver: async (seasonId, seasonDriverId) =>
		axios.delete(`${apiBaseUrl}/season/${seasonId}/drivers/${seasonDriverId}`),

	updateSeasonDriver: async (seasonId, seasonDriverId, updateBody) =>
		axios.post(
			`${apiBaseUrl}/season/${seasonId}/drivers/${seasonDriverId}`,
			updateBody
		),

	getTracks: async () => axios.get(`${apiBaseUrl}/tracks`),

	createSeasonTrack: async (seasonId) =>
		axios.post(`${apiBaseUrl}/season/${seasonId}/tracks`),

	deleteSeasonTrack: async (seasonId, seasonTrackId) =>
		axios.delete(`${apiBaseUrl}/season/${seasonId}/tracks/${seasonTrackId}`),

	updateSeasonTrack: async (seasonId, seasonTrackId, updateBody) =>
		axios.post(
			`${apiBaseUrl}/season/${seasonId}/tracks/${seasonTrackId}`,
			updateBody
		),

	getSeasonTrack: async (seasonId, seasonTrackId) =>
		axios.get(`${apiBaseUrl}/season/${seasonId}/tracks/${seasonTrackId}`),

	getSeasonTrackQualifyingResults: async (seasonId, seasonTrackId) =>
		axios.get(
			`${apiBaseUrl}/season/${seasonId}/tracks/${seasonTrackId}/qualifying-results`
		),

	getSeasonTrackRaceResults: async (seasonId, seasonTrackId) =>
		axios.get(
			`${apiBaseUrl}/season/${seasonId}/tracks/${seasonTrackId}/race-results`
		),

	updateSeasonTrackQualifyingResults: async (seasonId, seasonTrackId, body) =>
		axios.post(
			`${apiBaseUrl}/season/${seasonId}/tracks/${seasonTrackId}/qualifying-results`,
			body
		),
};

export default service;
