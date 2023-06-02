const router = require('express').Router();
const axios = require('axios');

router.route('/import').get(async (req, res) => {
  const headers = req.headers;

  axios({
    method: 'GET',
    url: `${process.env.IMPORT_SERVICE}/import`,
    params: {
      name: req.query.name,
    },
    headers: {
      Authorization: headers.authorization,
    },
  })
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

module.exports = router;
