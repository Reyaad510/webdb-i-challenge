const express = require('express');

const server = express();

const Accounts = require('./data/accounts-model');

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const accounts = await Accounts.find();
        res.status(200).json(accounts);
    } catch(err) {
        console.log(err);
    }
  });

module.exports = server;