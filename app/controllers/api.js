'use strict';

const API = require('json-api');
const models = {
  Order: require('../models/order'),
  Account: require('../models/account'),
  Vendor: require('../models/vendor'),
  Portion: require('../models/portion'),
  Company: require('../models/company'),
  Product: require('../models/product'),
  PortionProduct: require('../models/portionProduct')
};

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry({
  orders: require('./api/resource-descriptions/order'),
  accounts: require('./api/resource-descriptions/account'),
  portions: require('./api/resource-descriptions/portion'),
  vendors: require('./api/resource-descriptions/vendor'),
  companies: require('./api/resource-descriptions/company'),
  products: require('./api/resource-descriptions/product'),
  'portion-products': require('./api/resource-descriptions/portionProduct')
}, { dbAdapter: adapter });

const controller = new API.controllers.API(registry);
const api = new API.httpStrategies.Express(controller);

module.exports = api.apiRequest.bind(api);
