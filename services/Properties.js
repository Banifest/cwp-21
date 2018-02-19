const db = require('../index');

module.exports = class Properties extends require('./Service')
{
    constructor()
    {
        super(db.properties, 'properties');
    }
    async bindAgent(id, agentId)
    {
        let property = (await db.properties.findById(id));
        let agent = (await db.agents.findById(agentId)).id;
        if(property && agent)
        {
            property.agentId = agentId;
        }
        else
        {
            throw "can't bind property and agent";
        }
        property.save();
        return property;
    }

    async unbindAgent(id)
    {
        let property = await db.properties.findById(id);
        if(property)
        {
            property.agentId = null;
        }
        property.save();
        return property;
    }
};