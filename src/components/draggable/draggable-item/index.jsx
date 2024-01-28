import React from 'react';
import './styles.scss';
// import { cb } from '@/utils/utils';
import { useDrag } from 'react-dnd';

const blockName = 'draggable-item';
// const bem = cb(blockName);

const DraggableItem = ({
	type,
	item,
	children,
	customClass = '',
	Tag = 'div',
}) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type,
		item: { item },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	return (
		<Tag
			className={`${blockName} ${customClass}`}
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: 25,
				fontWeight: 'bold',
				cursor: 'move',
			}}
		>
			{children}
		</Tag>
	);
};

export default DraggableItem;
