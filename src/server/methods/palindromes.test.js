const palindromes = require('./palindromes')

test('stored palindrome goes into storedPalindromes array', () => {
  const currentTime = Date.now()
  palindromes.storedPalindromes = [...new Array(100)].map((_, index) => (
    {
      palindrome: `submit test ${index}`, time: currentTime - Math.floor(Math.random() * 2000000),
    }
  ));
  palindromes.storePalindrome('submit test final')
  expect(
    palindromes.storedPalindromes.map(obj =>
      obj.palindrome)[palindromes.storedPalindromes.length - 1]
      === 'submit test final'
  ).toBe(true)
})

test(`'I'm an ami' returns true as palindrome`, () => {
  expect(palindromes.isPalindrome(`I'm an ami`)).resolves.toEqual(true)
})

test(`'I'm an .,$ ami' returns true as palindrome`, () => {
  expect(palindromes.isPalindrome(`I'm an     ,,...,.,,,,..,,$$ ami`)).resolves.toEqual(true)
})

test(`'Ramar' returns true as palindrome`, () => {
  expect(palindromes.isPalindrome(`Ramar`)).resolves.toEqual(true)
})

test(`'This is not a palindrome' returns false as palindrome`, () => {
  expect(palindromes.isPalindrome(`This is not a palindrome`)).resolves.toEqual(false)
})

test(`'rabbit, hat, stand, cat. fullstop' returns false as palindrome`, () => {
  expect(palindromes.isPalindrome(`rabbit, hat, stand, cat. fullstop`)).resolves.toEqual(false)
})

test('getting stored palindromes with no limit to return all stored palindromes', () => {  
  const currentTime = Date.now();
  palindromes.storedPalindromes = [...new Array(100)].map((_, index) => (
    {
      palindrome: `no limit test ${index}`, time: currentTime - Math.floor(Math.random() * 2000000),
    }
  ));
  const testStored = palindromes.storedPalindromes;
  palindromes.getStoredPalindromes()
    .then(actualStored => {
      expect(
        testStored
          .map(test => test.palindrome)
          .join('') ===
        actualStored
          .map(actual => actual.palindrome)
          .join('')
      )
      .toBe(true)
    })
    .catch(err => console.log(err))
})


test('getting storedPalindromes with limit 600000 to return stored palindromes from previous 10 minutes', () => {
  const limit = 600000
  const currentTime = Date.now();
  palindromes.storedPalindromes = [...new Array(100)].map((_, index) => (
    {
      palindrome: `limit test ${index}`, time: currentTime - Math.floor(Math.random() * 2000000),
    }
  ));
  palindromes.getStoredPalindromes(currentTime, limit)
    .then(stored => {
      expect(
        stored
          .map(test => test.palindrome)
          .join('') ===
        palindromes.storedPalindromes
          .filter(test => test.time > currentTime - limit)
          .map(actual => actual.palindrome)
          .join('')
      )
      .toBe(true)
    })
    .catch(err => console.log(err))
})
