// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, (request, response) => {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    var item = storage.add(request.body.name);
    response.status(201).json(item);
  });
  
  app.delete('/items/:id', jsonParser, (request, response) => {
    var {id} = request.params;
    var error = true;
      storage.items.forEach((item, index) => {
        if (item.id == id){
          storage.items.splice(index, 1);
          error = false;
          response.status(200).json(storage.items);
        }
      });
    if (error) {
      response.status(404).json('Not a valid id');
    }
  });

app.put('/items/:id', jsonParser, (request, response) =>{
  var {id} = request.params;
  var idNonexistent = true;
  
  //test body has required properties
  if (request.body.name === undefined || request.body.id === undefined){
    return response.status(400).json('Invalid item');
  }
  
  //if the ID in the route doesn't match the ID in the body, return error
  if (request.params.id !== request.body.id) {
    return response.status(400).json('Not a valid id');
  }
  
  //if ID for request exists in storage, edit that item
  storage.items.forEach((item, index) => {
    if (item.id == id){
      storage.items[index] = request.body
      idNonexistent = false;
      response.status(200).json(item);
    }
  });
  
  //if no item with ID is created yet, create new item
  if (idNonexistent) {
    var item = storage.add(request.body.name);
    response.status(201).json(item);
  }
});

// Simple in-memory store for now
var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();


storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

// listen for requests :)
var listener = app.listen(process.env.PORT || 8080, function () {
 console.log('Your app is listening on port ' + (listener.address().port || 8080));
});

exports.app = app;
exports.storage = storage;