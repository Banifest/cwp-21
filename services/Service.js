const db = require('../index');
const validators = require('./validators');
const errors = require('../utils/errors');

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

    async readAll()
    {
        return await this.model.findAll();
    }

    async readByOption(searchSetting = this.searchSetting)
    {
        let countRaw = Math.trunc((searchSetting.limit.end - searchSetting.limit.begin + 1) // Колтчество строк выборки
            / searchSetting.limit.step);
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
        if (!isNaN(id))
        {
            return await (await this.model.findById(Number(id))).get({plain: true});
        }
        else
        {
            throw errors.invalidId;
        }
    }

    async create(data)
    {
        if ((await validators.check(this.validatorName, data)).error)
        {
            throw errors.wrongCredentials;
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
            throw errors.invalidId;
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