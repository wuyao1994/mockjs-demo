const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config
const list = require('../utils/redirect')
module.exports = {

  [`GET /api/redirect`] (req, res) {
    res.json(list)
  },
}
