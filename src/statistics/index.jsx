import './styles.scss';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArchives, getSelectedSeason, getDriverTrackStats, getSelectedTrack, getAllTracks } from '@/redux/selectors';
import { fetchArchives, setSelectedSeason, fetchDriverTrackStats, setSelectedTrack } from '@/redux/actions';
import Tabs from '@/components/tabs';
import DriverStatistics from './driver-statistics/index';
import HistoricalStatistics from './historical-statistics/index';
import ConstructorStatistics from './constructor-statistics';
import DropdownSelect from '@/components/dropdown-select';
import TrackStatistics from './track-statistics';
import useTabsInUrlParams from '@/hooks/useTabsInUrlParams';
import useDropdownInUrlParams from '@/hooks/useDropdownInUrlParams';

const tabs = [
	'Driver',
	'Constructor',
	'Track',
	'Historical'
];

const Statistics = () => {
	const dispatch = useDispatch();
	const [activeTabIndex, setActiveTabIndex] = useTabsInUrlParams(tabs);
	
	const { content: archives, loading: archivesLoading, error: archivesError, fetched: archivesFetched } = useSelector(getArchives);
	const { loading: driverTrackStatsLoading, error: driverTrackStatsError, fetched: driverTrackStatsFetched } = useSelector(getDriverTrackStats);
	if (!archivesFetched && !archivesLoading && !archivesError) dispatch(fetchArchives());
	if (!driverTrackStatsFetched && !driverTrackStatsLoading && !driverTrackStatsError) dispatch(fetchDriverTrackStats());

	const { content: selectedSeason } = useSelector(getSelectedSeason);
	const { content: selectedTrack } = useSelector(getSelectedTrack);
	const { content: allTracks } = useSelector(getAllTracks);

	const onSeasonSelect = useCallback(({value}) => value && dispatch(setSelectedSeason(value)), [dispatch]);
	const onTrackSelect = useCallback(({value}) => value && dispatch(setSelectedTrack(value)), [dispatch]);

	const seasonDropdownOptions = useMemo(() => 
		archives
			.map(({season}) => ({label: `Season ${+season}`, value: +season}))
			.sort((a, b) => b.value - a.value),
		[archives]
	);

	const dropdownParamData = useMemo(() => {
		if (activeTabIndex === null) return [];
		if (activeTabIndex === 3) {
			return [];
		} else if (activeTabIndex === 2) { 
			return ['track', selectedTrack, onTrackSelect, allTracks];
		} else {
			return ['season', selectedSeason, onSeasonSelect, seasonDropdownOptions]
		}
 	}, [activeTabIndex, selectedTrack, onTrackSelect, allTracks, onSeasonSelect, seasonDropdownOptions, selectedSeason])

	const handleSelection = useDropdownInUrlParams(...dropdownParamData);

	const renderDriverStatistics = useMemo(() => <DriverStatistics show={activeTabIndex === 0}/>, [activeTabIndex]);
	const renderConstructorStatistics = useMemo(() => <ConstructorStatistics show={activeTabIndex === 1}/>, [activeTabIndex]);
	const renderTrackStatistics = useMemo(() => <TrackStatistics show={activeTabIndex === 2}/>, [activeTabIndex]);
	const renderHistoricalStatistics = useMemo(() => <HistoricalStatistics show={activeTabIndex === 3}/>, [activeTabIndex]);

	return (
		<div className="statistics">
			<div className='statistics__title-container'>
				<h1 className='statistics__title'>{tabs[activeTabIndex]} Statistics</h1>
				<div className='statistics__filter-bar'>
					<Tabs tabs={tabs} activeTabIndex={activeTabIndex} onChange={setActiveTabIndex} />
					{activeTabIndex < 2 && 
						<DropdownSelect 
							isLoading={!seasonDropdownOptions.length}
							options={seasonDropdownOptions || []}
							value={selectedSeason}
							onChange={handleSelection}
							color="#e10600"
							required
						/>
					}
					{activeTabIndex === 2 && 
						<DropdownSelect 
							isLoading={!allTracks.length}
							options={allTracks || []}
							value={selectedTrack}
							onChange={handleSelection}
							color="#e10600"
							required
						/>
					}

				</div>
			</div>

			{renderDriverStatistics}
			{renderConstructorStatistics}
			{renderTrackStatistics}
			{renderHistoricalStatistics}
		</div>
	);
}

export default Statistics;
