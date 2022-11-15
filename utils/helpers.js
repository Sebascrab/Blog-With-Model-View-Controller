


// helper to return timestamp:
module.exports = {
    format_plural: (word, amount) => {
        if (amount !==1) {
            return `${words}s`;
        }
        return word;
    },
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
}