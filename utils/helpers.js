module.exports = {
    format_time: (date) => {
        return date.toLocalTimeString();
    },
    format_date: (date) => {
        // Using JavaScript Date methods, we get and format the month, date, and year
    // We need to add one to the month since it is returned as a zero-based valu
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
};