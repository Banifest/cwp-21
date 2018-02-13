class OfficesController extends require('./Controller')
{
    constructor()
    {
        super(new (require('../services/Offices'))());
        this.registerRouters();
    };
}

module.exports = () =>
{
    const controller = new OfficesController();

    return controller.router;
};