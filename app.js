const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser')

var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}

app.get('/', (req, res) => {
  res.send('{"forbidden": "Nothing here"}', 403)
})

/*app.get('/user/:id', (req, res) => {
  if(!fs.existsSync(`./database/users/${req.params.id}.json`)) {
    return res.send("User not found", 404)
  } else {
    fs.readFile(`./database/users/${req.params.id}.json`, (err, ctn) => {
      let info = JSON.parse(ctn)
      res.send(info, 200)
    })
  }
})

app.get('/user/update/:id', (req, res) => {
  if(!fs.existsSync(`./database/users/${req.params.id}.json`)) {
    return res.send("User not found", 404)
  } else {
    return res.send("Not in use atm", 500)
  }
})

app.post('/user/add/:id', (req, res) => {
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
})*/

app.get('/server/:id', (req, res) => {
  if(!fs.existsSync(`./database/servers/${req.params.id}.json`)) {
    return res.send("Server not found", 403)
  } else {
    fs.readFile(`./database/servers/${req.params.id}.json`, 'UTF-8', (err, ctn) => {
      let server_info = JSON.parse(ctn)
      return res.send(server_info, 200)
    })
  }
})

app.post('/server/add/:id', (req, res) => {
  if(fs.existsSync(`./database/servers/${req.params.id}.json`)) {
    return res.send("Server already exists", 500)
  } else {
    let server_info = JSON.stringify(req.body, null, 2)
    fs.writeFile(`./database/servers/${req.params.id}.json`, server_info, (err) => {
      if (err) {
        return res.send("Error creating new server", 501)
      } else {
        return res.send("Server created successfully", 200)
      }
    })
  }
})

app.post('/server/edit/:id', (req, res) => {
  if(!fs.existsSync(`./database/servers/${req.params.id}.json`)) {
    return res.send("Server not found", 404)
  } else {
    fs.readFile(`./database/servers/${req.params.id}.json`, 'UTF-8', (err, ctn) => {
      let old_server_info = JSON.parse(ctn)
      let updated_server_info_obj = extend(old_server_info, req.body)
      let updated_server_info = JSON.stringify(updated_server_info_obj, null, 2)
      fs.writeFile(`./database/servers/${req.params.id}.json`, updated_server_info, (err) => {
        if (err) {
          return res.send("Error updating server", 501)
        } else {
          return res.send("Server updated successfully", 200)
        }
      })
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
