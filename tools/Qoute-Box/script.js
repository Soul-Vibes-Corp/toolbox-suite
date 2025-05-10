import React, { useState } from 'react';

// Array of quotes
const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "What we think, we become.",
    author: "Buddha"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  }
];

const App = () => {
  // Use state to store the current quote and author
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  // Function to fetch a new random quote
  const fetchNewQuote = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(newQuote);
  };

  // Function to generate the tweet URL
  const getTweetLink = () => {
    const tweetText = `"${quote.text}" - ${quote.author}`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  };

  return (
    <div id="quote-box" className="container">"{container}"</div>
      <div id="text" className="quote-text">"{quote.text}"</div>
      <div id="author" className="quote-author">- {quote.author}</div>
      <div className="buttons">
        <button id="new-quote" className="btn btn-primary" onClick={fetchNewQuote}>
          New Quote
        </button>
        <a href={getTweetLink()} id="tweet-quote" className="btn btn-info" target="_blank" rel="noopener noreferrer">
          Tweet Quote
        </a>
      </div>
    </div>
  );
};

export default App;
