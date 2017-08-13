const palindromes = {
  isPalindrome: palindrome => new Promise((resolve, reject) => {
    palindrome = palindrome.replace(/\W/g,'').toLowerCase();
    return resolve(palindrome === palindrome.split('').reverse().join(''))
  }),
  getStoredPalindromes: (time, limit) => new Promise((resolve, reject) => {
    if(limit) resolve(palindromes.storedPalindromes.filter(palindrome => palindrome.time > time - limit))
    resolve(palindromes.storedPalindromes)
  }),
  storePalindrome: palindrome => palindromes.storedPalindromes.push({ palindrome, time: Date.now() }),
  storedPalindromes: [],
}

module.exports = palindromes;
