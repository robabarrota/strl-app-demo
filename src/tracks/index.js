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
				<h1>Tracks</h1>
				<table>
					<tbody>
						{trackList.map((track) => (
							<tr>
								<td key={track}>{track}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Tracks;
