import React from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import { getSeasonTracks } from '@/redux/selectors';
import { fetchSeasonTracks } from '@/redux/actions';

const blockName = 'admin-season-tracks';

const AdminSeasonTracks = ({ show }) => {
	const { seasonId } = useParams();
	const { content: seasonTracks } = useSelectOrFetch(
		getSeasonTracks,
		fetchSeasonTracks,
		[seasonId]
	);

	if (!show) return null;
	return (
		<div className={blockName}>
			{seasonTracks.map((seasonTrack) => ({ seasonTrack }))}
		</div>
	);
};

export default AdminSeasonTracks;
