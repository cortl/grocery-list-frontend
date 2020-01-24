const hasNumber = string => {
    return /\d/.test(string);
};

export const itemStripper = name => {
    return name.split(' ')
        .filter((item) => !hasNumber(item))
        .filter((item) => item.length !== 1)
        .join(' ').toUpperCase();
};