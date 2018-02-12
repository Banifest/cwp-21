module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Offices', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: Sequelize.STRING(50)},
        website: {type: Sequelize.STRING(50)},
        address: {type: Sequelize.STRING(50)},
    });
};