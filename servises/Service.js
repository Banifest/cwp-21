const db = require('../index');
const joi = require('joi');

module.exports = class Service
{
    constructor()
    {
        this.modelName = null;
        this.searchSetting = {
            limit: {
                begin: 1,
                end: 10,
                step: 1
            },
            offset: 0,
            sortOrder: 'ASC',
            sortField: 'id'
        }
}

async readByOption(searchSetting=this.searchSetting)
{
    let countRaw = Math.trunc((searchSetting.limit.end - searchSetting.limit.begin + 1)
                / searchSetting.limit.step);
    return await (await db.modelName.findAll({
        offset: searchSetting.offset,
        order: [[searchSetting.sortField, searchSetting.sortOrder.toUpperCase()]],
    })).filter((item, i, arr)=>
        i >= searchSetting.limit.begin && i <= searchSetting.limit.end
        && ((i - searchSetting.limit.begin + 1 ) % countRaw === 0)
    );
}

async readById(id)
{
    if(typeof id === 'number')
    {
        return await db.modelName.findById(id)
    }
    else
    {
        throw "not found by specify id";
    }
}

async create(data)
{
    db.modelName.create();
}

async  updateById()
    {

    }

    async function

    deleteById()
    {

    }

    async function

    bindAgent()
    {

    }

    async function

    unbindAgent()
    {

    }
};