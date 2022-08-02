import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getRaceResults, getTrackList } from 'src/redux/selectors';
import { fetchRaceResults, fetchTrackList } from 'src/redux/actions';
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';

const RaceResults = () => {
	const dispatch = useDispatch();
	const { content: raceResults, loading: raceResultsLoading } = useSelector(getRaceResults);
	const { content: trackList, loading: trackListLoading } = useSelector(getTrackList);

	if (isEmpty(raceResults) && !raceResultsLoading) dispatch(fetchRaceResults());
	if (isEmpty(trackList) && !trackListLoading) dispatch(fetchTrackList());

	const tableHeaders = useMemo(() => ['Driver', 'Car', ...trackList?.map((track) => (
		track
	))], [trackList]);

	const getClassName = (header) => {
		if (header === 'Driver') return 'race-results__driver';
		if (header === 'Car') return 'race-results__car';
		return 'race-results__track'
	}

	if (raceResults) {
		return (
			<>
				<h1>Race Results</h1>
				<div className="table-container">
					<table>
						<thead>
							<tr>
								{tableHeaders.map(header => <th key={header} className="race-results__table-header">{header}</th>)}
							</tr>
						</thead>
						<tbody>
							{raceResults.map((row) => (
								<tr key={row['Driver']}>
									{tableHeaders.map((header, index) =>
										<td
											key={`${row['Driver']}-${index}`}
											className={`race-results__table-cell ${getClassName(header)}`}>
											{row[header]}
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>

			</>
		);
	}
}

export default RaceResults;
