/**
 * Created by alucas on 21/1/17.
 */
const  express = require("express"),
  app = express(),
  bodyParser  = require("body-parser"),
  methodOverride = require("method-override");
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
  res.send("Hello World!");
});

const json = {};


fs.readFile('./dist/iconlist.json', 'utf8', function(err, data) {
  if (err) throw err;
  json.icons = JSON.parse(data);
  fs.readFile('./dist/brandlist.json', 'utf8', function(err, data) {
    if (err) throw err;
    json.brands = JSON.parse(data);

    router.get('/API', function(req, res) {
      res.send(JSON.stringify({
        status: '200',
        msg: 'OK'
      }, null, 2));
    });

    app.use(router);

    app.listen(3000, function() {
      console.log("Node server running on http://localhost:3000");
    });
  });
});


