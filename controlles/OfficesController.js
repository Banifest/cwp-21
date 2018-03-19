class OfficesController extends require('./Controller')
{
    constructor()
    {
        super(new (require('../services/Offices'))());
        this.readProp = this.readProp.bind(this);
        this.routers['/readProp'] = [{ method: 'post', cb: this.readProp }];
        this.registerRouters();
    };

    async readProp(req, res)
    {
        res.json(await this.service.readProp(req.body))
    };
}

module.exports = () =>
{
    const controller = new OfficesController();

    return controller.router;


};