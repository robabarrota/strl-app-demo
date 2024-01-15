import { useDispatch, useSelector } from 'react-redux';

export default function useSelectOrFetch(selector, action) {
    const dispatch = useDispatch();

    const data = useSelector(selector);
	if (!data.fetched && !data.loading && !data.error) dispatch(action());

    return data;
}