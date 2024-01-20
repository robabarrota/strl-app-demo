import React, { useMemo } from 'react';
import './styles.scss';
import Select from 'react-select';
import { cb } from '@/utils/utils';

const blockName = 'dropdown-select';
const bem = cb(blockName);

const DropdownSelect = ({ options, value, onChange, selectKey, ...props }) => {
	const selectedOption = useMemo(
		() =>
			options.find((option) =>
				selectKey ? option[selectKey] : option.value === value
			),
		[options, value, selectKey]
	);
	return (
		<div className={blockName}>
			<Select
				options={options}
				value={selectedOption}
				className={bem('select')}
				isSearchable={false}
				onChange={onChange}
				closeMenuOnSelect={true}
				closeMenuOnScroll={true}
				theme={(theme) => ({
					...theme,
					borderRadius: '5px',
					colors: {
						...theme.colors,
						primary25: '#ffc0bd',
						primary: '#e10600',
					},
				})}
				maxMenuHeight={200}
				{...props}
			/>
		</div>
	);
};

export default DropdownSelect;
