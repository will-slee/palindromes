const express = require('express');
const palindromes = require('./palindromes');

const router = express.Router();

router.use('/palindromes', palindromes);

module.exports = router;
