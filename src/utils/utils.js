import { camelCase } from 'lodash';
import { carColorMap, driverImageMap, defaultDriverImage } from './constants';

const cb = (block) => {
	const bem = (element = '', modifiers = '') => {
		let className = block;
		if (element) {
			className += `__${element}`;
		}

		if (modifiers) {
			if (Array.isArray(modifiers)) {
				className += modifiers.map((modifier) => `--${modifier}`).join(' ');
			} else {
				className += `--${modifiers}`;
			}
		}

		return className;
	};

	return bem;
};

const round = (number, { decimalPlace = 2, formatFn = null } = {}) => {
	const magnitude = 10 ** decimalPlace;
	const result = Math.floor(+number * magnitude) / magnitude;
	const cleanedResult = !Number.isNaN(result) ? result : number;
	const formattedResult = formatFn ? formatFn(cleanedResult) : cleanedResult;
	return formattedResult;
};

const getCarColor = (car, isPrimaryDriver, customOpacity = null) => {
	const { r, g, b } = carColorMap[camelCase(car)];
	let a = customOpacity;
	if (customOpacity === null) {
		a = isPrimaryDriver ? 1 : 0.75;
	}
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const badRaceResults = ['DNF', 'DNS', '', '-', undefined];

const tableSortFunction = (
	a,
	b,
	sortBy,
	lowIsPriority,
	zeroToBottom = false
) => {
	const negativeResults = [
		...badRaceResults,
		...(zeroToBottom ? ['0', 0] : []),
	];
	const getCorrectSortValue = (initialValue) => {
		let sortModifier = 1;
		sortModifier *= sortBy.direction === 'desc' ? -1 : 1;
		if (lowIsPriority) {
			sortModifier *=
				lowIsPriority === 'all' || lowIsPriority?.includes(sortBy.key) ? -1 : 1;
		}

		return initialValue * sortModifier;
	};

	if (a[sortBy.key] === 'DNF' && b[sortBy.key] === 'DNS') return -1;
	if (a[sortBy.key] === 'DNS' && b[sortBy.key] === 'DNF') return 1;
	if (negativeResults.includes(a[sortBy.key])) return 1;
	if (negativeResults.includes(b[sortBy.key])) return -1;

	const aVal =
		typeof a[sortBy.key] === 'number' ? a[sortBy.key] : +a[sortBy.key];
	const bVal =
		typeof b[sortBy.key] === 'number' ? b[sortBy.key] : +b[sortBy.key];
	if (aVal < bVal) {
		return getCorrectSortValue(-1);
	}
	if (aVal > bVal) {
		return getCorrectSortValue(1);
	}
	return 0;
};
const nameSortFunction = (a, b, sortBy) => {
	const getCorrectSortValue = (initialValue) => {
		let sortModifier = 1;
		sortModifier *= sortBy.direction === 'asc' ? -1 : 1;

		return initialValue * sortModifier;
	};

	const aVal = a[sortBy.key];
	const bVal = b[sortBy.key];
	if (aVal < bVal) {
		return getCorrectSortValue(-1);
	}
	if (aVal > bVal) {
		return getCorrectSortValue(1);
	}
	return 0;
};
const camelize = (str) =>
	str
		? str
				.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
					index === 0 ? word.toLowerCase() : word.toUpperCase()
				)
				.replace(/\s+/g, '')
		: str;

const camelizeKeys = (data) => {
	if (Array.isArray(data)) {
		return data.map((v) => camelizeKeys(v));
	}
	if (data != null && data.constructor === Object) {
		return Object.keys(data).reduce(
			(result, key) => ({
				...result,
				[camelize(key)]: camelizeKeys(data[key]),
			}),
			{}
		);
	}
	return data;
};

const groupBy = (arr, key) => {
	const result = arr.reduce((r, a) => {
		const init = r[a[key]] || [];
		// eslint-disable-next-line no-param-reassign
		r[a[key]] = init;
		r[a[key]].push(a);
		return r;
	}, Object.create(null));
	return result;
};

const getDriverImage = (driverName) =>
	driverImageMap[driverName] || defaultDriverImage;

const nth = (n) => {
	let suffix;
	if (n > 3 && n < 21) {
		suffix = 'th';
	} else if (n % 10 === 1) {
		suffix = 'st';
	} else if (n % 10 === 2) {
		suffix = 'nd';
	} else if (n % 10 === 3) {
		suffix = 'rd';
	} else {
		suffix = 'th';
	}
	return n + suffix;
};

export {
	round,
	getCarColor,
	tableSortFunction,
	camelize,
	camelizeKeys,
	groupBy,
	getDriverImage,
	nameSortFunction,
	nth,
	cb,
};
