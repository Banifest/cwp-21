class CacheService
{
    constructor()
    {
        const LRU = require('lru-cache');
        this.logger = require('../services/Logger');
        this.options =
        {
            max: 50000,
            maxAge: 30000
        };
        this.cache = LRU(this.options);
    }

    async set(req, data)
    {
        this.cache.set(req.originalUrl, data, 30000);
    }

    async get(req)
    {
        console.log(this.cache.dump());
        let answ = await this.cache.get(req.originalUrl);
        if (answ)
        {
            this.logger.info(`FROM CACHE ${answ}`);
        }
        return answ;
    }

    async invalidate(req)
    {

    }
}
const cache = new CacheService();

module.exports = cache;