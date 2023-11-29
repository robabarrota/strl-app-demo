import { useMemo } from 'react';
import './styles.scss';
import Select from 'react-select';

const DropdownSelect = ({ options, value, onChange, ...props }) => {
    const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);
    return (
        <div className="dropdown-select">
            <Select
                options={options}
                value={selectedOption}
                className='dropdown-select__select'
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
}

export default DropdownSelect;