// NOTE ABOUT NODE-FETCH VERSION
// You can use the classic require statement if you use an older version of node-fetch
// Namely, if you have "node-fetch" : "^2.6.6"
// const fetch = require('node-fetch');

// Otherwise, do yarn add node-fetch and use the line below from their docs:
// https://www.npmjs.com/package/node-fetch

// Either way works, but makes sense to go with the new version
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

// I had to yarn build and yarn serve to get this to work
// Remember to include PORT='8080' in your .env file unless you want port 3000


// ------------------------------------------------------------
// -------------------------- Routes --------------------------
// ------------------------------------------------------------

// Related Products
app.get('/related/:id', (req, res) => {
  fetch(`${process.env.URL}/products/${req.params.id}/related`, {
    headers: {
      Authorization: process.env.GITTOKEN,
      'User-Agent': 'user',
    },
  })
    .then((response) => response.json())
    .then((results) => res.send(results));
});

// General product endpoint
app.get('/product/:id', (req, res) => {
  fetch(`${process.env.URL}/products/${req.params.id}`, {
    headers: {
      Authorization: process.env.GITTOKEN,
      'User-Agent': 'user',
    },
  })
    .then((response) => response.json())
    .then((results) => res.send(results));
});

// Style endpoint for product
app.get('/style/:id', (req, res) => {
  fetch(`${process.env.URL}/products/${req.params.id}/styles`, {
    headers: {
      Authorization: process.env.GITTOKEN,
      'User-Agent': 'user',
    },
  })
    .then((response) => response.json())
    .then((results) => res.send(results));
});

// Reviews Meta for product
app.get('/review/:id', (req, res) => {
  fetch(`${process.env.URL}/reviews/meta?product_id=${req.params.id}`, {
    headers: {
      Authorization: process.env.GITTOKEN,
      'User-Agent': 'user',
    },
  })
    .then((response) => response.json())
    .then((results) => res.send(results));
});






app.listen(port, () => {
  console.log(`Spooder listening on port ${port}`);
});