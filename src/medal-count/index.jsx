import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMedalCount } from '@/redux/selectors';
import { fetchMedalCount } from '@/redux/actions';
import useFormatDriverName from '@/hooks/useFormatDriverName';
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { tableSortFunction } from '@/utils/utils';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as ChartTooltip,
	ResponsiveContainer
} from "recharts";
import useSortInUrlParams from '@/hooks/useSortInUrlParams';

const defaultSortBy = {
	key: 'points',
	direction: 'desc'
}

const statHeaders = [
	{key: 'gold', label: 'Gold'},
	{key: 'silver', label: 'Silver'},
	{key: 'bronze', label: 'Bronze'},
	{key: 'cup', label: 'Cup'},
];

const MedalCount = () => {
	const dispatch = useDispatch();
	const [sortedMedalCount, setSortedMedalCount] = useState([])
	const { content: medalCount, loading: medalCountLoading, error: medalCountError, fetched: medalCountFetched } = useSelector(getMedalCount);
	const formatDriverName = useFormatDriverName();

	if (!medalCountFetched && !medalCountLoading && !medalCountError) dispatch(fetchMedalCount());

	const [sortBy, setSortBy] = useSortInUrlParams(defaultSortBy);

	useEffect(() => {
		const medalCountCopy = [...medalCount];
		if (sortBy === null) {
			const sortedMedalCount =  [...medalCountCopy.sort((a,b) => tableSortFunction(a, b, defaultSortBy))]
			setSortedMedalCount(sortedMedalCount);
		}
		else {
			const sortedRaceResults = [...medalCountCopy.sort((a, b) => tableSortFunction(a, b, sortBy))];
			setSortedMedalCount(sortedRaceResults);
		}
	}, [medalCount, sortBy]);

	const sortByKey = useCallback((key) => {
		if (sortBy?.key === key) {
			if (sortBy.direction === 'desc') return setSortBy({key, direction: 'asc'});
			if (sortBy.direction === 'asc') return setSortBy(null);
		}
		return setSortBy({key, direction: 'desc'});
	}, [sortBy, setSortBy]);

	const getSortIcon = useCallback((key) => {
		if (sortBy?.key !== key) return <i className="fa-solid fa-sort"></i>;
		if (sortBy?.direction === 'desc') return <i className="fa-solid fa-sort-down"></i>;
		if (sortBy?.direction === 'asc') return <i className="fa-solid fa-sort-up"></i>;
	}, [sortBy]);

	const renderDriverSubTable = useMemo(() => (
		<div className="medal-count__end-subtable-container--left">
			<table>
				<thead>
					<tr>
						<th 
							className="medal-count__table-header"
						>
							Driver
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedMedalCount.map(({ driver }) => (
						<tr key={driver} >
							<td className='medal-count__table-cell'><div>{driver}</div></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	), [sortedMedalCount]);

	const renderResultsSubTable = useMemo(() => {
		return (
			<div className="medal-count__results-subtable-container">
				<table>
					<thead>
						<tr>
							{statHeaders.map((header) => 
								<th
									key={header.key}
									className="medal-count__table-header medal-count__table-header--sortable"
									onClick={() => sortByKey(header.key)}
								>
									<i className={`fa-solid fa-medal medal-count__${header.key}`}></i> {getSortIcon(header.key)}
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{sortedMedalCount.map(({ driver, gold, silver, bronze, cup }) => (
							<tr key={driver} >
								<td className='medal-count__table-cell'><div>{gold}</div></td>
								<td className='medal-count__table-cell'><div>{silver}</div></td>
								<td className='medal-count__table-cell'><div>{bronze}</div></td>
								<td className='medal-count__table-cell'><div>{cup}</div></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}, [sortedMedalCount, sortByKey, getSortIcon]);

	const renderStatsSubTable = useMemo(() => (
		<div className="medal-count__end-subtable-container--right">
			<table>
				<thead>
					<tr>
						<th 
							className="medal-count__table-header medal-count__table-header--sortable" 
							onClick={() => sortByKey('points')}
						>
							Points {getSortIcon('points')}
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedMedalCount.map(({ driver, points }) => (
						<tr key={driver} >
							<td className='medal-count__table-cell'><div>{points}</div></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	), [sortedMedalCount, sortByKey, getSortIcon]);

	const renderGraph = () => (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart 
				width={500} 
				height={500} 
				data={medalCount}
				layout="vertical"
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}} 
				>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" interval={0} domain={['dataMin', 'dataMax']} tickMargin={0} minTickGap={0}/>
				<YAxis type="category" dataKey="driver" tickFormatter={formatDriverName} interval={0} />
				<Bar dataKey="gold" stackId="a" fill="#C9B037" />
				<Bar dataKey="silver" stackId="a" fill="#B4B4B4" />
				<Bar dataKey="bronze" stackId="a" fill="#AD8A56" />
				<Bar dataKey="cup" stackId="a" fill="#FFC107" />
				<ChartTooltip cursor={false} />

			</BarChart>
		</ResponsiveContainer >
	);

	const isDataReady = medalCountFetched && !medalCountLoading;

	if (isDataReady) {
		return (
			<div className="medal-count">
				<h1 className="medal-count__title">League Leaders</h1>
				<div className="medal-count__table-container">
					{renderDriverSubTable}
					{renderResultsSubTable}
					{renderStatsSubTable}
				</div>

				<div className='medal-count__graph-container'>
					{renderGraph()}
				</div>
			</div>
		);
	}
}

export default MedalCount;
