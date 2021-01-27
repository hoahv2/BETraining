const getUser = async (req, res) => {
    try {
        res.json({
            body: req.body || 'a',
            params: req.params || 'b',
            query: req.query || 'c',
        })
    } catch (error) {
        console.error(error)
        res.sendStatus(400)
    }
}

module.exports = {
    getUser,
}