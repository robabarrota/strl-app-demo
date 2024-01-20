import React, { useCallback, useMemo } from 'react';
import { cb } from '@/utils/utils';
import './styles.scss';
import { useParams } from 'react-router-dom';
import useTabsInUrlParams from '@/hooks/useTabsInUrlParams';
import Tabs from '@/components/tabs';
import AdminSeasonDrivers from './admin-season-drivers';
import AdminSeasonTracks from './admin-season-tracks';

const blockName = 'admin-season';
const bem = cb(blockName);

const tabs = [
	{
		label: 'Drivers',
		icon: '/strl-app/driver-icon.png',
	},
	{
		label: 'Races',
		icon: '/strl-app/race-icon.png',
	},
];
const AdminSeason = () => {
	const { seasonId } = useParams();
	const [activeTabIndex, setActiveTabIndex] = useTabsInUrlParams(tabs);
	const onChange = useCallback(
		(index) => setActiveTabIndex(index),
		[setActiveTabIndex]
	);

	const renderSeasonDrivers = useMemo(
		() => <AdminSeasonDrivers show={activeTabIndex === 0} />,
		[activeTabIndex]
	);
	const renderSeasonRaces = useMemo(
		() => <AdminSeasonTracks show={activeTabIndex === 1} />,
		[activeTabIndex]
	);

	return (
		<div className={blockName}>
			<h1 className={bem('title')}>Season {seasonId}</h1>
			<Tabs tabs={tabs} activeTabIndex={activeTabIndex} onChange={onChange} />

			{renderSeasonDrivers}
			{renderSeasonRaces}
		</div>
	);
};

export default AdminSeason;
