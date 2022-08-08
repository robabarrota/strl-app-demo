import constants from './utils/constants';
import { fetchGoogleSheetsData } from 'google-sheets-mapper';

const service = {
    getTrackList: async () => await fetchGoogleSheetsData({
        ...constants.sheetConfig,
        sheetsOptions: [{ id: 'Track List' }],
    }),

    getParticipants: async () => await fetchGoogleSheetsData({
        ...constants.sheetConfig,
        sheetsOptions: [{ id: 'Participants' }],
    }),
    
    getQualifying: async () => await fetchGoogleSheetsData({
        ...constants.sheetConfig,
        sheetsOptions: [{ id: 'Qualifying' }],
    }),

    getRaceResults: async () => await fetchGoogleSheetsData({
        ...constants.sheetConfig,
        sheetsOptions: [{ id: 'Race Results' }],
    }),
    
    getFastestLaps: async () => await fetchGoogleSheetsData({
        ...constants.sheetConfig,
        sheetsOptions: [{ id: 'Fastest Lap' }],
    }),
}

export default service;