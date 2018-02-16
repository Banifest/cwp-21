const db = require('../index');

module.exports = class Agents extends require('./Service')
{
    constructor()
    {
        super(db.agents, 'agents');
    }
    async bindOffice(id, officeId)
    {
        let agent = (await db.agents.findById(id)).id;
        let office = (await db.properties.findById(officeId)).id;
        if(office && agent)
        {
            agent.officeId = officeId;
        }
        else
        {
            throw this.errors.notFound;
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