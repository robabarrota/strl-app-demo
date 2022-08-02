import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQualifying, getTrackList, getParticipants } from 'src/redux/selectors';
import { fetchQualifying, fetchTrackList, fetchParticipants } from 'src/redux/actions';
import { isEmpty, groupBy, first } from 'lodash';
import React, { useMemo } from 'react';

const Qualifying = () => {
	const dispatch = useDispatch();
	const { content: qualifyingResults, loading: qualifyingLoading } = useSelector(getQualifying);
	const { content: trackList, loading: trackListLoading } = useSelector(getTrackList);
	const { content: participants, loading: participantsLoading } = useSelector(getParticipants);

	if (isEmpty(qualifyingResults) && !qualifyingLoading) dispatch(fetchQualifying());
	if (isEmpty(trackList) && !trackListLoading) dispatch(fetchTrackList());
	if (isEmpty(participants) && !participantsLoading) dispatch(fetchParticipants());

	const qualifyingStats = useMemo(() => {
		const groupedDrivers = groupBy(qualifyingResults, 'Driver');
		if (isEmpty(groupedDrivers)) return [];
		const driverQualifyingStats = Object.entries(groupedDrivers).map(([driver, driverResults]) => {
			const results = first(driverResults);
			let racesMissed = 0;
			let totalQualifying = 0;
			let totalRaces = 0;
			Object.entries(results).filter(([key, value]) => key !== 'Car' && key !== 'Driver').forEach(([track, result]) => {
				if (result === 'DNS') racesMissed++;

				if (result !== 'DNF' && result !== 'DNS') totalQualifying += parseInt(result);
				totalRaces++;
			});

			return {
				driver,
				average: totalQualifying / totalRaces,
				racesMissed
			}
		})
		return driverQualifyingStats;
	}, [qualifyingResults]);

	const resultHeaders = useMemo(() => trackList?.map((track) =>
		track
	), [trackList]);

	const statHeaders = ['AVG', 'Races Missed'];

	const getClassName = (header) => {
		if (header === 'Driver') return 'qualifying__driver';
		if (header === 'Car') return 'qualifying__car';
		return 'qualifying__track'
	}

	const renderDriverSubTable = () => (
		<div className="qualifying__end-subtable-container--left">
			<table>
				<thead>
					<tr>
						<th className="qualifying__table-header">Driver</th>
						<th className="qualifying__table-header">Car</th>
					</tr>
				</thead>
				<tbody>
					{participants.map((row) => (
						<tr key={row['Driver']}>
							<td className={`qualifying__table-cell`}> {row["Driver"]}</td>
							<td className={`qualifying__table-cell`}> {row["Car"]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	const renderResultsSubTable = () => (
		<div className="qualifying__results-subtable-container">
			<table>
				<thead>
					<tr>
						{resultHeaders.map(header => <th key={header} className="qualifying__table-header">{header}</th>)}
					</tr>
				</thead>
				<tbody>
					{qualifyingResults.map((row) => (
						<tr key={row['Driver']}>
							{resultHeaders.map((header, index) =>
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
	);

	const renderStatsSubTable = () => (
		<div className="qualifying__end-subtable-container--right">
			<table>
				<thead>
					<tr>
						<th className="qualifying__table-header">AVG</th>
						<th className="qualifying__table-header">Races Missed</th>
					</tr>
				</thead>
				<tbody>
					{qualifyingStats.map((driverStats) => (
						<tr key={driverStats.driver}>
							<td
								className={`qualifying__table-cell`}>
								{driverStats.average}
							</td>
							<td
								className={`qualifying__table-cell`}>
								{driverStats.racesMissed}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	if (qualifyingResults) {
		return (
			<>
				<h1>Qualifying</h1>
				<div className="qualifying__table-container">
					{renderDriverSubTable()}
					{renderResultsSubTable()}
					{renderStatsSubTable()}
				</div>

			</>
		);
	}
}

export default Qualifying;
