import { camelCase } from 'lodash';
import { carColorMap, driverImageMap, defaultDriverImage } from './constants';

const round = (number, {decimalPlace = 2, formatFn = null} = {}) => {
    const magnitude = Math.pow(10, decimalPlace);
    const result = Math.floor(+number * magnitude) / magnitude;
    const cleanedResult = !isNaN(result) ? result : number;
    const formattedResult = formatFn ? formatFn(cleanedResult) : cleanedResult;
    return formattedResult;
};

const getCarColor = (car, isPrimaryDriver, customOpacity = null) => {
    const {r, g, b} = carColorMap[camelCase(car)];
    const a = customOpacity === null ? isPrimaryDriver ? 1 : 0.75 : customOpacity;
    return `rgba(${r}, ${g}, ${b}, ${a})`
};

const badRaceResults = ['DNF', 'DNS', '', '-', undefined];

const tableSortFunction = (a, b, sortBy, lowIsPriority, zeroToBottom = false) => {
    const negativeResults = [
        ...badRaceResults,
        ...zeroToBottom ? ['0', 0] : [],
    ]
    const getCorrectSortValue = (initialValue) => {
        let sortModifier = 1;
        sortModifier *= sortBy.direction === 'desc' ? -1 : 1;
        if (lowIsPriority) {
            sortModifier *= lowIsPriority === 'all' || lowIsPriority?.includes(sortBy.key) ? -1 : 1;
        }

        return initialValue * sortModifier;
    };

    if (a[sortBy.key] === 'DNF' && b[sortBy.key] === 'DNS' ) return -1;
    if (a[sortBy.key] === 'DNS' && b[sortBy.key] === 'DNF') return  1;
    if (negativeResults.includes(a[sortBy.key])) return 1;
    if (negativeResults.includes(b[sortBy.key])) return -1;
    
    const aVal = typeof a[sortBy.key] === 'number' ? a[sortBy.key] : +a[sortBy.key];
    const bVal = typeof b[sortBy.key] === 'number' ? b[sortBy.key] : +b[sortBy.key];
    if (aVal < bVal){
        return getCorrectSortValue(-1);
    }
    if (aVal > bVal){
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
    if (aVal < bVal){
        return getCorrectSortValue(-1);
    }
    if (aVal > bVal){
        return getCorrectSortValue(1);
    }
    return 0;
};
const camelize = (str) => {
    return str ? str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '') : str;
}

const camelizeKeys = (data) => {
    if (Array.isArray(data)) {
        return data.map(v => camelizeKeys(v));
    } else if (data != null && data.constructor === Object) {
        return Object.keys(data).reduce(
            (result, key) => ({
                ...result,
                [camelize(key)]: camelizeKeys(data[key]),
            }), {}
        );
    }
    return data;
}

const groupBy = (arr, key) => {
    const result = arr.reduce(function (r, a) {
        r[a[key]] = r[a[key]] || [];
        r[a[key]].push(a);
        return r;
    }, Object.create(null));
    return result;
}

const getDriverImage = (driverName) => {
    return driverImageMap[driverName] || defaultDriverImage;
}

const nth = n => n+(n>3&&n<21?"th":n%10===1?"st":n%10===2?"nd":n%10===3?"rd":"th");

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
}