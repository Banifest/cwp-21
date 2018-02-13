const db = require('../index');

module.exports = class Agents extends require('./Service')
{
    constructor()
    {
        super(db.agents, 'agents');
    }
    async bindOffice(id, officeId)
    {
        let agent = await db.agents.findById(id);
        let office = await db.properties.findById(officeId);
        if(office && agent)
        {
            agent.officeId = officeId;
        }
        else
        {
            throw "can't bind office and agent";
        }
    }

    async unbindOffice(id)
    {
        let agent = await db.properties.findById(id);
        if(agent)
        {
            agent.officeId = null;
        }
    }
};