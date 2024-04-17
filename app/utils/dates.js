// dd/mm/yyyy
export function generateDateLabels(daysAgo) {
    const arr = [];

    for (let i = 0; i < daysAgo; i++) {
        const now = new Date();

        const startDate = now.getDate();
        const currentDate = now.setDate(startDate - i);
        const formattedDate = formatDate(currentDate);

        arr.push(formattedDate);
    }
    return arr;
}

export function formatDate(dateNumber) {
    const date = new Date(dateNumber);
    return date.toLocaleDateString("en-gb");
}
