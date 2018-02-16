module.exports = async (req, res, next) =>
{

    if (req.method === "GET")
    {
        const cached = await require('../services/Cache').get(req);
        if (cached)
        {
            const Logger = require('../services/Logger');
            Logger.info(`FROM CACHE`);
            res.json(cached);
            return;
        }
    }
    next();
};