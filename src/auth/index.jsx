import './styles.scss';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '@/components/tabs';
import Login from './login';
import Signup from './signup';

const blockName = 'auth';

const tabs = [
	{
		label: 'Sign in',
		path: '/auth/login',
		to: 'login',
		element: <Login />,
	},
	{
		label: 'Register',
		path: '/auth/register',
		to: 'register',
		element: <Signup />,
	},
];

const Auth = () => {
	const { pathname } = useLocation();

	const activeTabIndex = useMemo(() => {
		const tabIndex = tabs.findIndex((tab) => tab.path === pathname);
		return tabIndex >= 0 ? tabIndex : 0;
	}, [pathname]);

	return (
		<div className={blockName}>
			<Tabs tabs={tabs} activeTabIndex={activeTabIndex} useLinks={true} />
			{tabs[activeTabIndex]?.element}
		</div>
	);
};

export default Auth;
