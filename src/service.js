import { seasonSheetConfig } from './utils/constants';
import { fetchGoogleSheetsData } from 'google-sheets-mapper';

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
}

export default service;