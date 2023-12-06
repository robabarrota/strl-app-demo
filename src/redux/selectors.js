import { createSelector } from '@reduxjs/toolkit';
import { camelize, getCarColor } from '@/utils/utils';

const getDomainsState = state => state;

export const getTrackList = state => getDomainsState(state).trackList;
export const getParticipants = state => getDomainsState(state).participants;
export const getQualifying = state => getDomainsState(state).qualifying;
export const getRaceResults = state => getDomainsState(state).raceResults;
export const getFastestLaps = state => getDomainsState(state).fastestLaps;
export const getPenalties = state => getDomainsState(state).penalties;
export const getMedalCount = state => getDomainsState(state).medalCount;
export const getHighlights = state => getDomainsState(state).highlights;
export const getDriverPoints = state => getDomainsState(state).driverPoints;
export const getDriverStats = state => getDomainsState(state).driverStats;
export const getConstructorPoints = state => getDomainsState(state).constructorPoints;
export const getConstructorStats = state => getDomainsState(state).constructorStats;
export const getArchives = state => getDomainsState(state).archives;
export const getArchiveStats = state => getDomainsState(state).archiveStats;
export const getSelectedSeason = state => getDomainsState(state).selectedSeason;
export const getDriverTrackStats = state => getDomainsState(state).driverTrackStats;
export const getAllTracks = state => getDomainsState(state).allTracks;
export const getSelectedTrack = state => getDomainsState(state).selectedTrack;

export const selectedDriverArchiveStats = createSelector(
    getArchiveStats,
    getSelectedSeason,
    ({content: archiveStats}, {content: selectedSeason}) => archiveStats?.[selectedSeason]?.driverData || []
);
  
export const selectedConstructorArchiveStats = createSelector(
    getArchiveStats,
    getSelectedSeason,
    ({content: archiveStats}, {content: selectedSeason}) => archiveStats?.[selectedSeason]?.constructorData || []
);
  
export const selectedDriverTrackStats = createSelector(
    getDriverTrackStats,
    getSelectedTrack,
    ({content: driverTrackStats}, {content: selectedTrack}) => driverTrackStats?.[selectedTrack] || []
);
  
export const getDriversPageData = createSelector(
    getParticipants,
    getDriverStats,
    ({content: participants}, {content: driverStatsData}) => 
        participants?.length && driverStatsData?.length ?
            participants
                    ?.map((driver, index) => ({...driver, ...driverStatsData?.[index]}))
                    ?.sort((a, b) => b.total - a.total).map(driverStat => {
                        const [firstName, ...lastName] = driverStat.driver.split(' ');
                        const numberColour = getCarColor(camelize(driverStat.car), true) || '#e10600'
                        return {
                            ...driverStat,
                            firstName,
                            lastName,
                            numberColour
                        }
                    }) : 
            []
);