'use strict';

const nodemailer = require('nodemailer');
const Order = require('../models/order');
const config = require('../../config/config');


function sendEmail(email, message) {
  // eslint-disable-next-line no-console
  console.log(`email: ${email}`);
  const transporter = nodemailer.createTransport(config.smtp);

  const mailOptions = {
    from: config.systemEmail,
    to: email,
    subject: 'Notification',
    text: message
  };

  transporter.verify(error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } else {
      transporter.sendMail(mailOptions, (sendError, info) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log(sendError);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Message sent: ${info.response}`);
        }
      });
    }
  });
}

exports.sendEmail = function(email, message) {
  sendEmail(email, message);
};
exports.connection = function(io) {
  // io.set('transports', ['xhr-polling']);
  io.set('polling duration', 10);
  io.sockets.on('connection', socket => {
    socket.on('join', data => {
      socket.join(data.room);
    });

    socket.on('leave', data => {
      socket.leave(data.room);
    });

    socket.on('sendMessage', data => {
      socket.broadcast.to(data.order).emit('message', { msg: data.message });

      const emails = [];
      Order
        .findById(data.order)
        .populate({
          path: 'portions',
          model: 'Portion',
          populate: {
            path: 'owner',
            model: 'Account'
          }
        })
        .exec((err, order) => {
          order.portions.forEach(item => {
            let isInList = false;
            emails.forEach(email => {
              if (email === item.owner.email) {
                isInList = true;
              }
            });
            if (!isInList) {
              emails.push(item.owner.email);
            }
          });

          emails.forEach(email => {
            sendEmail(email, data.message);
          });
        });
    });


    socket.on('getOrders', data => {
      const orders = [];
      Order
        .find()
        .populate({
          path: 'portions',
          model: 'Portion',
          populate: {
            path: 'owner',
            model: 'Account'
          }
        })
        .exec((err, order) => {
          order.forEach(item => {
            const portions = item.portions;
            for (let i = 0; i < portions.length; i++) {
              if (portions[i].owner !== undefined && portions[i].owner.email === data.email) {
                orders.push(item.id);
                break;
              }
            }
          });

          io.sockets.in(data.email).emit('orders', { orders });
        });
    });
  });
};
