import './styles.scss';
import { useSelector } from 'react-redux';
import { selectedDriverArchiveStats } from '@/redux/selectors';
import TableTooltip from '@/components/table-tooltip';
import { tableSortFunction, round } from '@/utils/utils';
import ConstructorBadge from '@/components/constructor-badge';

import { useMemo, useState, useCallback, useEffect } from 'react';
import useFormatDriverName from '@/hooks/useFormatDriverName';
import useSortInUrlParams from '@/hooks/useSortInUrlParams';

const defaultSortBy = {
	key: 'total',
	direction: 'desc'
};

const statHeaders = [
	{key: 'total', label: 'POINTS'},
	{key: 'poles', label: 'POLES'},
	{key: 'wins', label: 'WINS'},
	{key: 'averageFinish', label: 'AVG FINISH'},
	{key: 'averagePoints', label: 'AVG POINTS'},
	{key: 'averageQualifying', label: 'AVG QUAL'},
	{key: 'averageDifference', label: 'AVG DIFF'},
	{key: 'dNFs', label: 'DNF\'s'},
	{key: 'fastestLaps', label: 'FASTEST'},
	{key: 'racesMissed', label: 'DNS\'s'},
	{key: 'totalPenalties', label: 'PENALTIES'},
	{key: 'penaltiesPerRace', label: 'PENALTIES PER RACE'},
];

const DriverStatistics = ({show}) => {
	const [sortedArchiveStats, setSortedArchiveStats] = useState([]);
	const formatDriverName = useFormatDriverName();

	const archiveStats = useSelector(selectedDriverArchiveStats);
	
	const [sortBy, setSortBy] = useSortInUrlParams(defaultSortBy);

	useEffect(() => {
		const statsCopy = [...archiveStats];
		if (sortBy === null) {
			const sortedStats =  [...statsCopy.sort((a, b) => tableSortFunction(a, b, defaultSortBy, ['averageFinish', 'averageQualifying']))];
			setSortedArchiveStats(sortedStats);
		}
		else if (statHeaders.some((statHeader) => statHeader.key === sortBy.key)) {
			const sortedStats =  [...statsCopy.sort((a, b) => tableSortFunction(a, b, sortBy, ['averageFinish', 'averageQualifying']))];
			setSortedArchiveStats(sortedStats);
		}
	}, [archiveStats, sortBy]);

	const sortByKey = useCallback((key) => {
		if (sortBy?.key === key) {
			if (sortBy.direction === 'desc') return setSortBy({key, direction: 'asc'});
			if (sortBy.direction === 'asc') return setSortBy(null);
		}
		return setSortBy({key, direction: 'desc'});
	}, [sortBy, setSortBy]);

	const getSortIcon = useCallback((track) => {
		if (sortBy?.key !== track) return <i className="fa-solid fa-sort"></i>;
		if (sortBy?.direction === 'desc') return <i className="fa-solid fa-sort-down"></i>;
		if (sortBy?.direction === 'asc') return <i className="fa-solid fa-sort-up"></i>;
	}, [sortBy]);

	const renderDriverSubTable = useMemo(() => (
		<div className="driver-statistics__end-subtable-container--left">
			<table>
				<thead>
					<tr>
						<th 
							className="driver-statistics__table-header"
						>
							Driver
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedArchiveStats.map((row) => (
						<tr key={row.driver} >
							<td className='driver-statistics__table-cell'>
								<TableTooltip innerHtml={row.driver} customClass='driver-statistics__driver-label'>
									{formatDriverName(row.driver)} <ConstructorBadge constructor={row.car} />
								</TableTooltip>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	), [sortedArchiveStats, formatDriverName]);

	const renderResultsSubTable = useMemo(() => {
		return (
			<div className="driver-statistics__results-subtable-container">
				<table>
					<thead>
						<tr>
							{statHeaders.map(stat => 
								<th 
									key={stat.key} 
									className="driver-statistics__table-header driver-statistics__table-header--sortable" 
									onClick={() => sortByKey(stat.key)}
								>
									{stat.label} {getSortIcon(stat.key)}
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{sortedArchiveStats.map((row) => (
							<tr key={row.driver}>
								{statHeaders.map((stat, index) =>
									<td
										key={`${row.driver}-${index}`}
										className={`driver-statistics__table-cell`}
									>
										<TableTooltip innerHtml={stat.label}>
											{round(row[stat.key])}
										</TableTooltip>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}, [sortedArchiveStats, sortByKey, getSortIcon]);

	const isDataReady = !!archiveStats;

	if (isDataReady) {
		return show && (
			<div className="driver-statistics">
				<div className="driver-statistics__table-container">
					{renderDriverSubTable}
					{renderResultsSubTable}
				</div>
			</div>
		);
	}
}

export default DriverStatistics;
