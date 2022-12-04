const sheetKey = 'AIzaSyDPv1vWH_NZcLchfs36RetwSC1c99xkFm8';
const sheetId = '1r8vXuLNfUxgmRlQ67YKBzC6gc22irsdzlHI6DSyyWPc';

const mobileWidth = 920;

const sheetConfig = {
    apiKey: process.env.REACT_APP_LOCAL_SHEETS_API_KEY ?? sheetKey,
    sheetId: sheetId,
};

const carAbbreviationMap = {
    'Mercedes': 'MER',
    'Red Bull': 'RB',
    'Ferrari': 'FER',
    'McLaren': 'MCL',
    'Alpine': 'ALP',
    'AlphaTauri': 'ALPH',
    'Aston Martin': 'AST',
    'Williams': 'WILL',
    'Alfa Romeo': 'ALFA',
    'Haas': 'HAAS',
};

const trackAbbreviationMap = {
    'Australia': 'AUS',
    'Bahrain': 'BHR',
    'China': 'CHN',
    'Netherlands': 'NLD',
    'Spain': 'ESP',
    'Monaco': 'MCO',
    'Azerbaijan': 'AZE',
    'Canada': 'CAN',
    'France': 'FRA',
    'Austria': 'AUT',
    'Britain': 'GBR',
    'Hungary': 'HUN',
    'Belgium': 'BEL',
    'Italy': 'ITA',
    'Singapore': 'SGP',
    'Japan': 'JPN',
    'USA': 'USA',
    'Mexico': 'MEX',
    'Brazil': 'BRA',
    'Abu Dhabi': 'ABU',
    'EMILIA ROMAGNA': 'EMI',
    'Miami': 'MIA',
    'Portugal': 'POR'
};

const carColorMap = {
    mercedes: {
        r: 108,
        g: 211,
        b:  191
    },
    redBull: {
        r: 30,
        g: 91,
        b:  198
    },
    ferrari: {
        r: 28,
        g: 237,
        b:  36
    },
    mcLaren: {
        r: 128,
        g: 245,
        b:  32
    },
    alpine: {
        r: 34,
        g: 147,
        b:  209
    },
    alphaTauri: {
        r: 78,
        g: 124,
        b:  155
    },
    astonMartin: {
        r: 45,
        g: 130,
        b:  109
    },
    williams: {
        r: 55,
        g: 190,
        b:  221
    },
    alfaRomeo: {
        r: 32,
        g: 172,
        b:  57
    },
    haas: {
        r: 182,
        g: 186,
        b:  189
    },
};

const pointMap = {
    1: 25,
    2: 18,
    3: 15,
    4: 12,
    5: 10,
    6: 8,
    7: 6,
    8: 4,
    9: 2,
    10: 1,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    'DNF': 0,
    'DNS': 0,
};

export {
    mobileWidth,
    sheetConfig,
    carAbbreviationMap,
    trackAbbreviationMap,
    carColorMap,
    pointMap,
};