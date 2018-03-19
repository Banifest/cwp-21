const db = require('../index');

module.exports = class Offices extends require('./Service')
{
    constructor()
    {
        super(db.offices, 'offices');
    }

    async readProp(searchSetting = this.searchSetting)
    {
        return await (await db.agents.findAll(
            {
                offset: searchSetting.offset,
                order: [[searchSetting.sortField, searchSetting.sortOrder.toUpperCase()]],
                raw: true,
                where: {officeId: searchSetting.id}
            },
        ))
            .filter((item, i, arr) => // фильтрация по заданому диапозону в limit
                i >= searchSetting.limit.begin - 1  && i <= searchSetting.limit.end - 1
                && ((i - searchSetting.limit.begin + 2) % searchSetting.limit.step === 0) // каждый шаг
            );
    }

    async deleteById(id)
    {
        await db.agents.update({officeId: null}, {where: {officeId: id}});
        return await this.model.destroy({where: {id: id}});
    }
};