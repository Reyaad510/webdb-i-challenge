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


  // Create - Create account with name and budget

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


  
 // Update - Edit account name and budget 

  server.put('/:id', validateAccount, validateAccountId, async (req,res) => {
      try {
        const account = await Accounts.update(req.params.id, req.body);
        if(account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({ error: "Account not found" })
        }
      } catch(err) {
          console.log(err);
      }
  })




// custom middleware 

async function validateAccountId(req, res, next) {
    try {
        const { id } = req.params;
        const account = await Accounts.findById(id);
    
        if(account) {
            req.account = account;
            next();
        } else {
            res.status(400).json({ message: "Invalid account id" })
    
        }
    } catch(err) {
        res.status(500).json({ message: 'Failed to process request' })
    }
    };
    
    function validateAccount(req, res, next) {
     if(req.body && Object.keys(req.body).length) {
         next();
     } else if(!req.body) {
         res.status(400).json({ message: "Missing user data" })
     } else if(!req.body.name){
         res.status(400).json({ message: "Missing required name field" })
     }
    };

  



module.exports = server;