import React, { Component, PropTypes } from 'react';
import styles from './styles';

const apiBaseUrl = `http://localhost:3000/api/`;
const timeLimit = 600000;
const quantityWanted = 10;

export default class Root extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      lastSubmission: null,
      submitError: null,
      getStoredError: null,
      currentTime: Date.now(),
      palindromesRequested: false,
      storedPalindromes: [],
    }
  }

  componentDidMount() {
    setInterval(() => this.setState({
      currentTime: Date.now(),
    }), 1000)
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  submitToService = (type) => {
    const { inputValue } = this.state;
    if(inputValue.length > 0) {
      this.setState({ submitErrorEmpty: false });
      fetch(`${apiBaseUrl}${type}/submit/${inputValue}`)
        .then(result => result.json())
        .then(lastSubmission =>
          lastSubmission.error ?
          this.setState({ submitError: lastSubmission.error }) :
          this.setState({ lastSubmission, submitError: null }, () =>
            lastSubmission.palindrome ? this.retrieveFromService(type) : null
          )
        )
        .catch(submitError => this.setState({ submitError }))
    } else {
      this.setState({ submitErrorEmpty: true });
    }
  }

  retrieveFromService = (type) => {
    const { currentTime } = this.state;
    fetch(`${apiBaseUrl}${type}/stored/?time=${currentTime}&limit=${timeLimit}`)
      .then(result => result.json())
      .then(storedPalindromes =>
        storedPalindromes.error ?
        this.setState({
          getStoredError: storedPalindromes.error,
        }) :
        this.setState({
          storedPalindromes: storedPalindromes.sort((a, b) => b.time - a.time).slice(0, quantityWanted),
          palindromesRequested: true,
        })
      )
      .catch(getStoredError => this.setState({ getStoredError }))
  }

  render() {
    const {
      inputValue,
      lastSubmission,
      submitError,
      submitErrorEmpty,
      getStoredError,
      currentTime,
      storedPalindromes,
      palindromesRequested,
    } = this.state;
    console.log(lastSubmission);
    return (
      <div id="root-container" style={styles.container}>
        <input
          style={styles.input}
          value={inputValue}
          onChange={this.handleChange}
          placeholder={'Please type palindrome'}
        />
        <button
          style={styles.submitButton}
          onClick={() => this.submitToService('palindromes')}
        >
          Submit
        </button>
        {
          lastSubmission ?
          <div style={styles.result}>
            {
              `${lastSubmission.palindrome ? `Congratulations, ` : `Sorry, `}
               ${lastSubmission.value}
               ${lastSubmission.palindrome ? `is a palindrome!` : `is not a palindrome`}`
            }
          </div> :
          <div style={styles.result}>Enter text above and submit to test whether a Palindrome</div>
        }
        {
          submitError ?
          <div style={styles.errorResult}>Apologies, there was a submission error</div> :
          null
        }
        {
          submitErrorEmpty ?
          <div style={styles.errorResult}>Please add some text before submitting</div> :
          null
        }
        <button
          style={styles.getStoredButton}
          onClick={() => this.retrieveFromService('palindromes')}
        >
          Get most recent {quantityWanted} palindromes stored since {new Date(currentTime - timeLimit).toString().slice(0, 31)}
        </button>
        {
          palindromesRequested ? <h2>{quantityWanted} most recent Palindromes since {new Date(currentTime - timeLimit).toString().slice(0, 31)}</h2> : null
        }
        {
          storedPalindromes.length === 0 && palindromesRequested ?
          <div>No palindromes stored since {new Date(currentTime - timeLimit).toString().slice(0, 31)}</div> :
          null
        }
        {
          storedPalindromes.length > 0 && palindromesRequested ?
            storedPalindromes.map(stored => (
              stored.time > currentTime - timeLimit ?
              <div style={styles.palindrome}>
                <div style={styles.palindromeText}>Palindrome: {stored.palindrome}</div>
                <div style={styles.palindromeText}>Added: {new Date(stored.time).toString().slice(0, 31)}</div>
              </div> :
              null
            )) :
          null
        }
        {
          getStoredError ?
          <div style={styles.errorResult}>Apologies, there was an error retrieving stored palindromes</div> :
          null
        }
      </div>
    );
  }
}
