const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
  res.send('{"forbidden": "Nothing here"}', 403)
})

app.get('/user/:id', (req, res) => {
  if(!fs.existsSync(`./database/users/${req.params.id}.json`)) {
    return res.send("User not found", 403)
  } else {
    return res.send("Not in use atm", 500)
  }
})

app.get('/user/update/:id', (req, res) => {
  if(!fs.existsSync(`./database/users/${req.params.id}.json`)) {
    return res.send("User not found", 403)
  } else {
    return res.send("Not in use atm", 500)
  }
})

app.get('/user/add/:id', (req, res) => {
  if(fs.existsSync(`./database/users/${req.params.id}.json`)) {
    return res.send("User already exists", 500)
  } else {
    fs.writeFile(`./database/users/${req.params.id}.json`, '{}', (err) => {
      if (err) {
        return res.send("Error creating new user", 501)
      } else {
        return res.send("User created successfully", 200)
      }
    })
  }
})

app.get('/server/:id', (req, res) => {
  if(!fs.existsSync(`./database/servers/${req.params.id}.json`)) {
    return res.send("Server not found", 403)
  } else {
    return res.send("Not in use atm", 500)
  }
})

app.get('/server/add/:id', (req, res) => {
  if(fs.existsSync(`./database/servers/${req.params.id}.json`)) {
    return res.send("Server already exists", 500)
  } else {
    fs.writeFile(`./database/servers/${req.params.id}.json`, '{}', (err) => {
      if (err) {
        return res.send("Error creating new server", 501)
      } else {
        return res.send("Server created successfully", 200)
      }
    })
  }
})

app.listen(9090, () => {
  if(fs.existsSync('./database/users/')) {
    console.log('User database exists. Continuing')
  } else {
    console.log("Making User Database")
    fs.mkdirSync('./database/users/', (err) => {if (err) console.log('Error making User database')})
  }

  if(fs.existsSync('./database/servers/')) {
    console.log('Server database exists. Continuing')
  } else {
    console.log("Making Server Database")
    fs.mkdirSync('./database/servers/', (err) => {if (err) console.log('Error making Server database')})
  }

  console.log("Ready")
})
