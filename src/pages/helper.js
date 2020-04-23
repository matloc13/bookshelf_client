const findPages = (it, pl) => {
    const totalPages = it / pl;
    return totalPages;
};

const findRange = (st, pl, p) => {
    const lastPage = p * pl;
    const firstPage = lastPage - (pl - 1);
    if (lastPage > st) {
        return `${firstPage} of ${st}`;
    } else {
        return `${firstPage} of ${lastPage}`;
    }
};

const ef = {
    findPages,
    findRange,
};

export default ef;
