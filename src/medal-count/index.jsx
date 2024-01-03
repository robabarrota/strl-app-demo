import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMedalCount } from '@/redux/selectors';
import { fetchMedalCount } from '@/redux/actions';
import useFormatDriverName from '@/hooks/useFormatDriverName';
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { tableSortFunction, nameSortFunction, round, cb } from '@/utils/utils';

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
import TableTooltip from '@/components/table-tooltip';
import useIsMobile from '@/hooks/useIsMobile';

const blockName = 'medal-count';
const bem = cb(blockName);

const defaultSortBy = {
	key: 'points',
	direction: 'desc'
}

const statHeaders = [
	{key: 'points', label: 'POINTS'},
];

const medalHeaders = [
	{key: 'gold', label: 'Gold', icon: 'fa-solid fa-medal'},
	{key: 'silver', label: 'Silver', icon: 'fa-solid fa-medal'},
	{key: 'bronze', label: 'Bronze', icon: 'fa-solid fa-medal'},
	{key: 'cup', label: 'Cup', icon: 'fa-solid fa-trophy'},
];

const MedalCount = () => {
	const dispatch = useDispatch();
	const isMobile = useIsMobile();
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
		}  else if(sortBy.key === 'driver'){
			const sortedRaceResults = [...medalCountCopy.sort((a, b) =>  nameSortFunction(a, b, sortBy))];
			setSortedMedalCount(sortedRaceResults);
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
					{sortedMedalCount.map(({ driver }) => (
						<tr key={driver} >
							<td className={bem('table-cell')}>
								<TableTooltip innerHtml={driver} customClass={bem('driver-label')}>
									{formatDriverName(driver)}
								</TableTooltip>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	), [sortedMedalCount, sortByKey, getSortIcon, formatDriverName]);

	const renderResultsSubTable = useMemo(() => {
		return (
			<div className={bem('results-subtable-container')}>
				<table>
					<thead>
						<tr>
							{medalHeaders.map((header) => 
								<th
									key={header.key}
									className={`${bem('table-header')} ${bem('table-header', 'sortable')}`}
									onClick={() => sortByKey(header.key)}
								>
									<i className={`${header.icon} ${bem(header.key)}`}></i> {getSortIcon(header.key)}
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{sortedMedalCount.map((row) => (
							<tr key={row.driver} >
								{medalHeaders.map((stat, index) =>
								<td
									key={`${row.driver}-${index}`}
									className={bem('table-cell')}
								>
									<TableTooltip innerHtml={stat.label}>
										{round(row[stat.key], {formatFn: stat.formatCallback})}
									</TableTooltip>
								</td>
							)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}, [sortedMedalCount, sortByKey, getSortIcon]);

	const renderStatsSubTable = useMemo(() => (
		<div className={bem('end-subtable-container', 'right')}>
			<table>
				<thead>
					<tr>
						<th 
							className={`${bem('table-header')} ${bem('table-header', 'sortable')}`} 
							onClick={() => sortByKey('points')}
						>
							Points {getSortIcon('points')}
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedMedalCount.map((row) => (
						<tr key={row.driver} >
							{statHeaders.map((stat, index) =>
									<td
										key={`${row.driver}-${index}`}
										className={bem('table-cell')}
									>
										<TableTooltip innerHtml={stat.label}>
											{round(row[stat.key], {formatFn: stat.formatCallback})}
										</TableTooltip>
									</td>
								)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	), [sortedMedalCount, sortByKey, getSortIcon]);

	const customDriverTick = props => {
		const { x, y, payload } = props;
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={0} y={0} dy={5} fill={"#666"} textAnchor="end">
					<tspan>
						{formatDriverName(payload.value)}
					</tspan>
				</text>
			</g>
		)
	};

	const graphMargin = useMemo(() => isMobile ? 50 : 90, [isMobile]);

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
					left: graphMargin,
					bottom: 5
				}} 
				>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" interval={0} domain={['dataMin', 'dataMax']} tickMargin={0} minTickGap={0}/>
				<YAxis 
					type="category" 
					dataKey="driver" 
					tick={customDriverTick}
					interval={0} 
					tickMargin={5}
				/>
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
				<h1 className={bem('title')}>League Leaders</h1>
				<div className={bem('table-container')}>
					{renderDriverSubTable}
					{renderResultsSubTable}
					{renderStatsSubTable}
				</div>

				<div className={bem('graph-container')}>
					{renderGraph()}
				</div>
			</div>
		);
	}
}

export default MedalCount;
