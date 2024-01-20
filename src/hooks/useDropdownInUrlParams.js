import { useCallback, useEffect } from 'react';
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

export default function useDropdownInUrlParams(
	paramKey,
	value,
	onSelect,
	dropdownOptions
) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const selectedOptionLabel = searchParams.get(paramKey);
		const view = searchParams.get('view');
		if (!selectedOptionLabel) {
			if (value) {
				navigate(
					{
						search: `?${createSearchParams({
							...(view && { view }),
							[paramKey]: value,
						})}`,
					},
					{ replace: true }
				);
			} else {
				return;
			}
		}

		const selectedOption = dropdownOptions.find(
			({ label }) => label === selectedOptionLabel
		);
		if (!selectedOption) return;

		onSelect(selectedOption);
	}, [onSelect, searchParams, dropdownOptions, paramKey, value, navigate]);

	const handleSelectedOptions = useCallback(
		(option) => {
			if (option === value) return;
			onSelect(option);

			const view = searchParams.get('view');

			navigate(
				{
					search: `?${createSearchParams({
						...(view && { view }),
						[paramKey]: option?.label,
					})}`,
				},
				{ replace: true }
			);
		},
		[onSelect, navigate, value, searchParams, paramKey]
	);

	return handleSelectedOptions;
}
