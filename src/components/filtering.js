export function initFiltering(elements) {
    const updateIndexes = (filterElements, indexes) => {
        Object.keys(indexes).forEach(elementName => {
            const options = Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            });

            filterElements[elementName].append(...options);
        });
    };

    const applyFiltering = (query, state, action) => {
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input');

            if (input) {
                input.value = '';
            }

            state[field] = '';
        }

        const filter = {};

        Object.keys(elements).forEach(key => {
            const element = elements[key];

            if (
                element &&
                ['INPUT', 'SELECT'].includes(element.tagName) &&
                element.value
            ) {
                filter[`filter[${element.name}]`] = element.value;
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}
