import { useDispatch, useSelector } from 'react-redux';
import { getActiveUser } from '@/redux/selectors';
import { fetchActiveUser } from '@/redux/actions';
import { useMemo } from 'react';

export default function useCheckUserPermission(permission) {
	const dispatch = useDispatch();

	const {
		content: activeUser,
		loading: activeUserLoading,
		fetched: activeUserFetched,
	} = useSelector(getActiveUser);

	if (!activeUserFetched && !activeUserLoading) dispatch(fetchActiveUser());

	const hasPermission = useMemo(
		() => activeUser?.permissions?.includes(permission),
		[activeUser, permission]
	);

	return hasPermission;
}
