import React, { useMemo } from 'react';
import './styles.scss';
import { cb } from '@/utils/utils';
import { useDrop } from 'react-dnd';

const blockName = 'draggable-area';
const bem = cb(blockName);

const DraggableArea = ({
	accept,
	children,
	customClass = '',
	canDropCallback,
	dropCallback,
	Tag = 'div',
}) => {
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept,
			drop: (item) => dropCallback(item),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[canDropCallback, dropCallback]
	);

	const classNames = useMemo(() => {
		const classes = [blockName];

		if (customClass) classes.push(customClass);
		if (isOver) {
			classes.push(bem('drag-over'));
		}
		return classes.join(' ');
	}, [isOver, customClass]);

	return (
		<Tag className={classNames} ref={drop}>
			{children}
		</Tag>
	);
};

export default DraggableArea;
