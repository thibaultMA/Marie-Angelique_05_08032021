const express = require('express');
const path = require('path');
// ********************************
const request = require('request');
var url = require('url');
var querystring = require('querystring');

// ********************************
const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/cameras', cameraRoutes);
// app.use('/api/teddies', teddyRoutes);
// app.use('/api/furniture', furnitureRoutes);


// ***************************************************************************************
var options = {
  url: 'http://localhost:3000/api/cameras/',
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
  }
}
app.use(express.static('public'))
app.set('view engine', 'ejs');
request(options, function (err, res, body) {
  var produits = JSON.parse(body);
   for (let i = 0; i < produits.length; i++) {
     const produit = produits[i];
     
   }
    produits.forEach(element => {
      
    });
    app.get('/', function(req, res) {
    res.render('chambre', {produits});
     
})
});

// .get('/compter/:nombre', function(req, res) {
//   var noms = ['Robert', 'Jacques', 'David'];
//   res.render('chambre', {compteur: req.params.nombre, noms: noms});
// })
// .use(function(req, res, next){
//   res.setHeader('Content-Type', 'text/plain');
//   res.send(404, 'Page introuvable ! Déso pas déso.');
// })



// ***************************************************************************************

module.exports = app;
