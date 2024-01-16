import { cb } from '@/utils/utils';
import './styles.scss';
import { useParams } from 'react-router-dom';

const blockName = 'admin-season';
const bem = cb(blockName);

const AdminSeason = () => {
	let { seasonId } = useParams();
	return (
		<div className={blockName}>
			{seasonId}
		</div>
	);

}

export default AdminSeason;
