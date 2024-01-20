import { useCallback } from 'react';
import { trackDetails } from '@/utils/constants';
import useIsMobile from './useIsMobile';

export default function useFormatTrackName() {
	const isMobile = useIsMobile();
	const formatTrackName = useCallback(
		(track) => (!isMobile ? track : trackDetails[track]?.abbreviation),
		[isMobile]
	);

	return formatTrackName;
}
