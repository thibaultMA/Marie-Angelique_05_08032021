// add panier
const btnsAjout = document.querySelectorAll("#ajoutPanier");
const btnsDel = document.querySelectorAll("#delete");

const total = document.getElementById("totalPanier");
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// add Prod
const nameProds = document.querySelectorAll(".name");
const prix = document.querySelectorAll("p.prix span");
const imgProds = document.querySelectorAll(".imgProd");
const ID = document.URL.replace('http://localhost:3000/',"");

let quantity = 0;

// *****************************************************************************************************************************
let paniers = [];

for (let i = 0; i < btnsAjout.length; i++) {
  const btnAjout = btnsAjout[i];
  const btnDel = btnsDel[i];
  //                                      prods
  const nameProd = nameProds[i].innerText;
  const imgProd = imgProds[i].currentSrc;
  const price = parseFloat(prix[i].innerText);

  let prod = [nameProd, imgProd, price, quantity]; /* produits */

            // quantity dinamique
  if (localStorage.getItem(nameProd) != null) {
    quantity = JSON.parse(localStorage.getItem(nameProd))[3]
  }
  // *****************************************************************************************************************************
  //                        ajout
  var ajjST = () => {
    //  add prod


    quantity++;
    prod = [nameProd, imgProd, price, quantity,ID];
    prodJson = JSON.stringify(prod);
    localStorage.setItem(nameProd, prodJson);
    //   add panier
    paniers.push(price);
    localStorage.setItem("panier", JSON.stringify(paniers));
    let panier = paniers.reduce(reducer);
    //    push total
    total.innerHTML = "total: " + panier + " €";
  };
  // ************************************************************
  //                    suppresion
  var dellST = () => {

    quantity--;

    if (quantity <= 0) {
      quantity = 0;
      prod = [nameProd, imgProd, price, quantity,ID];
      prodJson = JSON.stringify(prod);
      localStorage.setItem(nameProd, prodJson);
    } else {
      prod = [nameProd, imgProd, price, quantity,ID];
      prodJson = JSON.stringify(prod);

      localStorage.setItem(nameProd, prodJson);
    }

    //    push total
    var del = paniers.indexOf(price);
    if (del !== -1) {
      paniers.splice(del, 1);
      localStorage.setItem("panier", JSON.stringify(paniers));
      if (paniers.length === 0) {
        total.innerHTML = "total: " + 0 + " €";
      } else {
        let panier = paniers.reduce(reducer);
        total.innerHTML = "total: " + panier + " €";
      }
    }

  };
  //************************************************************
  //                    loading page
  var totPanier = () => {
    if (localStorage.getItem("panier")) {
      paniers = JSON.parse(localStorage.getItem("panier"));
      if (paniers.length === 0) {
        total.innerHTML = "total: " + 0 + " €";
      } else {
        let panier = paniers.reduce(reducer);
        total.innerHTML = "total: " + panier + " €";
      }
      let produitPanier = JSON.parse(localStorage.getItem(nameProd));
      if (produitPanier === true) {
        if (produitPanier[3] !== 0) {
          quantity = produitPanier[3];
        }
      }
      
    }
    document.title = "Orinoco | " +document.querySelector('h2.name').innerHTML
  };
  //************************************************************
  //                    start
  window.onload = totPanier();
  btnAjout.addEventListener("click", ajjST);
  
  btnDel.addEventListener("click", dellST);
  
}
//************************************************************
//************************************************************
