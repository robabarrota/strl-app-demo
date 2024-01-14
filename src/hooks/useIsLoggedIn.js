import { useDispatch, useSelector } from 'react-redux';
import { getActiveUser } from '@/redux/selectors';
import { fetchActiveUser } from '@/redux/actions';

export default function useIsLoggedIn() {
    const dispatch = useDispatch();

	const { content: activeUser, loading: activeUserLoading, fetched: activeUserFetched, error: activeUserError } = useSelector(getActiveUser);

	if (!activeUserFetched && !activeUserLoading) dispatch(fetchActiveUser());

    if (!!activeUserError || !activeUser) {
        return false;
    }

    return true;
}