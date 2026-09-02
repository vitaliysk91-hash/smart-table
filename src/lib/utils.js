/**
 * Клонирует шаблон и собирает элементы с атрибутом data-name.
 * @param {string} templateId
 * @returns {{container: Node, elements: Object}}
 */
export function cloneTemplate(templateId) {
    const template = document.getElementById(templateId);
    const clone = template.content.firstElementChild.cloneNode(true);
    const elements = Array.from(clone.querySelectorAll('[data-name]')).reduce((result, element) => {
        result[element.dataset.name] = element;
        return result;
    }, {});

    return {
        container: clone,
        elements
    };
}

/**
 * Преобразует FormData в обычный объект.
 * @param {FormData} formData
 * @returns {Object}
 */
export function processFormData(formData) {
    return Array.from(formData.entries()).reduce((result, [key, value]) => {
        result[key] = value;
        return result;
    }, {});
}

/**
 * Возвращает номера страниц для отображения в пагинаторе.
 * @param {number} currentPage
 * @param {number} maxPage
 * @param {number} limit
 * @returns {number[]}
 */
export function getPages(currentPage, maxPage, limit) {
    currentPage = Math.max(1, Math.min(maxPage, currentPage));
    limit = Math.min(maxPage, limit);

    let start = Math.max(1, currentPage - Math.floor(limit / 2));
    let end = start + limit - 1;

    if (end > maxPage) {
        end = maxPage;
        start = Math.max(1, end - limit + 1);
    }

    const pages = [];

    for (let page = start; page <= end; page++) {
        pages.push(page);
    }

    return pages;
}
