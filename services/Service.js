const db = require('../index');
const validators = require('./validators');
const errors = require('../utils/errors');

module.exports = class Service
{
    constructor(model=null, validatorName=null)
    {
        this.errors = require('../utils/errors');
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

    async readAll()
    {
        return await this.model.findAll();
    }

    async readByOption(searchSetting = this.searchSetting)
    {
        return await (await this.model.findAll(
        {
            offset: searchSetting.offset,
            order: [[searchSetting.sortField, searchSetting.sortOrder.toUpperCase()]],
            raw: true
        }))
        .filter((item, i, arr) => // фильтрация по заданому диапозону в limit
            i >= searchSetting.limit.begin - 1  && i <= searchSetting.limit.end - 1
            && ((i - searchSetting.limit.begin + 2) % searchSetting.limit.step === 0) // каждый шаг
        );
    }

    async readById(id)
    {
        if (!isNaN(id) && (await this.model.findById(Number(id))) != null)
        {
            return await (await this.model.findById(Number(id))).get({plain: true});
        }
        else
        {
            throw this.errors.notFound;
        }
    }

    async create(data)
    {
        if ((await validators.check(this.validatorName, data)).error)
        {
            throw this.errors.wrongCredentials;
        }
        else
        {
            return await this.model.create(data);
        }
    }

    async updateById(id, data)
    {
        if ((await validators.check(this.validatorName, data)).error)
        {
            throw errors.invalidId;
        }
        else
        {
            await this.model.update(data, {where: {id: id}});
            return this.readById(id);
        }
    }

    async deleteById(id)
    {
        return this.model.destroy({where: {id: id}});
    }
};