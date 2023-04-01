const getUser = async (req, res) => {
    return {
        body: req.body || 'a',
        params: req.params || 'b',
        query: req.query || 'c',
    }
}

module.exports = {
    getUser,
}