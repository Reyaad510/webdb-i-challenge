const express = require('express');

const server = express();

const Accounts = require('./data/accounts-model');

server.use(express.json());


// Read - Obtain accounts

server.get('/', async (req, res) => {
    try {
        const accounts = await Accounts.find();
        res.status(200).json(accounts);
    } catch(err) {
        console.log(err);
    }
  });


  server.post('/', async (req, res) => {
      try {
          if(!req.body.name || !req.body.budget) { 
           res.status(500).json({ error: "Please fill in a name and budget!" });   
          } else {
              const account = await Accounts.add(req.body);
              res.status(201).json(account);
          }

      } catch(err) {
          console.log(err);
      }
  })





  



module.exports = server;