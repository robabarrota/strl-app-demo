import './styles.scss';
import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArchives, getSelectedSeason } from '@/redux/selectors';
import { fetchArchives, setSelectedSeason } from '@/redux/actions';
import Tabs from '@/components/tabs';
import DriverStatistics from './driver-statistics/index';
import ConstructorStatistics from './constructor-statistics';
import DropdownSelect from '@/components/dropdown-select';

const tabs = [
	'Driver',
	'Constructor',
];

const Statistics = () => {
	const dispatch = useDispatch();
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	
	const { content: archives, loading: archivesLoading, error: archivesError, fetched: archivesFetched } = useSelector(getArchives);
	if (!archivesFetched && !archivesLoading && !archivesError) dispatch(fetchArchives());

	const { content: selectedSeason } = useSelector(getSelectedSeason);
	
	const onTabChange = useCallback((index) => setActiveTabIndex(index), [setActiveTabIndex]);

	const onSeasonSelect = useCallback(({value}) => value && dispatch(setSelectedSeason(value)), [dispatch]);
	
	const dropdownOptions = useMemo(() => 
		archives
			.map(({season}) => ({label: `Season ${+season}`, value: +season}))
			.sort((a, b) => b.value - a.value),
		[archives]
	);
	
	const selectedValue = useMemo(() => dropdownOptions.find(({value}) => value === selectedSeason) || dropdownOptions[0], [dropdownOptions, selectedSeason]);

	const renderDriverStatistics = useMemo(() => <DriverStatistics show={activeTabIndex === 0}/>, [activeTabIndex]);
	const renderConstructorStatistics = useMemo(() => <ConstructorStatistics show={activeTabIndex === 1}/>, [activeTabIndex]);

	return (
		<div className="statistics">
			<div className='statistics__title-container'>
				<h1 className='statistics__title'>{tabs[activeTabIndex]} Statistics</h1>
				<div className='statistics__filter-bar'>
					<Tabs tabs={tabs} activeTabIndex={activeTabIndex} onChange={onTabChange} />
					<DropdownSelect 
						isLoading={!dropdownOptions.length}
						options={dropdownOptions || []}
						value={selectedValue}
						onChange={onSeasonSelect}
						color="#e10600"
						required
					/>

				</div>
			</div>

			{renderDriverStatistics}
			{renderConstructorStatistics}
		</div>
	);
}

export default Statistics;
