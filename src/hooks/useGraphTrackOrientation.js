import { useMemo } from 'react';
import useIsMobile from './useIsMobile';

export default function useGraphTrackOrientation() {
    const isMobile = useIsMobile();
    const graphTrackOrientation = useMemo(() => !isMobile ? 0 : 270, [isMobile]);

    return graphTrackOrientation;
}