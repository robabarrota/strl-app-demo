import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPenalties,
	getDriverStats,
	getTrackList,
	getParticipants,
} from '@/redux/selectors';
import {
	fetchPenalties,
	fetchDriverStats,
	fetchTrackList,
	fetchParticipants,
} from '@/redux/actions';
import { isEmpty, isNaN } from 'lodash';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ConstructorBadge from '@/components/constructor-badge';
import useFormatDriverName from '@/hooks/useFormatDriverName';
import useFormatTrackName from '@/hooks/useFormatTrackName';
import useGraphTrackOrientation from '@/hooks/useGraphTrackOrientation';
import {
	round,
	getCarColor,
	tableSortFunction,
	nameSortFunction,
	cb,
} from '@/utils/utils';
import TableTooltip from '@/components/table-tooltip';
import useSortInUrlParams from '@/hooks/useSortInUrlParams';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as ChartTooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

const blockName = 'penalties';
const bem = cb(blockName);

const statHeaders = [
	{ key: 'penaltiesPerRace', label: 'AVG' },
	{ key: 'totalPenalties', label: 'TOTAL' },
];

const LegendWrapper = styled.div`
	padding: 20px;
	padding-top: 30px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const LegendSpan = styled.span`
	background-color: ${(props) => props.$teamColor};
	padding: 1px 10px;
	border-radius: 12px;
	margin: 5px;
	color: none;
	white-space: nowrap;
	cursor: pointer;
