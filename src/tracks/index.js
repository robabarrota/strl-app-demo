import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTrackList } from 'src/redux/selectors';
import { fetchTrackList } from 'src/redux/actions';
import { isEmpty } from 'lodash';

const Tracks = () => {
	const dispatch = useDispatch();
	const {content: trackList, loading: trackListLoading} = useSelector(getTrackList);

	if(isEmpty(trackList) && !trackListLoading) dispatch(fetchTrackList());

	if (trackList) {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Tracks</th>
						</tr>
					</thead>
					<tbody>
						{trackList.map((track) => (
							<tr>
								<td>{track}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Tracks;
