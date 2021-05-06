//          affiche panier
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const total = document.getElementById("totalPanier");
//          valide panier
const submit = document.getElementById("submit");
let paniers = JSON.parse(localStorage.getItem("panier"));
let panier = paniers.reduce(reducer);

var totPanier = () => {
  if (localStorage.getItem("panier")) {
    if (paniers.length === 0) {
      total.innerHTML = "total: " + 0 + " €";
    } else {
      total.innerHTML = "total: " + panier + " €";
    }
  }

  //                          fin load
  //                          debut affiche panier complet
  let tbody = document.getElementById("tbody");

  for (let i = 0; i < localStorage.length; i++) {
    const u = localStorage.key(i);
    if (u != "panier") {
      const prod = JSON.parse(localStorage[u]);

      const prodList = document.createElement("tr");

      const prodNom = prod[0];
      const prodImg = prod[1];
      const prodprix = prod[2];
      const prodQuantity = prod[3];

      if (prodQuantity !== 0) {
        //                          nom
        const specNom = document.createElement("td");
        specNom.textContent = prodNom;
        prodList.appendChild(specNom);

        //                           Image
        const specImg = document.createElement("td");
        const creatImg = document.createElement("img");
        creatImg.src = prodImg;
        specImg.appendChild(creatImg);
        prodList.appendChild(specImg);

        //                           prix
        const specPrix = document.createElement("td");
        specPrix.textContent = prodprix + ".00€";
        prodList.appendChild(specPrix);
        //                           quantity
        const specQuantity = document.createElement("td");
        const select = document.createElement("select");
        select.classList.add("select");
        for (let n = 0; n < prodQuantity + 10; n++) {
          const option = document.createElement("option");
          option.value = n;
          option.innerHTML = n;
          select.appendChild(option);
        }

        select.options[prodQuantity].setAttribute("selected", true);
        specQuantity.appendChild(select);
        prodList.appendChild(specQuantity);
      }

      tbody.appendChild(prodList);
    }
  }
  //            totale panier formulaire
  const totalTr = document.createElement("tr");
  const totPoint = document.createElement("td");
  const vide = document.createElement("td");
  const tot = document.createElement("td");

  totPoint.textContent = "totale de vitre panier";

  tot.textContent = panier + ".00€";

  totalTr.appendChild(totPoint);
  totalTr.appendChild(vide);
  totalTr.appendChild(tot);

  tbody.appendChild(totalTr);


  //          formulaire
  //          ajout panier

  let = listeProd = [];

  for (let i = 0; i < localStorage.length; i++) {
    const u = localStorage.key(i);

    if (u != "panier") {
      const prods = JSON.parse(localStorage[u]);
      let quantity = prods[3];
      for (let i = 0; i < quantity; i++) {
        listeProd.push(prods);
        prods[3]--;
      }
      prods.pop();
    }
  }
  const inputPanier = document.getElementById("hidden");
  inputPanier.value=JSON.stringify(listeProd) 
};

// ajout info client

const clform = document.forms["po"];
var contact

clform.addEventListener("submit", (e) => {
  e.preventDefault()
  var firstName =    clform.firstName.value
  var lastName  =   clform.lastName.value
  var address   =   clform.address.value
  var city      =   clform.city.value
  var email     =   clform.email.value

  contact = {
    firstName:firstName,
    lastName:lastName  ,
    address:address    ,
    city:city          ,
    email:email        ,
  }
  // post()
  console.log(contact);

localStorage.clear()
console.log(localStorage.length);
}); 



window.onload = totPanier();
