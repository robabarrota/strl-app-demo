import './styles.scss';
import { cb } from '@/utils/utils';
import React from 'react';
import { Link } from 'react-router-dom';

const blockName = 'not-found';
const bem = cb(blockName);

const NotFound = () => (
	<div className={blockName}>
		<div className={bem('content')}>
			<p>
				Looks like you spun out{' '}
				<i className="fa-solid fa-road-circle-exclamation"></i>
			</p>

			<Link to="/" className={bem('link')}>
				Get back on track
			</Link>
		</div>
	</div>
);

export default NotFound;
