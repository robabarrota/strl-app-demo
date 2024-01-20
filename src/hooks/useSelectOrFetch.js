import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useSelectOrFetch(selector, action, actionParams = []) {
	const dispatch = useDispatch(selector);
	const [prevParams, setPrevParams] = useState(actionParams);

	const paramsChanged = prevParams === actionParams;

	const data = useSelector(selector);
	if ((paramsChanged || !data.fetched) && !data.loading) {
		dispatch(action(...actionParams));
		setPrevParams(actionParams);
	}

	return data;
}
