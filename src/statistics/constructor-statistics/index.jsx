import './styles.scss';
import { useSelector } from 'react-redux';
import { selectedConstructorArchiveStats } from '@/redux/selectors';
import TableTooltip from '@/components/table-tooltip';
import { tableSortFunction, round, nameSortFunction, cb } from '@/utils/utils';
import ConstructorBadge from '@/components/constructor-badge';
import { useMemo, useState, useCallback, useEffect } from 'react';
import useFormatConstructorName from '@/hooks/useFormatConstructorName';
import useSortInUrlParams from '@/hooks/useSortInUrlParams';

const blockName = 'constructor-statistics';
const bem = cb(blockName);

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

const ConstructorStatistics = ({show}) => {
	const [sortedArchiveStats, setSortedArchiveStats] = useState([]);

	const archiveStats = useSelector(selectedConstructorArchiveStats);
		
	const [sortBy, setSortBy] = useSortInUrlParams(defaultSortBy);
	const formatConstructorName = useFormatConstructorName();
	
	useEffect(() => {
		const statsCopy = [...archiveStats];
		if (sortBy === null) {
			const sortedStats =  [...statsCopy.sort((a, b) => tableSortFunction(a, b, defaultSortBy, ['averageFinish', 'averageQualifying']))];
			setSortedArchiveStats(sortedStats);
		}
		else if (statHeaders.some((statHeader) => statHeader.key === sortBy.key)) {
			const sortedStats =  [...statsCopy.sort((a, b) => tableSortFunction(a, b, sortBy, ['averageFinish', 'averageQualifying']))];
			setSortedArchiveStats(sortedStats);
		} else if(sortBy.key === 'car'){
			const sortedStats =  [...statsCopy.sort((a, b) => nameSortFunction(a, b, sortBy))];
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

	const renderConstructorSubTable = useMemo(() => (
		<div className={bem('end-subtable-container', 'left')}>
			<table>
				<thead>
					<tr>
						<th 
							className={`${bem('table-header')} ${bem('table-header--sortable')}`}
							onClick={() => sortByKey('car')}
						>
							Constructor {getSortIcon('car')}
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedArchiveStats.map((row) => (
						<tr key={row.car} >
							<td className={bem('table-cell')}>
								<TableTooltip innerHtml={row.car} customClass={bem('driver-label')}>
									{formatConstructorName(row.car)} <ConstructorBadge constructor={row.car} />
								</TableTooltip>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	), [sortedArchiveStats, formatConstructorName, sortByKey, getSortIcon]);

	const renderResultsSubTable = useMemo(() => {
		return (
			<div className={bem('results-subtable-container')}>
				<table>
					<thead>
						<tr>
							{statHeaders.map(stat => 
								<th 
									key={stat.key} 
									className={`${bem('table-header')} ${bem('table-header', 'sortable')}`} 
									onClick={() => sortByKey(stat.key)}
								>
									{stat.label} {getSortIcon(stat.key)}
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{sortedArchiveStats.map((row) => (
							<tr key={row.car}>
								{statHeaders.map((stat, index) =>
									<td
										key={`${row.car}-${index}`}
										className={bem('table-cell')}
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

	const isDataReady = !!sortedArchiveStats;

	if (isDataReady) {
		return show && (
			<div className={blockName}>
				<div className={bem('table-container')}>
					{renderConstructorSubTable}
					{renderResultsSubTable}
				</div>
			</div>
		);
	}
}

export default ConstructorStatistics;
