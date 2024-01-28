import React, { useCallback, useMemo } from 'react';
import { cb } from '@/utils/utils';
import './styles.scss';
import { Link, useParams } from 'react-router-dom';
import useTabsInUrlParams from '@/hooks/useTabsInUrlParams';
import Tabs from '@/components/tabs';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import { getSeasonTrack } from '@/redux/selectors';
import { fetchSeasonTrack } from '@/redux/actions';
import AdminSeasonTrackQualifying from './admin-season-track-qualifying';
import AdminSeasonTrackRace from './admin-season-track-race';
import AdminSeasonTrackPenalties from './admin-season-track-penalties';

const blockName = 'admin-season-track';
const bem = cb(blockName);

const tabs = [
	{
		label: 'Qualifying',
		icon: '/strl-app/qualifying-icon.png',
	},
	{
		label: 'Race',
		icon: '/strl-app/race-icon.png',
	},
	{
		label: 'Penalties',
		icon: '/strl-app/penalty-icon.png',
	},
];
const AdminSeasonTrack = () => {
	const { seasonId, raceId } = useParams();
	const [activeTabIndex, setActiveTabIndex] = useTabsInUrlParams(tabs);
	const { content: seasonTrack } = useSelectOrFetch(
		getSeasonTrack,
		fetchSeasonTrack,
		[seasonId, raceId]
	);
	const onChange = useCallback(
		(index) => setActiveTabIndex(index),
		[setActiveTabIndex]
	);

	const renderQualifying = useMemo(
		() => <AdminSeasonTrackQualifying show={activeTabIndex === 0} />,
		[activeTabIndex]
	);
	const renderRace = useMemo(
		() => <AdminSeasonTrackRace show={activeTabIndex === 1} />,
		[activeTabIndex]
	);
	const renderPenalties = useMemo(
		() => <AdminSeasonTrackPenalties show={activeTabIndex === 2} />,
		[activeTabIndex]
	);

	return (
		<div className={blockName}>
			<div className={bem('title-container')}>
				<Link
					to={`/admin/season/${seasonId}?view=Races`}
					className={bem('back-button')}
				>
					<i className="fa-solid fa-chevron-left"></i>
				</Link>
				<h1 className={bem('title')}>
					Season {seasonId} - {seasonTrack.name}
				</h1>
			</div>
			<Tabs tabs={tabs} activeTabIndex={activeTabIndex} onChange={onChange} />

			{renderQualifying}
			{renderRace}
			{renderPenalties}
		</div>
	);
};

export default AdminSeasonTrack;
