var quoteContainer = document.querySelector('.container');
var quote = document.querySelector(".quote");
var author = document.querySelector(".author");
var res;
var twitterBtn = document.querySelector('#twitter');
var genQuote = document.querySelector('#genQuote');
var loader = document.querySelector('#loader');

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
const getRandomQuote = (min, max) => {
    loading();
    // Pick a random number from array length
    var randomNumber = Math.floor(Math.random() * (max - min)) + min;
    // Check if Author field is blank and replace it with 'Unknown'
    if (!res[randomNumber].author) {
        author.textContent = '- Unknown';
    } else {
        // Retrieve quote and author of that particular random number.
        author.textContent = '- ' + res[randomNumber].author;
    }
    // Check Quote length to determine styling
    if (res[randomNumber].text > 120) {
        quote.classList.add('long-quote');
    } else {
        quote.classList.remove('long-quote');
    }
    // Retrieve quote and author of that particular random number.
    // Set Quote, Hide Loader
    quote.innerText = res[randomNumber].text;
    complete();    
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      res = await response.json();
      getRandomQuote(0, res.length);
    } catch (error) {
      // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
    window.open(twitterUrl, '_blank');
}
  
// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
  
// On Load
getQuotes();