module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Properties', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        heading: {type: Sequelize.STRING(50)},
        price: {type: Sequelize.INTEGER},
        currency: {type: Sequelize.STRING(50)},
        location: {type: Sequelize.STRING(50)},
    });
};