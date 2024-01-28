import { getSeasons } from '@/redux/selectors';
import { fetchSeasons } from '@/redux/actions';
import { useMemo } from 'react';
import useSelectOrFetch from './useSelectOrFetch';

export default function useIsActiveSeason(seasonId) {
	const { content: seasons } = useSelectOrFetch(getSeasons, fetchSeasons);
	const isActiveSeason = useMemo(
		() => seasons?.find(({ id }) => id === +seasonId)?.isActive || false,
		[seasons, seasonId]
	);

	return isActiveSeason;
}
