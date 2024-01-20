import { useCallback } from 'react';
import { carAbbreviationMap } from '@/utils/constants';
import useIsMobile from './useIsMobile';

export default function useFormatConstructorName() {
	const isMobile = useIsMobile();
	const formatConstructorName = useCallback(
		(constructor) =>
			!isMobile ? constructor : carAbbreviationMap[constructor],
		[isMobile]
	);

	return formatConstructorName;
}
