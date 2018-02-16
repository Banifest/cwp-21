const moment = require('moment');

module.exports = (req, res, next) => {

    const Logger = require('../services/Logger');
    res.locals.trace = {};

    Logger.info(moment().format('HH:mm:ss'));
    Logger.info(`${req.method} ${req.path}`);
    Logger.info(JSON.stringify(req.query));
    Logger.info(JSON.stringify(req.body));
    Logger.info();
    next();
};