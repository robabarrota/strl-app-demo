import { cb } from '@/utils/utils';
import './styles.scss';
import { useParams } from 'react-router-dom';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import { getSeasonTracks } from '@/redux/selectors';
import { fetchSeasonTracks } from '@/redux/actions';

const blockName = 'admin-season-tracks';
const bem = cb(blockName);

const AdminSeasonTracks = ({show}) => {
	let { seasonId } = useParams();
	const {content: seasonTracks} = useSelectOrFetch(getSeasonTracks, fetchSeasonTracks, [seasonId]);

	if (!show) return null;
	return (
		<div className={blockName}>
			{
				seasonTracks.map(seasonTrack => (
					<div className={bem('container')}>

					</div>
				))
			}
		</div>
	);

}

export default AdminSeasonTracks;
