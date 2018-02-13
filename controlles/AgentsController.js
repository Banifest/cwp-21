class AgentsController extends require('./Controller')
{
    constructor()
    {
        super(new (require('../services/Agents'))());
        this.registerRouters();
    };

    async bindOffice(req, res)
    {
        res.json(this.service.bindOffice(req.body));
    };

    async unbindOffice(req, res)
    {
        res.json(this.service.unbindOffice(req.body));
    };
}

module.exports = () =>
{
    const controller = new AgentsController();

    return controller.router;
};