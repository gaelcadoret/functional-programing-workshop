const notFound = async (req) => {
    throw new Error(`[${req?.method}] ${req?.url} can't be find !`);
}

module.exports = {
    notFound,
}