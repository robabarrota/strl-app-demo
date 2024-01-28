import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useSelectOrFetch(selector, action, actionParams = []) {
	const dispatch = useDispatch();

	const data = useSelector(selector);

	useEffect(() => {
		if (!data.loading) {
			dispatch(action(...actionParams));
		}
	}, []);

	return data;
}
