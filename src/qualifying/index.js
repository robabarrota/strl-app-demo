import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQualifying, getTrackList } from 'src/redux/selectors';
import { fetchQualifying, fetchTrackList } from 'src/redux/actions';
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';

const Qualifying = () => {
	const dispatch = useDispatch();
	const { content: qualifying, loading: qualifyingLoading } = useSelector(getQualifying);
	const { content: trackList, loading: trackListLoading } = useSelector(getTrackList);

	if (isEmpty(qualifying) && !qualifyingLoading) dispatch(fetchQualifying());
	if (isEmpty(trackList) && !trackListLoading) dispatch(fetchTrackList());

	const tableHeaders = useMemo(() => ['Driver', 'Car', ...trackList?.map((track) => (
		track
	))], [trackList]);

	const getClassName = (header) => {
		if (header === 'Driver') return 'qualifying__driver';
		if (header === 'Car') return 'qualifying__car';
		return 'qualifying__track'
	}

	if (qualifying) {
		return (
			<>
				<h1>Qualifying</h1>
				<div className="table-container">
					<table>
						<thead>
							<tr>
								{tableHeaders.map(header => <th key={header} className="qualifying__table-header">{header}</th>)}
							</tr>
						</thead>
						<tbody>
							{qualifying.map((row) => (
								<tr key={row['Driver']}>
									{tableHeaders.map((header, index) =>
										<td
											key={`${row['Driver']}-${index}`}
											className={`qualifying__table-cell ${getClassName(header)}`}>
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

export default Qualifying;
