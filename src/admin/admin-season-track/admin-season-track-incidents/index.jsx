import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import './styles.scss';
import React from 'react';
import { getSeasonTrackIncidents } from '@/redux/selectors';
import { fetchSeasonTrackIncidents } from '@/redux/actions';
import { useParams } from 'react-router-dom';
import { cb } from '@/utils/utils';

const blockName = 'admin-season-track-incidents';
const bem = cb(blockName);

const AdminSeasonTrackIncidents = ({ show }) => {
	const { seasonId, raceId } = useParams();
	// const dispatch = useDispatch();

	// const isActiveSeason = useIsActiveSeason(seasonId);

	// const canEdit = useCheckUserPermission(
	// 	isActiveSeason ? 'edit-season' : 'edit-history'
	// );

	const { content: incidents } = useSelectOrFetch(
		getSeasonTrackIncidents,
		fetchSeasonTrackIncidents,
		[seasonId, raceId]
	);

	if (!show) return null;
	return (
		<div className={blockName}>
			<table>
				<thead>
					<tr>
						<th className={bem('header')}>Position</th>
						<th className={bem('header')}>Driver</th>
						<th>DNF</th>
						<th>DSQ</th>
						<th>DNS</th>
						<th>Fastest</th>
					</tr>
				</thead>
				<tbody>{incidents.map((incident) => incident?.id)}</tbody>
			</table>
		</div>
	);
};

export default AdminSeasonTrackIncidents;
