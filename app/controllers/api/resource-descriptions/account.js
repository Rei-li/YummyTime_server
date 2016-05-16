'use strict';

module.exports = {
  urlTemplates: {
    self: '/accounts/{id}'
  },

  beforeRender(resource, req) {
    if (!req.user || req.params.id !== req.user.id) {
      resource.removeAttr('email');
      resource.removeAttr('google');
    }
    resource.removeAttr('hashed_password');
    return resource;
  }
};
