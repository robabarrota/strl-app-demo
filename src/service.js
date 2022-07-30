import constants from './utils/constants';
import { fetchGoogleSheetsData } from 'google-sheets-mapper';

const service = {
    getTrackList: async () => await fetchGoogleSheetsData({
        ...constants.sheetConfig,
        sheetsOptions: [{ id: 'TrackList' }],
    }),
    
    getQualifying: async () => await fetchGoogleSheetsData({
        ...constants.sheetConfig,
        sheetsOptions: [{ id: 'Qualifying' }],
    })
}

export default service;