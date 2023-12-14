import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';


export default function useTabsInUrlParams(tabs) {
    const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const queryTab = searchParams.get('view');
	const defaultTabIndex = tabs.findIndex(tab => tab.label === queryTab)
	const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex !== -1 ? defaultTabIndex : 0);

	useEffect(() => {
		const queryTab = searchParams.get('view');
		if (!queryTab) return;
		const tabIndex = tabs.findIndex(tab => tab.label === queryTab)
		if (tabIndex < 1) return;

		setActiveTabIndex(tabIndex);
	}, [searchParams, tabs]);

	const handleActiveTab = useCallback((tabIndex) => {
		if (tabIndex === activeTabIndex) return;
		
		setActiveTabIndex(tabIndex);

		navigate({
			search: `?${createSearchParams({
				view: tabs[tabIndex]?.label,
			})}`,
		}, { replace: true });
	}, [setActiveTabIndex, navigate, activeTabIndex, tabs]);

    return [activeTabIndex, handleActiveTab];
}