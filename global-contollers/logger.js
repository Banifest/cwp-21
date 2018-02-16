const moment = require('moment');

module.exports = (req, res, next) => {

    const Logger = require('../services/Logger');

    Logger.info(`${req.method} ${req.path} ${moment().format('HH:mm:ss')}`);
    Logger.info(JSON.stringify(req.query));
    Logger.info(JSON.stringify(req.body));
    Logger.info();
    next();
};