class PropertiesController extends require('./Controller')
{
    constructor()
    {
        super(new (require('../services/Properties'))());
        this.registerRouters();
    };

    async bindAgent(req, res)
    {
        res.json(this.service.bindAgent(req.body));
    };

    async unbindAgent(req, res)
    {
        res.json(this.service.unbindAgent(req.body));
    };
}

module.exports = () =>
{
    const controller = new PropertiesController();

    return controller.router;
};