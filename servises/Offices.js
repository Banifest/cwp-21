const db = require('../index');

module.exports = class Offices extends require('./Service')
{
    constructor()
    {
        super(db.offices, 'offices');
    }
};