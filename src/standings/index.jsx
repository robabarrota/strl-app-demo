import './styles.scss';
import React, {useCallback, useMemo} from 'react';
import Tabs from '@/components/tabs';
import useTabsInUrlParams from '@/hooks/useTabsInUrlParams';
import DriverStandings from './driver-standings/index';
import ConstructorStandings from './constructor-standings/index';

const tabs = [
	'Driver',
	'Constructor',
];

const Standings = () => {
	const [activeTabIndex, setActiveTabIndex] = useTabsInUrlParams(tabs);
	const onChange = useCallback((index) => setActiveTabIndex(index), [setActiveTabIndex]);
	const renderDriverStandings = useMemo(() => <DriverStandings show={activeTabIndex === 0} />, [activeTabIndex]);
	const renderConstructorStandings = useMemo(() => <ConstructorStandings show={activeTabIndex === 1} />, [activeTabIndex]);

	return (
		<div className="standings">
			<div className='standings__title-container'>
				<h1 className='standings__title'>{tabs[activeTabIndex]} Standings</h1>
				<Tabs tabs={tabs} activeTabIndex={activeTabIndex} onChange={onChange} />
			</div>

			{renderDriverStandings}
			{renderConstructorStandings}

		</div>
	);
}

export default Standings;
