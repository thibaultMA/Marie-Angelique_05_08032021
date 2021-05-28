const express = require("express");
const path = require("path");
// ********************************
const request = require("request");
var url = require("url");
var bodyParser = require("body-parser");

// ********************************
const cameraRoutes = require("./routes/camera");
const teddyRoutes = require("./routes/teddy");
const furnitureRoutes = require("./routes/furniture");


const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/cameras", cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);

// ***************************************************************************************
app.use(bodyParser.urlencoded({ extended: true }));

var options = {
  url: "http://localhost:3000/api/cameras/",
  method: "GET",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "utf-8",
  },
};

app.use(express.static("public"));

app.set("view engine", "ejs");

request(options, function (err, res, body) {
  var produits = JSON.parse(body);
  const ID = []
  for (let i = 0; i < produits.length; i++) {

    const produit = produits[i]
    const produitZero =   produits[0]; 
    const produitUn =     produits[1];
    const produitDeux =   produits[2];
    const produitTrois =  produits[3];
    const produitQuatre = produits[4]; 

   ID.push(produits[i]._id)

     
    app.get("/", function (req, res) {
      res.render("accueil", { produits});
      
    })
    
    app.get("/:ID", function (req, res) {
      var page = url.parse(req.url).pathname;
      res.render("produit" , {page,ID ,produit, produitZero,produitUn,produitDeux,produitTrois,produitQuatre});
    })
    
  }  
});

app.get("/panier", function (req, res) {
  res.render("panier");
})

app.get('/facture',function (req, res) {
  res.render("facture")
})

// ***************************************************************************************

module.exports = app;


