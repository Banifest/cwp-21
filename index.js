const config = require('./config.json');
const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require("body-parser");

const db = require('./model')(Sequelize, config);

module.exports = db;

async function main()
{
    const app = express();

    db.sequelize.sync({force: false});

    app.use(bodyParser.json());

    app.use('/api', require('./controlles/api')());

    app.listen(3000, () =>
    {
        console.log('Example app listening on port 3000!');
    });

   // console.log(app);
}
main();