`;

const defaultSortBy = {
	key: 'averageQualifying',
	direction: 'desc',
};

const Penalties = () => {
	const dispatch = useDispatch();
	const [showStats, setShowStats] = useState(false);
	const [graphFilter, setGraphFilter] = useState([]);
	const [sortBy, setSortBy] = useSortInUrlParams(defaultSortBy);
	const [sortedPenalties, setSortedPenalties] = useState([]);
	const [sortedStats, setSortedStats] = useState([]);
	const formatDriverName = useFormatDriverName();
	const formatTrackName = useFormatTrackName();
	const graphTrackOrientation = useGraphTrackOrientation();

	const {
		content: penalties,
		loading: penaltiesLoading,
		error: penaltiesError,
		fetched: penaltiesFetched,
	} = useSelector(getPenalties);
	const {
		content: driverStats,
		loading: driverStatsLoading,
		error: driverStatsError,
		fetched: driverStatsFetched,
	} = useSelector(getDriverStats);
	const {
		content: trackList,
		loading: trackListLoading,
		error: trackListError,
		fetched: trackListFetched,
	} = useSelector(getTrackList);
	const {
		content: participants,
		loading: participantsLoading,
		error: participantsError,
		fetched: participantsFetched,
	} = useSelector(getParticipants);

	if (!penaltiesFetched && !penaltiesLoading && !penaltiesError)
		dispatch(fetchPenalties());
	if (!driverStatsFetched && !driverStatsLoading && !driverStatsError)
		dispatch(fetchDriverStats());
	if (!trackListFetched && !trackListLoading && !trackListError)
		dispatch(fetchTrackList());
	if (!participantsFetched && !participantsLoading && !participantsError)
		dispatch(fetchParticipants());

	useEffect(() => {
		const penaltiesCopy = [...penalties];
		const statsCopy = [...driverStats];
		if (sortBy === null) {
			setSortedStats(statsCopy);
			setSortedPenalties(penaltiesCopy);
		} else if (
			statHeaders.some((statHeader) => statHeader.key === sortBy.key)
		) {
			const newSortedStats = [
				...statsCopy.sort((a, b) => tableSortFunction(a, b, sortBy)),
			];
			setSortedStats(newSortedStats);
			const sortedDrivers = newSortedStats.map((stat) => stat.driver);
			setSortedPenalties([
				...penaltiesCopy.sort(
					(a, b) =>
						sortedDrivers.indexOf(a.driver) - sortedDrivers.indexOf(b.driver)
				),
			]);
		} else if (sortBy.key === 'driver') {
			const newSortedStats = [
				...statsCopy.sort((a, b) => nameSortFunction(a, b, sortBy)),
			];
			setSortedStats(newSortedStats);
			const sortedDrivers = newSortedStats.map((stat) => stat.driver);
			setSortedPenalties([
				...penaltiesCopy.sort(
					(a, b) =>
						sortedDrivers.indexOf(a.driver) - sortedDrivers.indexOf(b.driver)
				),
			]);
		} else {
			const newSortedPenalties = [
				...penaltiesCopy.sort((a, b) => tableSortFunction(a, b, sortBy)),
			];
			setSortedPenalties(newSortedPenalties);
			const sortedDrivers = newSortedPenalties.map(
				(raceResult) => raceResult.driver
			);
			setSortedStats([
				...statsCopy.sort(
					(a, b) =>
						sortedDrivers.indexOf(a.driver) - sortedDrivers.indexOf(b.driver)
				),
			]);
		}
	}, [penalties, sortBy, driverStats]);

	const lastPosition = useMemo(
		() =>
			Math.max(
				...penalties
					.map((row) =>
						trackList
							.map(({ key }) => +row[key])
							.filter((position) => !isNaN(position))
					)
					.flat()
			) ?? 0,
		[trackList, penalties]
	);

	const data = useMemo(
		() =>
			trackList.map((track) => {
				const trackPenalties = {
					name: formatTrackName(track.label),
				};
				penalties.forEach((row) => {
					const result = row[track.key];
					if (result === '' || result === undefined) return;

					trackPenalties[row.driver] = +result;
				});
				return trackPenalties;
			}),
		[trackList, penalties, formatTrackName]
	);

	const getClassName = (header) => {
		if (header === 'Driver') return bem('driver');
		if (header === 'Car') return bem('car');
		return bem('track');
	};

	const sortByKey = useCallback(
		(key) => {
			if (sortBy?.key === key) {
				if (sortBy.direction === 'desc')
					return setSortBy({ key, direction: 'asc' });
				if (sortBy.direction === 'asc') return setSortBy(null);
			}
			return setSortBy({ key, direction: 'desc' });
		},
		[sortBy, setSortBy]
	);

	const getSortIcon = useCallback(
		(track) => {
			if (sortBy?.key !== track) return <i className="fa-solid fa-sort"></i>;
			if (sortBy?.direction === 'desc')
				return <i className="fa-solid fa-sort-down"></i>;
			if (sortBy?.direction === 'asc')
				return <i className="fa-solid fa-sort-up"></i>;
		},
		[sortBy]
	);

	const renderDriverSubTable = useMemo(
		() => (
			<div className={bem('end-subtable-container', 'left')}>
				<table>
					<thead>
						<tr>
							<th
								className={`${bem('table-header')} ${bem('table-header--sortable')}`}
								onClick={() => sortByKey('driver')}
							>
								Driver {getSortIcon('driver')}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedPenalties.map((row) => (
							<tr key={row.driver} className={bem('row')}>
								<td className={bem('table-cell')}>
									<TableTooltip
										innerHtml={row.driver}
										customClass={bem('driver-label')}
									>
										{formatDriverName(row.driver)}{' '}
										<ConstructorBadge constructor={row.car} />
									</TableTooltip>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		),
		[sortedPenalties, formatDriverName, sortByKey, getSortIcon]
	);

	const renderResultsSubTable = useMemo(
		() => (
			<div className={bem('results-subtable-container')}>
				<table>
					<thead>
						<tr>
							{trackList.map((track) => (
								<th
									key={track.key}
									className={`${bem('table-header')} ${bem('table-header', 'sortable')}`}
									onClick={() => sortByKey(track.key)}
								>
									{formatTrackName(track.label)} {getSortIcon(track.key)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedPenalties.map((row) => (
							<tr key={row.driver} className={bem('row')}>
								{trackList.map((track, index) => (
									<td
										key={`${row.driver}-${index}`}
										className={`${bem('table-cell')} ${getClassName(track.key)}`}
									>
										<TableTooltip innerHtml={track.label}>
											{row[track.key] || ''}
										</TableTooltip>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		),
		[trackList, formatTrackName, sortedPenalties, sortByKey, getSortIcon]
	);

	const renderStatsSubTable = useMemo(
		() => (
			<div className={bem('end-subtable-container', 'right')}>
				<div
					className={`${bem('toggle-stats')} ${showStats ? 'show' : ''}`}
					onClick={() => setShowStats(!showStats)}
				>
					{showStats && <i className={'fa-solid fa-chevron-right'}></i>}
					{!showStats && <i className={'fa-solid fa-chevron-left'}></i>}
				</div>
				{showStats && (
					<table>
						<thead>
							<tr>
								{statHeaders.map((header) => (
									<th
										key={header.key}
										className={`${bem('table-header')} ${bem('table-header', 'sortable')}`}
										onClick={() => sortByKey(header.key)}
									>
										{header.label} {getSortIcon(header.key)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{sortedStats.map((stats) => (
								<tr key={stats.driver} className={bem('row')}>
									{statHeaders.map((stat, index) => (
										<td
											key={`${stats.driver}-${index}`}
											className={bem('table-cell')}
										>
											<TableTooltip innerHtml={stat.label}>
												{round(stats[stat.key], {
													formatFn: stat.formatCallback,
												})}
											</TableTooltip>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		),
		[sortedStats, showStats, sortByKey, getSortIcon]
	);

	const getCustomLineOpacity = (item) => {
		if (isEmpty(graphFilter)) {
			return item.isPrimary ? 0.9 : 0.7;
		}
		if (graphFilter?.includes(item.driver)) {
			return item.isPrimary ? 0.9 : 0.7;
		}
		return 0.15;
	};

	const getStrokeWidth = (item) => {
		if (isEmpty(graphFilter)) {
			return 1;
		}
		if (graphFilter?.includes(item)) {
			return 2;
		}
		return 1;
	};

	const renderLines = () =>
		participants.map((row) => (
			<Line
				key={row.driver}
				type="monotone"
				dataKey={row.driver}
				stroke={getCarColor(row.car, row.isPrimary, getCustomLineOpacity(row))}
				connectNulls
				strokeWidth={getStrokeWidth(row.driver)}
			/>
		));

	const customLegend = useCallback(
		({ payload }) => {
			const toggleFilter = (item) => {
				const { dataKey } = item;

				const index = graphFilter.indexOf(dataKey);
				if (index > -1) {
					setGraphFilter(graphFilter.filter((key) => key !== dataKey));
					return;
				}
				setGraphFilter((oldFilter) => [...oldFilter, dataKey]);
			};

			return (
				<LegendWrapper>
					{payload.map((entry, index) => (
						<LegendSpan
							$teamColor={entry.color}
							key={`item-${index}`}
							onClick={() => toggleFilter(entry)}
						>
							{formatDriverName(entry.value)}
						</LegendSpan>
					))}
				</LegendWrapper>
			);
		},
		[formatDriverName, graphFilter]
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
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					interval={0}
					angle={graphTrackOrientation}
					tickMargin={20}
				/>
				<YAxis
					reversed={true}
					domain={['dataMin', 'dataMax']}
					interval={0}
					tickCount={lastPosition}
				/>
				<ChartTooltip />
				<Legend content={customLegend} />
				{renderLines()}
			</LineChart>
		</ResponsiveContainer>
	);

	const isDataReady =
		penaltiesFetched &&
		!penaltiesLoading &&
		!isEmpty(trackList) &&
		!trackListLoading &&
		!isEmpty(participants) &&
		!participantsLoading;

	return (
		<div className={blockName}>
			<h1 className={bem('title')}>Penalties</h1>

			{isDataReady && (
				<>
					<div className={bem('table-container')}>
						{renderDriverSubTable}
						{renderResultsSubTable}
						{renderStatsSubTable}
					</div>
					<div className={bem('graph-container')}>{renderGraph()}</div>
				</>
			)}
		</div>
	);
};

export default Penalties;
