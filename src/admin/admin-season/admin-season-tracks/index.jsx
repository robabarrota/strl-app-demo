import './styles.scss';
import React, { useCallback, useMemo } from 'react';
import { cb } from '@/utils/utils';
import { Link, useParams } from 'react-router-dom';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import { getConstructors, getSeasonTracks, getTracks } from '@/redux/selectors';
import {
	createSeasonTrack,
	deleteSeasonTrack,
	fetchConstructors,
	fetchSeasonTracks,
	fetchTracks,
	updateSeasonTrack,
} from '@/redux/actions';
import DropdownSelect from '@/components/dropdown-select';
import useCheckUserPermission from '@/hooks/useCheckUserPermission';
import { useDispatch } from 'react-redux';
import Loader from '@/components/loader';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const blockName = 'admin-season-tracks';
const bem = cb(blockName);

const AdminSeasonTracks = ({ show }) => {
	const dispatch = useDispatch();
	const { seasonId } = useParams();
	const { content: seasonTracks } = useSelectOrFetch(
		getSeasonTracks,
		fetchSeasonTracks,
		[seasonId]
	);
	const { content: tracks, loading: tracksLoading } = useSelectOrFetch(
		getTracks,
		fetchTracks,
		[seasonId]
	);

	const { content: seasons, loading: seasonsLoading } = useSelectOrFetch(
		getConstructors,
		fetchConstructors
	);

	const isActiveSeason = useMemo(
		() => seasons?.find(({ id }) => id === +seasonId)?.isActive || false,
		[seasons, seasonId]
	);

	const canEdit = useCheckUserPermission(
		isActiveSeason ? 'edit-season' : 'edit-history'
	);

	const trackOptions = useMemo(
		() =>
			tracks.map((track) => ({
				value: track.id,
				label: track.name,
			})),
		[tracks]
	);

	const addSeasonTrack = useCallback(
		() => dispatch(createSeasonTrack(seasonId)),
		[dispatch, seasonId]
	);
	const removeSeasonTrack = useCallback(
		(seasonTrackId) => dispatch(deleteSeasonTrack(seasonId, seasonTrackId)),
		[dispatch, seasonId]
	);
	const changeSeasonTrack = useCallback(
		(seasonTrackId, updateBody) =>
			dispatch(updateSeasonTrack(seasonId, seasonTrackId, updateBody)),
		[dispatch, seasonId]
	);

	const getDateDisplayValue = (date) => {
		if (!date) return '';
		const dateObj = new Date(date);
		dateObj.setHours(0, 0, 0, 0);
		const displayDate = new Date(dateObj).toLocaleString('default', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		return displayDate;
	};

	const renderRowElements = useMemo(
		() =>
			canEdit ? (
				<>
					{seasonTracks.map((seasonTrack) => (
						<tr className={bem('track-container')} key={seasonTrack.id}>
							<td>
								<DropdownSelect
									isLoading={tracksLoading}
									options={trackOptions}
									value={seasonTrack.track?.id}
									onChange={({ value }) =>
										changeSeasonTrack(seasonTrack.id, { trackId: value })
									}
									required
									className={bem('input-dropdown')}
								/>
							</td>
							<td>
								<DatePicker
									selected={
										seasonTrack.date ? new Date(seasonTrack.date) : null
									}
									onChange={(date) =>
										changeSeasonTrack(seasonTrack.id, { date })
									}
									dateFormat="MMMM d, yyyy"
									className={bem('date-picker')}
								/>
							</td>
							<td>
								<Link
									className={bem('manage-season-button')}
									to={`/admin/season/${seasonId}/race/${seasonTrack.id}`}
								>
									<i className="fa-solid fa-pen-to-square"></i>
								</Link>
							</td>
							<td>
								<button
									className={bem('delete-button')}
									onClick={() => removeSeasonTrack(seasonTrack.id)}
								>
									<i className="fa-solid fa-xmark"></i>
								</button>
							</td>
						</tr>
					))}
					<tr className={bem('track-container')}>
						<td>
							<button className={bem('add-button')} onClick={addSeasonTrack}>
								<i className="fa-solid fa-plus"></i>
							</button>
						</td>
					</tr>
				</>
			) : (
				seasonTracks.map((seasonTrack) => (
					<>
						<tr className={bem('track-container')} key={seasonTrack.id}>
							<td>
								<div className={bem('label')}>{seasonTrack.track.name}</div>
							</td>
							<td>
								<div className={bem('label')}>
									{getDateDisplayValue(seasonTrack.date)}
								</div>
							</td>
						</tr>
					</>
				))
			),
		[
			seasonTracks,
			canEdit,
			tracksLoading,
			trackOptions,
			addSeasonTrack,
			removeSeasonTrack,
			changeSeasonTrack,
		]
	);

	if (!show) return null;

	if (tracksLoading || seasonsLoading) {
		return <Loader />;
	}

	return (
		<div className={blockName}>
			{
				<table>
					<thead>
						<tr>
							<th className={bem('header')}>Track</th>
							<th className={bem('header')}>Date</th>
							{canEdit && (
								<>
									<th></th>
									<th></th>
								</>
							)}
						</tr>
					</thead>
					<tbody>{renderRowElements}</tbody>
				</table>
			}
		</div>
	);
};

export default AdminSeasonTracks;
