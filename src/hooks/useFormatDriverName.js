import { useCallback } from 'react';
import useIsMobile from './useIsMobile';

export default function useFormatDriverName() {
    const isMobile = useIsMobile();
	const formatDriverName = useCallback((driver) => {
        if(!isMobile) { 
            return driver;
        } 
        else {
            const nameBreakdown = driver.split(' ');
            let name = nameBreakdown[0];
            if (nameBreakdown[1]) {
                name += " " + nameBreakdown[1][0];
            }
            return name;
        }
    }, [isMobile])

    return formatDriverName;
}