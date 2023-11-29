import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';


export default function useTabsInUrlParams(tabs) {
    const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	useEffect(() => {
		const queryTab = searchParams.get('view');
		if (!queryTab) return;
		const tabIndex = tabs.findIndex(tab => tab === queryTab)
		if (tabIndex < 1) return;

		setActiveTabIndex(tabIndex);
	}, [searchParams, tabs]);

	const handleActiveTab = useCallback((tabIndex) => {
		if (tabIndex === activeTabIndex) return;
		
		setActiveTabIndex(tabIndex);

		navigate({
			search: `?${createSearchParams({
				view: tabs[tabIndex],
			})}`,
		}, { replace: true });
	}, [setActiveTabIndex, navigate, activeTabIndex, tabs]);

    return [activeTabIndex, handleActiveTab];;
}