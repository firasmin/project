const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const productcontroller=require('../controller/production')
const router = express.Router();

router.get('/',productcontroller.getproduct);

module.exports = router;
