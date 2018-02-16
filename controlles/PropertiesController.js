class PropertiesController extends require('./Controller')
{
    constructor()
    {
        super(new (require('../services/Properties'))());
        this.bindAgent = this.bindAgent.bind(this);
        this.unbindAgent = this.unbindAgent.bind(this);
        this.routers['/bindAgent'] = [{ method: 'post', cb: this.bindAgent }];
        this.routers['/unbindAgent'] = [{ method: 'post', cb: this.unbindAgent }];
        this.registerRouters();
    };

    async bindAgent(req, res)
    {
        res.json(await this.service.bindAgent(req.body.id, req.body.agentId));
    };

    async unbindAgent(req, res)
    {
        res.json(await this.service.unbindAgent(req.body.id));
    };
}

module.exports = () =>
{
    const controller = new PropertiesController();

    return controller.router;
};