import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQualifying, getTrackList } from 'src/redux/selectors';
import { fetchQualifying, fetchTrackList } from 'src/redux/actions';
import { isEmpty } from 'lodash';

const Qualifying = () => {
	const dispatch = useDispatch();
	const {content: qualifying, loading: qualifyingLoading} = useSelector(getQualifying);
	const {content: trackList, loading: trackListLoading} = useSelector(getTrackList);

	if(isEmpty(qualifying) && !qualifyingLoading) dispatch(fetchQualifying());
	if(isEmpty(trackList) && !trackListLoading) dispatch(fetchTrackList());

	if (qualifying) {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Driver</th>
							<th>Team</th>
							{trackList.map((track) => (
								<th>{track}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{qualifying.map((row) => (
							<tr>
								{Object.values(row).map((value) => (
									<td>{value}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Qualifying;
