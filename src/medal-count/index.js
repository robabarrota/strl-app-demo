import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMedalCount } from 'src/redux/selectors';
import { fetchMedalCount } from 'src/redux/actions';
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import useWindowDimensions from 'src/hooks/useWindowDimensions';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as ChartTooltip,
	Legend,
	ResponsiveContainer
} from "recharts";

const MedalCount = () => {
	const dispatch = useDispatch();
	const { content: medalCount, loading: medalCountLoading } = useSelector(getMedalCount);

	if (isEmpty(medalCount) && !medalCountLoading) dispatch(fetchMedalCount());

	const isDataReady = useMemo(() => !(isEmpty(medalCount) || medalCountLoading),
		[medalCount, medalCountLoading])

	const { width } = useWindowDimensions();

	const graphTrackOrientation = useMemo(() => width > 820 ? 0 : 270, [width]);

	const formatDriverName = (driver) => driver.split(' ')[0];

	const renderTable = () => (
		<table>
			<thead>
				<tr>
					<th className="medal-count__table-header">Driver</th>
					<th className="medal-count__table-header"><i class="fa-solid fa-trophy medal-count__gold"></i></th>
					<th className="medal-count__table-header"><i class="fa-solid fa-trophy medal-count__silver"></i></th>
					<th className="medal-count__table-header"><i class="fa-solid fa-trophy medal-count__bronze"></i></th>
					<th className="medal-count__table-header">Points</th>
				</tr>
			</thead>
			<tbody>
				{medalCount.map(({ Driver, Gold, Silver, Bronze, Points }) => (
					<tr>
						<td key={Driver} className='medal-count__table-cell'><div>{Driver}</div></td>
						<td key={Driver} className='medal-count__table-cell'><div>{Gold}</div></td>
						<td key={Driver} className='medal-count__table-cell'><div>{Silver}</div></td>
						<td key={Driver} className='medal-count__table-cell'><div>{Bronze}</div></td>
						<td key={Driver} className='medal-count__table-cell'><div>{Points}</div></td>
					</tr>
				))}
			</tbody>
		</table>
	);

	const renderGraph = () => (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart 
				width={500} 
				height={500} 
				data={medalCount} 
				margin={{
					top: 5,
					right: 30,
					left: 0,
					bottom: 5
				}} >
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="Driver" interval={0} tickMargin={10} tickFormatter={formatDriverName} />
				<YAxis domain={['dataMin', 'dataMax']} interval={0} />
				<Bar dataKey="Gold" stackId="a" fill="#C9B037" />
				<Bar dataKey="Silver" stackId="a" fill="#B4B4B4" />
				<Bar dataKey="Bronze" stackId="a" fill="#AD8A56" />
				<ChartTooltip cursor={false} />

			</BarChart>
		</ResponsiveContainer >
	);

	if (isDataReady) {
		return (
			<div className="medal-count">
				<h1 className="medal-count__title">League Leaders</h1>
				<div className="medal-count__table-container">
					{renderTable()}
				</div>

				<div className='medal-count__graph-container'>
					{renderGraph()}
				</div>
			</div>
		);
	}
}

export default MedalCount;
