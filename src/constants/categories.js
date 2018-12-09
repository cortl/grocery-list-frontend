import {BLACK, BLUE, GRAY, GREEN, LIGHT_BLUE, PINK, PURPLE, RED, TAN, WHITE, YELLOW} from "./colors";

export const PRODUCE = {
    category: 'Produce',
    backgroundColor: GREEN,
    textColor: WHITE,
    sortOrder: 0,
    symbol: '🍎'
};
export const DAIRY = {
    category: 'Dairy',
    backgroundColor: PINK,
    textColor: WHITE,
    sortOrder: 85,
    symbol: '🥛'
};
export const FROZEN = {
    category: 'Frozen',
    backgroundColor: LIGHT_BLUE,
    textColor: WHITE,
    sortOrder: 90,
    symbol: '🍦'
};
export const GRAINS = {
    category: 'Grains',
    backgroundColor: TAN,
    textColor: WHITE,
    sortOrder: 3,
    symbol: '🍞'
};
export const MEAT = {
    category: 'Meat',
    backgroundColor: RED,
    textColor: WHITE,
    sortOrder: 80,
    symbol: '🥩'
};
export const CANNED = {
    category: 'Canned',
    backgroundColor: GRAY,
    textColor: WHITE,
    sortOrder: 4,
    symbol: '🥫'
};
export const DRYGOODS = {
    category: 'DryGoods',
    backgroundColor: BLUE,
    textColor: WHITE,
    sortOrder: 2,
    symbol: '🍯'
};
export const HOUSEHOLD = {
    category: 'Household',
    backgroundColor: PURPLE,
    textColor: WHITE,
    sortOrder: 100,
    symbol: '🔨'
};
export const OTHER = {
    category: 'Other',
    backgroundColor: YELLOW,
    textColor: WHITE,
    sortOrder: 110,
    symbol: '🍺'
};
export const NONE = {
    category: 'None',
    backgroundColor: WHITE,
    textColor: BLACK,
    sortOrder: -1,
    symbol: ''
};

export const CATEGORIES = {
    Produce: PRODUCE,
    Dairy: DAIRY,
    Frozen: FROZEN,
    Grains: GRAINS,
    Meat: MEAT,
    Canned: CANNED,
    DryGoods: DRYGOODS,
    Household: HOUSEHOLD,
    Other: OTHER,
    None: NONE
};
