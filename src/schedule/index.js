import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTrackList } from 'src/redux/selectors';
import { fetchTrackList } from 'src/redux/actions';
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';


const Schedule = () => {
	const dispatch = useDispatch();
	const { content: trackList, loading: trackListLoading } = useSelector(getTrackList);

	if (isEmpty(trackList) && !trackListLoading) dispatch(fetchTrackList());

	const isDataReady = useMemo(() => !(isEmpty(trackList) || trackListLoading),
		[trackList, trackListLoading])

	if (isDataReady) {
		return (
			<div className="schedule">
				<h1 className="schedule__title">Schedule</h1>
				<div className="schedule__table-container">
					<table>
						<thead>
							<tr>
								<th className="schedule__table-header">Date</th>
								<th className="schedule__table-header">Track</th>
							</tr>
						</thead>
						<tbody>
							{trackList.map(({Date, Track}) => (
								<tr>
									<td key={Date} className='schedule__table-cell'><div>{Date}</div></td>
									<td key={Track} className='schedule__table-cell'><div>{Track}</div></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Schedule;
