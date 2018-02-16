const winston = require('winston');


const logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({ filename: 'log.log', level: 'info', maxsize: 500, }),
    ]
});

module.exports = logger;