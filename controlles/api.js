const express = require('express');

module.exports = () =>
{
    const router = express.Router();
    const propertiesController = require('./PropertiesController')();
    const officesController = require('./OfficesController')();
    const agentsController = require('./AgentsController')();

    router.use('/properties', propertiesController);
    router.use('/offices', officesController);
    router.use('/agents', agentsController);

    return router;
};