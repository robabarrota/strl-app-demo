import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import TableTooltip from '@/components/table-tooltip';
import { tableSortFunction, round, nameSortFunction, cb } from '@/utils/utils';
import { getHistoricalDriverStats } from '@/redux/selectors';
import { fetchHistoricalDriverStats } from '@/redux/actions';
import { useSearchParams } from 'react-router-dom';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import useFormatDriverName from '@/hooks/useFormatDriverName';
import useSortInUrlParams from '@/hooks/useSortInUrlParams';

const blockName = 'historical-statistics';
const bem = cb(blockName);

const defaultSortBy = {
	key: 'total',
	direction: 'desc',
};

const statHeaders = [
	{ key: 'totalRaces', label: 'RACES' },
	{ key: 'points', label: 'POINTS' },
	{ key: 'fastestLaps', label: 'FASTEST' },
	{ key: 'wins', label: 'WINS' },
	{ key: 'podiums', label: 'PODIUMS' },
	{ key: 'poles', label: 'POLES' },
	{ key: 'pointsPerRace', label: 'PTS/RACE' },
	{ key: 'averageFinish', label: 'AVG FINISH' },
	{ key: 'averageQualifying', label: 'AVG QUAL' },
	{ key: 'averageDifference', label: 'DIFF' },
	{ key: 'dNFs', label: "DNF's" },
	{
		key: 'finishRate',
		label: 'FINISH %',
		formatCallback: (value) =>
			Number(value / 100).toLocaleString(undefined, { style: 'percent' }),
	},
	{ key: 'penalties', label: 'PENALTIES' },
	{
		key: 'attendance',
		label: 'ATTENDANCE',
		formatCallback: (value) =>
			Number(value / 100).toLocaleString(undefined, { style: 'percent' }),
	},
];

const HistoricalStatistics = ({ show }) => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const focusedDriver = searchParams.get('driver');

	const [sortedHistoricalDriverStats, setSortedHistoricalDriverStats] =
		useState([]);
	const formatDriverName = useFormatDriverName();

	const {
		content: historicalDriverStats,
		loading: historicalDriverStatsLoading,
		fetched: historicalDriverStatsFetched,
		error: historicalDriverStatsError,
	} = useSelector(getHistoricalDriverStats);

	if (
		!historicalDriverStatsFetched &&
		!historicalDriverStatsLoading &&
		!historicalDriverStatsError
	)
		dispatch(fetchHistoricalDriverStats());

	const [sortBy, setSortBy] = useSortInUrlParams(defaultSortBy);

	const isDataReady = !!historicalDriverStats;

	const goToFocusedDriver = useCallback(
		(driverName, element) => {
			if (driverName === focusedDriver && element) {
				const yOffset = -76;
				const y =
					element.getBoundingClientRect().top + window.pageYOffset + yOffset;

				window.scrollTo({ top: y, behavior: 'smooth' });
			}
		},
		[focusedDriver]
	);

	const getFocusedDriverClass = useCallback(
		(driverName) => (driverName === focusedDriver ? bem('focused') : ''),
		[focusedDriver]
	);

	useEffect(() => {
		const statsCopy = [...historicalDriverStats];
		if (sortBy === null) {
			const sortedStats = [
				...statsCopy.sort((a, b) =>
					tableSortFunction(a, b, defaultSortBy, [
						'averageFinish',
						'averageQualifying',
					])
				),
			];
			setSortedHistoricalDriverStats(sortedStats);
		} else if (
			statHeaders.some((statHeader) => statHeader.key === sortBy.key)
		) {
			const sortedStats = [
				...statsCopy.sort((a, b) =>
					tableSortFunction(a, b, sortBy, [
						'averageFinish',
						'averageQualifying',
					])
				),
			];
			setSortedHistoricalDriverStats(sortedStats);
		} else if (sortBy.key === 'driver') {
			const sortedStats = [
				...statsCopy.sort((a, b) => nameSortFunction(a, b, sortBy)),
			];
			setSortedHistoricalDriverStats(sortedStats);
		}
	}, [historicalDriverStats, sortBy]);

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
								className={`${bem('table-header')} ${bem('table-header', 'sortable')}`}
								onClick={() => sortByKey('driver')}
							>
								Driver {getSortIcon('driver')}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedHistoricalDriverStats.map((row) => (
							<tr
								key={row.driver}
								ref={(el) => goToFocusedDriver(row.driver, el)}
								className={`${getFocusedDriverClass(row.driver)}`}
							>
								<td className={bem('table-cell')}>
									<TableTooltip
										innerHtml={row.driver}
										customClass={bem('driver-label')}
									>
										{formatDriverName(row.driver)}
									</TableTooltip>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		),
		[
			sortedHistoricalDriverStats,
			formatDriverName,
			sortByKey,
			getSortIcon,
			goToFocusedDriver,
			getFocusedDriverClass,
		]
	);

	const renderResultsSubTable = useMemo(
		() => (
			<div className={bem('results-subtable-container')}>
				<table>
					<thead>
						<tr>
							{statHeaders.map((stat) => (
								<th
									key={stat.key}
									className={`${bem('table-header')} ${bem('table-header', 'sortable')}`}
									onClick={() => sortByKey(stat.key)}
								>
									{stat.label} {getSortIcon(stat.key)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedHistoricalDriverStats.map((row) => (
							<tr
								key={row.driver}
								className={`${getFocusedDriverClass(row.driver)}`}
							>
								{statHeaders.map((stat, index) => (
									<td
										key={`${row.driver}-${index}`}
										className={bem('table-cell')}
									>
										<TableTooltip innerHtml={stat.label}>
											{round(row[stat.key], { formatFn: stat.formatCallback })}
										</TableTooltip>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		),
		[sortedHistoricalDriverStats, sortByKey, getSortIcon, getFocusedDriverClass]
	);

	if (isDataReady) {
		return (
			show && (
				<div className={blockName}>
					<div className={bem('table-container')}>
						{renderDriverSubTable}
						{renderResultsSubTable}
					</div>
				</div>
			)
		);
	}
};

export default HistoricalStatistics;
