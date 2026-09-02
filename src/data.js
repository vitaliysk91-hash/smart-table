const BASE_URL = 'https://webinars.webdev.education-services.ru/sp7-api';

export function initData() {
    let sellers;
    let customers;
    let lastResult;
    let lastQuery;

    const mapRecords = (records) => records.map(record => ({
        id: record.receipt_id,
        date: record.date,
        seller: sellers[record.seller_id],
        customer: customers[record.customer_id],
        total: record.total_amount
    }));

    const getIndexes = async () => {
        if (!sellers || !customers) {
            [sellers, customers] = await Promise.all([
                fetch(`${BASE_URL}/sellers`).then(response => response.json()),
                fetch(`${BASE_URL}/customers`).then(response => response.json())
            ]);
        }

        return {sellers, customers};
    };

    const getRecords = async (query, isUpdated = false) => {
        const searchParams = new URLSearchParams(query);
        const nextQuery = searchParams.toString();

        if (lastQuery === nextQuery && !isUpdated) {
            return lastResult;
        }

        if (!sellers || !customers) {
            await getIndexes();
        }

        const response = await fetch(`${BASE_URL}/records?${nextQuery}`);
        const records = await response.json();

        lastQuery = nextQuery;
        lastResult = {
            total: records.total,
            items: mapRecords(records.items)
        };

        return lastResult;
    };

    return {
        getIndexes,
        getRecords
    };
}
