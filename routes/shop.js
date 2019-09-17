const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

//  GET /
router.get('/', (req, res, next) => {
  //  __dirname holds the absolute path on our OS to this project folder
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;