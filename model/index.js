const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

module.exports = (Sequelize, config)=>
{
    const sequelize = new Sequelize('database', 'username', '',
        {
            host: 'localhost',
            dialect: 'sqlite',
            storage: './dataBase',
            define: {
                timestamps: true,
                paranoid: true
            }
        });

    const properties = require('./properties')(Sequelize, sequelize);
    const agents = require('./agents')(Sequelize, sequelize);
    const offices = require('./offices')(Sequelize, sequelize);

    properties.belongsTo(agents, {foreignKey: 'agentId', targetKey: 'id'});
    agents.belongsTo(offices, {foreignKey: 'officeId', targetKey: 'id'});


    return {
        properties,
        agents,
        offices,
        sequelize: sequelize,
        Sequelize: Sequelize
    };
};