class AgentsController extends require('./Controller')
{
    constructor()
    {
        super(new (require('../services/Agents'))());
        this.bindOffice = this.bindOffice.bind(this);
        this.unbindOffice = this.unbindOffice.bind(this);
        this.routers['/bindOffice'] = [{ method: 'post', cb: this.bindOffice }];
        this.routers['/unbindOffice'] = [{ method: 'post', cb: this.unbindOffice }];
        this.registerRouters();
    };

    async bindOffice(req, res)
    {
        res.json(await this.service.bindOffice(req.body.id, req.body.officeId));
    };

    async unbindOffice(req, res)
    {
        res.json(await this.service.unbindOffice(req.body));
    };
}

module.exports = () =>
{
    const controller = new AgentsController();

    return controller.router;
};