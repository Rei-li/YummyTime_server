'use strict';

const notification = require('./notifications');
const Product = require('../models/product');
const Vendor = require('../models/vendor');
const config = require('../../config/config');
const schedule = require('node-schedule');
const request = require('request');


function getProducts(vendorId) {
  const prods = [];
  return new Promise((resolve) => {
    Product.
    find().
    exec((err, products) => {
      products.forEach(product => {
        if (product.vendor.toString() === vendorId.toString()) {
          prods.push(product);
        }
      });
      resolve(prods);
    });
  });
}

function getVendor(url) {
  return new Promise((resolve, reject) => {
    Vendor.
    findOne().
    where('url').equals(url).
    exec((err, vendor) => {
      if (vendor !== null) {
        resolve(vendor);
      } else {
        reject('vendor not found');
      }
    });
  });
}


exports.job = function() {
  const rule = new schedule.RecurrenceRule();
  rule.minute = 46;
  let integratedVendorId = null;
  schedule.scheduleJob(rule, () => {
    console.log('products update startd ', new Date());
    getVendor(config.integratedVendorUrl).then(vendor => {
      integratedVendorId = vendor._id;
      return getProducts(vendor._id);
    }).then(products => {
      request(config.menuUpdateUrl, (error, response, body) => {
        const responseProducts = JSON.parse(body);
        const updatedProducts = [];

        while (products.length !== 0) {
          const existedProduct = products.pop();
          let isRecived = false;

          for (let i = 0; i < responseProducts.length; i++) {
            if (responseProducts[i] === existedProduct.vendorId) {
              isRecived = true;
              updatedProducts.push(responseProducts[i].vendorId);
              Product.findByIdAndUpdate(existedProduct._id, {
                $set: {
                  title: responseProducts[i].title,
                  description: responseProducts[i].description,
                  image: responseProducts[i].imageUrl,
                  price: responseProducts[i].price,
                  category: responseProducts[i].category,
                  deletedByVendor: false
                }
              }, (err) => {
                if (err) {
                  console.log(err);
                }
              });
              break;
            }
          }

          if (!isRecived) {
            Product.findByIdAndUpdate(existedProduct._id, {
              $set: {
                deletedByVendor: true
              }
            }, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        }



        while (responseProducts.length !== 0) {
          const recivedProduct = responseProducts.pop();
          let isUpdated = false;

          for (let i = 0; i < updatedProducts.length; i++) {
            if (responseProducts[i].vendorId === recivedProduct.vendorId) {
              isUpdated = true;
              break;
            }
          }

          if (!isUpdated) {
            const newProduct = new Product({
              title: recivedProduct.title,
              description: recivedProduct.description,
              image: recivedProduct.imageUrl,
              price: recivedProduct.price,
              category: recivedProduct.category,
              vendorId: recivedProduct.vendorId,
              deletedByVendor: false,
              vendor: integratedVendorId
            });
            newProduct.save(err => {
              if (err) {
                console.log(err);
              }
            });
          }
        }


        console.log('products updated ', new Date());
        notification.sendEmail(config.adminEmail, 'products updated ');
      });
    });
  });
};
