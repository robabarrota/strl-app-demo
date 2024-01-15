import axios from 'axios';
import { seasonSheetConfig } from './utils/constants';
import { fetchGoogleSheetsData } from 'google-sheets-mapper';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const service = {
    getTrackList: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Track List' }],
    }),

    getParticipants: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Participants' }],
    }),
    
    getQualifying: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Qualifying' }],
    }),

    getRaceResults: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Race Results' }],
    }),
    
    getFastestLaps: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Fastest Lap' }],
    }),
    
    getPenalties: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Penalties' }],
    }),

    getMedalCount: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Medal Count' }],
    }),

    getHighlights: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Highlights' }],
    }),

    getDriverPoints: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Driver Points' }],
    }),

    getDriverStats: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Driver Stats' }],
    }),

    getConstructorPoints: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Constructor Points' }],
    }),

    getConstructorStats: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Constructor Stats' }],
    }),

    getArchives: async () => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Archives' }],
    }),

    getArchiveStats: async (sheetId) => await fetchGoogleSheetsData({
        apiKey: seasonSheetConfig.apiKey,
        sheetId,
        sheetsOptions: [
            { id: 'Driver Stats' },
            { id: 'Constructor Stats' }
        ],
    }),

    getDriverTrackStats: async () => await fetchGoogleSheetsData({
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

    getHistoricalDriverStats: async() => await fetchGoogleSheetsData({
        ...seasonSheetConfig,
        sheetsOptions: [{ id: 'Total Driver Stats' }],
    }),

    signup: async(body) => await axios.post(`${apiBaseUrl}/signup`, body),
    
    login: async(body) => await axios.post(`${apiBaseUrl}/login`, body),

    logout: async(body) => await axios.post(`${apiBaseUrl}/logout`, body),
    
    getActiveUser: async() => await axios.get(`${apiBaseUrl}/me`),

    updateActiveUser: async(body) => await axios.post(`${apiBaseUrl}/me`, body),

}

export default service;