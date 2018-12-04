export const matchingCategory = item => (category) => {
    return category.name.toUpperCase().includes(item.name.toUpperCase())
};
