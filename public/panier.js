//          affiche panier
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const total = document.getElementById("totalPanier");
//          valide panier
const submit = document.getElementById("submit");
let paniers = JSON.parse(localStorage.getItem("panier"));
let panier = 0;
if (paniers != null) {
  panier = paniers.reduce(reducer);
}
              // title
document.title = "Orinoco | Panier"
let = products = [];

var totPanier = () => {

      
  if (localStorage.getItem("panier") != null) {
    if (paniers.length === 0) {
      total.innerHTML = "total: " + 0 + " €";
    } else {
      total.innerHTML = "total: " + panier + " €";
    }
  }

                          //   fin load tot panier

                          //   debut affiche panier complet
  let tbody = document.getElementById("tbody");

  for (let i = 0; i < localStorage.length; i++) {
    const u = localStorage.key(i);
    if (u != "panier" && u != "order" && u!="date") {
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
        for (let n = 0; n < prodQuantity + 5; n++) {
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
  //          ajout obj products

  for (let i = 0; i < localStorage.length; i++) {
    const u = localStorage.key(i);

    if (u != "panier" && u != "order" && u!="date") {
      const prods = JSON.parse(localStorage[u]);

      let quantity = prods[3];
      let id = prods[4];

      for (let i = 0; i < quantity; i++) {
        products.push(id);

        prods[0]--;
      }
    }
  }
  console.log(products);
};
          //check panier
let panierCheck = products



// ajout info client

const clform = document.forms[0];
const POSTFORM = document.getElementById("POSTFORM");



clform.addEventListener("submit", (e) => {
  e.preventDefault();
  let panierCheck = products


  var firstName = clform.firstName.value;
  var lastName = clform.lastName.value;
  var address = clform.address.value;
  var city = clform.city.value;
  var email = clform.email.value;

  console.log(firstName);

  var contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };
  let body = {
    contact,
    products,
  };

  let objetJson = JSON.stringify(body);


                          // add date Ls
const date = new Date()
  let nowDate = JSON.stringify({
    date:date.toLocaleDateString(),
    hour:{
      heure:date.getHours() , minutes:date.getMinutes(),
    }
    
  })
  

                                        // POST!
  if (1 == 1) {
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json")
    request.onreadystatechange = () => {
      if (request.readyState == XMLHttpRequest.DONE) {
        console.log(request.responseText);
        localStorage.clear()
        localStorage.setItem("order", request.responseText);
              // date
        localStorage.setItem("date",nowDate);
        // window.location.href = "/facture"
      }
    };

    request.send(objetJson);
  } else {
    console.log("Administration : ERROR");
  }
  
});

window.onload = totPanier();

