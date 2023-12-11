import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';


export default function useSortInUrlParams(defaultSortBy) {
    const navigate = useNavigate();
	const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState(null);


	useEffect(() => {
		const sortKey = searchParams.get('sortBy');
		const sortDirection = searchParams.get('order');
		if (!sortKey) {
			setSortBy(null);
		} else {
			setSortBy({key: sortKey || defaultSortBy.key, direction: sortDirection || defaultSortBy.direction});
		}

	}, [searchParams, defaultSortBy]);

	const handleSort =	useCallback((toSortBy) => {
		if (toSortBy?.key === sortBy?.key && toSortBy?.direction === sortBy?.direction) return;
		
		setSortBy(toSortBy);

		if (!toSortBy) {
			const view = searchParams.get('view');

			navigate({
				search: `?${createSearchParams({
					...view && {view}
				})}`,
			}, { replace: true });
		} else {
			const existingParamEntries= Array.from(searchParams.entries());
			const existingParams = existingParamEntries.reduce((acc, a) => ((acc[a[0]] = acc[a[0]] || []).push(a[1]), acc), {});

			navigate({
				search: `?${createSearchParams({
					...existingParams,
					sortBy: toSortBy.key,
					order: toSortBy.direction,
				})}`,
			}, { replace: true });
		}
	}, [navigate, setSortBy, sortBy, searchParams]);

    return [sortBy, handleSort];;
}