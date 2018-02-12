const config = require('./config.json');
const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require("express");

const db = require('./model')(Sequelize, config);

module.exports = db;

async function main()
{
    db.sequelize.sync({force: false});
    let a = new (require('./servises/Properties'))();
    a.create({id: 1, heading: '123', price: 12, currency: 'EUR', location: '123'});
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('public'));

    app.listen(3000, () =>
    {
        console.log('Example app listening on port 3000!');
    });
}

main();