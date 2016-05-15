'use strict';

module.exports = {
  db: `mongodb://ytm-usr:ytm-pwd@ds032579.mlab.com:32579/yummytimetest`,
  port: process.env.PORT || 3000,
  originURL: 'https://yummy-time.herokuapp.com',
  secret: 'secret',
  google: {
    // eslint-disable-next-line max-len
    clientID: process.env.GOOGLE_CLIENTID || '1071029381615-tucu38j7kboh2kk4f8tj9br832gihl03.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'mAgQY2Z9TPJzFGEGkQjU1-37',
    callbackURL: 'https://yummy-time.herokuapp.com'
  }
};
