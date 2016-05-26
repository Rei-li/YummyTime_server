'use strict';

module.exports = {
  db: 'mongodb://localhost/mytest',
  port: process.env.PORT || 3000,
  originURL: 'http://127.0.0.1:4200',
  secret: 'secret',
  google: {
    // eslint-disable-next-line max-len
    clientID: process.env.GOOGLE_CLIENTID || '1071029381615-tucu38j7kboh2kk4f8tj9br832gihl03.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'mAgQY2Z9TPJzFGEGkQjU1-37',
    callbackURL: 'http://127.0.0.1:4200'
  },
  smtp: 'smtps://yummytime.test%40gmail.com:yandex-shri-minsk-2016@smtp.gmail.com',
  systemEmail: 'yummytime.test@gmail.com',
  menuUpdateUrl: 'https://menu-yummytime.herokuapp.com/menu',
  integratedVendorUrl: 'http://pzz.by/',
  adminEmail: 'rei-li@mail.ru'
};
