import React, { useState } from 'react';
import './styles.scss';
import { cb } from '@/utils/utils';

const blockName = 'table-tooltip';
const bem = cb(blockName);

const TableTooltip = ({
	innerHtml,
	children,
	hangLeft = false,
	customClass = '',
}) => {
	const [visible, setVisible] = useState(false);
	const hangClass = hangLeft ? bem('hang-left') : '';
	return (
		<button
			className={`${blockName} ${customClass}`}
			onClick={() => setVisible((visibility) => !visibility)}
			onBlur={() => setVisible(false)}
		>
			{children}
			{visible && (
				<div className={`${bem('text')} ${hangClass}`}>{innerHtml}</div>
			)}
		</button>
	);
};

export default TableTooltip;
