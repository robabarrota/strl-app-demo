import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getRaceResults, getFastestLaps, getTrackList, getParticipants } from 'src/redux/selectors';
import { fetchRaceResults, fetchFastestLaps, fetchTrackList, fetchParticipants } from 'src/redux/actions';
import { isEmpty, groupBy, first, last, isNaN } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import ConstructorBadge from 'src/components/constructor-badge';
import useWindowDimensions from 'src/hooks/useWindowDimensions';
import constants from 'src/utils/constants';
import Tooltip from 'src/components/tooltip';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as ChartTooltip,
	Legend,
	ResponsiveContainer
} from "recharts";

const ConstructorStandings = () => {
	const dispatch = useDispatch();
	const [showStats, setShowStats] = useState(false);
	const { width } = useWindowDimensions();

	const { content: raceResults, loading: raceResultsLoading } = useSelector(getRaceResults);
	const { content: fastestLaps, loading: fastestLapsLoading } = useSelector(getFastestLaps);
	const { content: trackList, loading: trackListLoading } = useSelector(getTrackList);
	const { content: participants, loading: participantsLoading } = useSelector(getParticipants);

	if (isEmpty(raceResults) && !raceResultsLoading) dispatch(fetchRaceResults());
	if (isEmpty(fastestLaps) && !fastestLapsLoading) dispatch(fetchFastestLaps());
	if (isEmpty(trackList) && !trackListLoading) dispatch(fetchTrackList());
	if (isEmpty(participants) && !participantsLoading) dispatch(fetchParticipants());

	const isDataReady = useMemo(() =>
		!(isEmpty(raceResults) || raceResultsLoading
			|| isEmpty(trackList) || trackListLoading
			|| isEmpty(participants) || participantsLoading),
		[raceResults, raceResultsLoading, trackList, trackListLoading, participants, participantsLoading])

	const formatConstructorName = useCallback((constructor) => width > 820 ? constructor : constants.carAbbreviationMap[constructor], [width])
	const formatTrackName = useCallback((track) => width > 820 ? track : constants.trackAbbreviationMap[track], [width])

	const resultHeaders = useMemo(() => trackList?.map(({ Track }) => Track), [trackList]);

	const constructors = useMemo(() => [...new Set(participants?.map(({ Car }) => Car))], [participants])

	const constructorPoints = useMemo(() => 
		raceResults.reduce((acc, row) => {
			const constructor = { 'Car': row['Car'] };
			const constructorIndex = acc.findIndex(constructors => constructors['Car'] === row['Car']);
			resultHeaders.forEach(header => {
				let racePoints = constants.pointMap[row[header]];
				if (racePoints && fastestLaps[header] === row['Driver'] && row[header] <= 10) racePoints += 1;
				if (constructorIndex > -1 && racePoints !== undefined) {
					acc[constructorIndex][header] += racePoints;  
				} else {
					constructor[header] = racePoints;
				}
			});
			if (constructorIndex === -1) acc.push(constructor);
			return acc;
		}, []), [raceResults, resultHeaders, fastestLaps]);

	const stats = useMemo(() => {
		return constructorPoints.map(constructor => {
			const name = constructor['Car'];
			let totalRaces = 0;
			const totalPoints = Object.entries(constructor)
			.filter(([key, value]) => key !== 'Car')
			.reduce((acc, [track, points]) => {
				if (Number.isInteger(points)) acc += Number(points);
				if (points !== undefined) totalRaces++;
				return acc;
			}, 0)
			return {
				constructor: name,
				average: totalPoints / totalRaces,
				total: totalPoints,
			}
		})
		// const groupedDrivers = groupBy(raceResults, 'Driver');
		// if (isEmpty(groupedDrivers)) return [];
		// const driverStats = Object.entries(groupedDrivers).map(([driver, driverResults]) => {
		// 	const results = first(driverResults);
		// 	let racesMissed = 0;
		// 	let totalRaces = 0;
		// 	Object.entries(results).filter(([key, value]) => key !== 'Car' && key !== 'Driver').forEach(([track, result]) => {
		// 		if (result === 'DNS') racesMissed++;
		// 		totalRaces++;
		// 	});
		// 	const totalRacePoints = Object.entries(constructorPoints.filter((constructorPoint) => constructorPoint['Car'] === driver)[0])
		// 		.filter(([key, value]) => key !== 'Car')
		// 		.reduce((acc, [track, points]) => {
		// 			if (Number.isInteger(points)) acc += Number(points);
		// 			return acc;
		// 	}, 0)

		// 	const average = totalRacePoints / totalRaces;

		// 	return {
		// 		driver,
		// 		average: average === 0 ? '-' : average,
		// 		total: totalRacePoints,
		// 		racesMissed,
		// 	}
		// })
		// return driverStats;

	}, [raceResults, constructorPoints]);

	const lastPosition = useMemo(() => {
		return Math.max(...raceResults.map(row =>
			resultHeaders.map(track => parseInt(row[track])).filter(position => !isNaN(position))
		).flat()) ?? 0
	}, [resultHeaders, raceResults]);

	const data = useMemo(() => 
		{ 
			return resultHeaders.reduce((acc, track) => {
			const trackScores = {
				name: formatTrackName(track)
			};
			constructorPoints.forEach(row => {
				let result = row[track];
				const previousScore = last(acc)?.[row['Car']] ?? 0;
				if (result === 'DNS' || result === 'DNF' || result === undefined) return;

				trackScores[row['Car']] = parseInt(result) + previousScore;
			});
			acc.push(trackScores);
			return acc;
		}, [])
	}
	, [resultHeaders, raceResults, formatTrackName])

	const graphTrackOrientation = useMemo(() => width > 820 ? 0 : 270, [width]);

	const getClassName = (header) => {
		if (header === 'Driver') return 'constructor-standings__driver';
		if (header === 'Car') return 'constructor-standings__car';
		return 'constructor-standings__track'
	}
	const renderConstructorSubTable = () => (
		<div className="constructor-standings__end-subtable-container--left">
			<table>
				<thead>
					<tr>
						<th className="constructor-standings__table-header">Constructor</th>
					</tr>
				</thead>
				<tbody>
					{constructors.map((name) => (
						<tr key={name}>
							<td className={`constructor-standings__table-cell`}>
								<div className='constructor-standings__driver-label'>
									{formatConstructorName(name)} <ConstructorBadge constructor={name} />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	const renderResultsSubTable = () => (
		<div className="constructor-standings__results-subtable-container">
			<table>
				<thead>
					<tr>
						{resultHeaders.map(header => <th key={header} className="constructor-standings__table-header">{formatTrackName(header)}</th>)}
					</tr>
				</thead>
				<tbody>
					{constructorPoints.map((row) => (
						<tr key={row['Driver']}>
							{resultHeaders.map((header, index) =>
								<td
									key={`${row['Driver']}-${index}`}
									className={`constructor-standings__table-cell ${getClassName(header)}`}>
									<Tooltip innerHtml={header}>
										{row[header]}
									</Tooltip>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	const renderStatsSubTableData = useCallback(() => 
		<table>
			<thead>
				<tr>
					<th className="constructor-standings__table-header">TOTAL</th>
					<th className="constructor-standings__table-header">AVG</th>
				</tr>
			</thead>
			<tbody>
				{stats.map((constructorStats) => (
					<tr key={constructorStats.constructor}>
						<td
							className={`constructor-standings__table-cell`}>
							{constructorStats.total}
						</td>
						<td
							className={`constructor-standings__table-cell`}>
							{constructorStats.average}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	, [stats]);

	const renderStatsSubTable = () => (
		<div className="constructor-standings__end-subtable-container--right">
			<div className={`constructor-standings__toggle-stats ${showStats ? 'show' : ''}`} onClick={() => setShowStats(current => !current)}>
				{showStats && <i className={"fa-solid fa-chevron-right"}></i>}
				{!showStats && <i className={"fa-solid fa-chevron-left"}></i>}
			</div>
			{showStats && renderStatsSubTableData()}
		</div>
	);

	const renderGraph = () => (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 0,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" interval={0} angle={graphTrackOrientation} tickMargin={20} />
				<YAxis domain={['dataMin', 'dataMax']} interval={0} tickCount={lastPosition} />
				<ChartTooltip />
				<Legend
					wrapperStyle={{
						paddingTop: 20,
						marginLeft: 20,
					}}
					formatter={(value, entry, index) => (formatConstructorName(value))}
				/>
				{
					constructors.map((name) => (
						<Line
							key={name}
							type="monotone"
							dataKey={name}
							stroke={constants.getCarColor(name, true)}
						/>
					))
				}
			</LineChart >
		</ResponsiveContainer >
	);


	return (
		<div className="constructor-standings">
			<h1 className='constructor-standings__title'>Constructor Standings</h1>

			{isDataReady && (
				<>
					<div className="constructor-standings__table-container">
						{renderConstructorSubTable()}
						{renderResultsSubTable()}
						{renderStatsSubTable()}
					</div>
					<div className='constructor-standings__graph-container'>
						{renderGraph()}
					</div>
				</>
			)}
		</div>
	);

}

export default ConstructorStandings;
