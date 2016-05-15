'use strict';

module.exports = {
  urlTemplates: {
    self: '/accounts/{id}'
  },

  beforeRender(resource) {
    resource.removeAttr('email');
    resource.removeAttr('hashed_password');
    return resource;
  }
};
