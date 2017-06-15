const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config
let list = require('../utils/list')

const queryArray = (array, key, keyAlias = 'id') => {
    if (!(array instanceof Array)) {
        return null
    }
    let data

    for (let item of array) {
        if (item[keyAlias] === key) {
            data = item
            break
        }
    }

    if (data) {
        return data
    }
    return null
}

module.exports = {

    [`GET /api/redirect`] (req, res) {
        res.json(list)
    },

    [`POST /api/create`] (req, res) {
        const newDate = req.body;
        list.unshift(newDate);
        res.json({
            success: true,
        })
    },
    [`PATCH /api/update`] (req, res) {
        const editItem = req.body
        const id = editItem.id
        let isExist = false

        list = list.map((item) => {
            if (item.id === id) {
                isExist = true
                return Object.assign({}, item, editItem)
            }
            return item
        })

        if (isExist) {
            res.json({
                success: true,
            })
        } else {
            res.status(404).json(NOTFOUND)
        }
    },

    [`DELETE /api/remove/`] (req, res) {
        const { id } = req.body
        const data = queryArray(list, id, 'id')

        if (data) {
            list = list.filter((item) => item.id !== id)
            res.json({
                success: true,
            })
        } else {
            res.status(404).json(NOTFOUND)
        }
    },
}
