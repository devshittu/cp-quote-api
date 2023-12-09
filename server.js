const express = require("express");
const morgan = require("morgan");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.json({ quote: randomQuote });
});

app.get("/api/quotes", (req, res) => {
  const { person } = req.query;
  if (person) {
    const quotesByPerson = quotes.filter((quote) => quote.person === person);
    res.json({ quotes: quotesByPerson });
  } else {
    res.json({ quotes });
  }
});

app.post("/api/quotes", (req, res) => {
  const { quote, person } = req.query;
  if (!quote || !person) {
    res.status(400).json({ error: "Both quote and person are required" });
  } else {
    const newQuote = { quote, person };
    quotes.push(newQuote);
    res.status(201).json({ quote: newQuote });
  }
});

// Add this code to set your server to listen on the PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
