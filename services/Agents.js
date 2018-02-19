const db = require('../index');

module.exports = class Agents extends require('./Service')
{
    constructor()
    {
        super(db.agents, 'agents');
    }
    async bindOffice(id, officeId)
    {
        let agent = (await db.agents.findById(id));
        let office = (await db.offices.findById(officeId)).id;
        if(office && agent)
        {
            agent.officeId = officeId;
        }
        else
        {
            throw this.errors.notFound;
        }
        agent.save();
        return agent;
    };

    async unbindOffice(id)
    {
        let agent = await db.agents.findById(id);
        if(agent)
        {
            agent.officeId = null;
        }
        agent.save();
        return agent;
    }

    async readProp(searchSetting = this.searchSetting)
    {
        return await (await db.properties.findAll(
            {
                offset: searchSetting.offset,
                order: [[searchSetting.sortField, searchSetting.sortOrder.toUpperCase()]],
                raw: true,
                where: {agentId: searchSetting.id}
            },
            ))
            .filter((item, i, arr) => // фильтрация по заданому диапозону в limit
                i >= searchSetting.limit.begin - 1  && i <= searchSetting.limit.end - 1
                && ((i - searchSetting.limit.begin + 2) % searchSetting.limit.step === 0) // каждый шаг
            );
    }

    async deleteById(id)
    {
        await db.properties.update({agentId: null}, {where: {agentId: id}});
        return await this.model.destroy({where: {id: id}});
    }


};