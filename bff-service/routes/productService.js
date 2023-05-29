const router = require('express').Router();
const axios = require('axios');

router.route('/product/available').get(async (req, res) => {
  axios
    .get(`${process.env.PRODUCT_SERVICE}/product/available`)
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

router.route('/products').get(async (req, res) => {
  console.log('productService =', process.env.PRODUCT_SERVICE);
  axios
    .get(`${process.env.PRODUCT_SERVICE}/products`)
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

router.route('/products/:id').get(async (req, res) => {
  const id = req.params.id;
  axios
    .get(`${process.env.PRODUCT_SERVICE}/products/${id}`)
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

router.route('/products').post(async (req, res) => {
  const data = req.body;
  axios
    .post(`${process.env.PRODUCT_SERVICE}/products`, data)
    .then(() => {
      res.send('data is saved');
    });
});

module.exports = router;
