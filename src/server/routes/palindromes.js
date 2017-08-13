const express = require('express');
const palindromes = require('../methods').palindromes
const router = express.Router();

router.get('/submit/:value', (req, res) => {
  const { value } = req.params;
  palindromes.isPalindrome(value)
    .then(result => {      
      if(result) {
        palindromes.storePalindrome(value)
        return true;
      }
      return false;
    })
    .then(palindrome => res.json({ palindrome, value }))
    .catch(error => res.status(500).json({ error }));
})

router.get('/stored', (req, res) => {
  const { time, limit } = req.query;
  palindromes.getStoredPalindromes(time, limit)
    .then(palindromes => res.json(palindromes))
    .catch(error => res.status(500).json({ error }));
})

module.exports = router;
