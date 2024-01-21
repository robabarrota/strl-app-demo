import React from 'react';
import './styles.scss';
import { ThreeCircles } from 'react-loader-spinner';

const blockName = 'loader';

const Loader = () => (
	<ThreeCircles
		visible={true}
		height="100"
		width="100"
		color="#e10600"
		ariaLabel="three-circles-loading"
		wrapperClass={blockName}
	/>
);

export default Loader;
