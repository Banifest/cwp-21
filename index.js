const config = require('./config.json');
let express = require('express');
let Sequelize = require('sequelize');
let joi = require('joi');
let winston = require('winston');
const bodyParser = require("express");

const db = require('./model')(Sequelize, config);

module.exports = db;

async function main()
{
    db.sequelize.sync({force: false});
    const app = express();
    app.use('/api', require('./api/api'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('public'));

    app.listen(3000, () =>
    {
        console.log('Example app listening on port 3000!');
    });
}

main();