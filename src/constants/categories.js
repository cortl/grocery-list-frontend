import {BLACK, BLUE, GRAY, GREEN, LIGHT_BLUE, PINK, PURPLE, RED, TAN, WHITE, YELLOW} from "./colors";

export const PRODUCE = {
    category: 'Produce',
    backgroundColor: GREEN,
    textColor: WHITE,
    sortOrder: 0
};
export const DAIRY = {
    category: 'Dairy',
    backgroundColor: PINK,
    textColor: WHITE,
    sortOrder: 5
};
export const FROZEN = {
    category: 'Frozen',
    backgroundColor: LIGHT_BLUE,
    textColor: WHITE,
    sortOrder: 6
};
export const GRAINS = {
    category: 'Grains',
    backgroundColor: TAN,
    textColor: WHITE,
    sortOrder: 0
};
export const MEAT = {
    category: 'Meat',
    backgroundColor: RED,
    textColor: WHITE,
    sortOrder: 4
};
export const CANNED = {
    category: 'Canned',
    backgroundColor: GRAY,
    textColor: WHITE,
    sortOrder: 2
};
export const DRYGOODS = {
    category: 'DryGoods',
    backgroundColor: BLUE,
    textColor: WHITE,
    sortOrder: 1
};
export const HOUSEHOLD = {
    category: 'Household',
    backgroundColor: PURPLE,
    textColor: WHITE,
    sortOrder: 10
};
export const OTHER = {
    category: 'Other',
    backgroundColor: YELLOW,
    textColor: WHITE,
    sortOrder: 3
};
export const NONE = {
    category: 'None',
    backgroundColor: WHITE,
    textColor: BLACK,
    sortOrder: -1
};

export const CATEGORIES = {
    Produce: PRODUCE,
    Dairy: DAIRY,
    Frozen: FROZEN,
    Grains: GRAINS,
    Meat: MEAT,
    Canned: CANNED,
    Drygoods: DRYGOODS,
    Household: HOUSEHOLD,
    Other: OTHER,
    None: NONE,
};
