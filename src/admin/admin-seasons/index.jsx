import React from 'react';
import './styles.scss';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import { getSeasons } from '@/redux/selectors';
import { fetchSeasons } from '@/redux/actions';
import { NavLink } from 'react-router-dom';

const blockName = 'admin-seasons';

const AdminSeasons = () => {
	const { content: seasons } = useSelectOrFetch(getSeasons, fetchSeasons);
	return (
		<div className={blockName}>
			{seasons.map((season) => (
				<NavLink to={`/admin/season/${season.id}`} key={season.id}>
					{() => <div>Season {season.number}</div>}
				</NavLink>
			))}
		</div>
	);
};

export default AdminSeasons;
