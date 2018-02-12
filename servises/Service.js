const db = require('../index');
const validators = require('./validators');

module.exports = class Service
{
    constructor(model=null, validatorName=null)
    {
        this.model = model;
        this.validatorName = validatorName;
        this.searchSetting = {
            limit: {
                begin: 1,
                end: 10,
                step: 1
            },
            offset: 0,
            sortOrder: 'ASC',
            sortField: 'id'
        };
    };


    async readByOption(searchSetting = this.searchSetting)
    {
        let countRaw = Math.trunc((searchSetting.limit.end - searchSetting.limit.begin + 1) // Колтчество строк выборки
            / searchSetting.limit.step);
        return await (await this.model.findAll(
        {
            offset: searchSetting.offset,
            order: [[searchSetting.sortField, searchSetting.sortOrder.toUpperCase()]],
        }))
        .filter((item, i, arr) => // фильтрация по заданому диапозону в limit
            i >= searchSetting.limit.begin && i <= searchSetting.limit.end
            && ((i - searchSetting.limit.begin + 1) % countRaw === 0) // каждый шаг
        );
    }

    async readById(id)
    {
        if (typeof id === 'number')
        {
            return await this.model.findById(id)
        }
        else
        {
            throw "not found by specify id";
        }
    }

    async create(data)
    {
        if ((await validators.check(this.validatorName, data)).error)
        {
            throw "not correct data value"
        }
        else
        {
            return await this.model.create(data);
        }
    }

    async updateById(id, data)
    {
        if ((this.validatorName.check(validators.check(this.validatorName, data))).error)
        {
            throw "not correct data value"
        }
        else
        {
            return await this.model.update(data, {where: {id: id}});
        }
    }

    async deleteById()
    {
        return this.model.destroy({where: {id: id}});
    }
};