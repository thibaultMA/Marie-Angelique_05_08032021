// add panier
const btnsAjout = document.querySelectorAll("#ajoutPanier");
const select    = document.querySelector("#select")
//        total panier
const total   = document.getElementById("totalPanier");
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// add Prod
const nameProds = document.querySelectorAll(".name");
const prix      = document.querySelectorAll("p.prix span");
const imgProds  = document.querySelectorAll(".imgProd");
const ID        = document.URL.replace('http://localhost:3000/',"");

let quantity = select.selectedIndex +1;

// *****************************************************************************************************************************
let paniers = [];

for (let i = 0; i < btnsAjout.length; i++) {
  const btnAjout = btnsAjout[i];
  //                                      prods
  const nameProd  = nameProds[i].innerText;
  const imgProd   = imgProds[i].currentSrc;
  const price     = parseFloat(prix[i].innerText);

  let prod = [nameProd, imgProd, price, quantity,ID]; /* produits */

            // quantity dinamique
  if (localStorage.getItem(nameProd) != null) {
    quantity = JSON.parse(localStorage.getItem(nameProd))[3]
  }
  // *****************************************************************************************************************************
  //                        ajout
  var ajjST = () => {
    //  add prod

    prod      = [nameProd, imgProd, price, quantity,ID];
    prodJson  = JSON.stringify(prod);
    localStorage.setItem(nameProd, prodJson);
    //   add panier
    const totProd = JSON.parse(localStorage[nameProd]);
    paniers.push(totProd[2]*totProd[3])

    let prixPanier = paniers.reduce(reducer)
    //    push total
    total.innerHTML = "total: " + prixPanier + " €";
    window.location.href = '/panier'
  };

  //************************************************************
  //                    loading page
  var totPanier = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const u = localStorage.key(i);
  
      if (u != "panier" && u != "order" && u!="date") {
        const totProd = JSON.parse(localStorage[u]);
        paniers.push(totProd[2]*totProd[3])
      }
    }  
    if (paniers.length != 0) {
      let prixPanier = paniers.reduce(reducer)
    console.log(prixPanier);
    total.innerHTML = "total: " + prixPanier + " €";
    }
    
    document.title = "Orinoco | " +document.querySelector('h2.name').innerHTML
  };
  //************************************************************
  //                    start
  window.onload = totPanier();
  btnAjout.addEventListener("click", ajjST);
  
  select.addEventListener('change',()=>{
    quantity  = select.selectedIndex +1
    prod      = [nameProd, imgProd, price, quantity,ID];
    localStorage.setItem(nameProd,JSON.stringify(prod))
   })
}
                      // fin boule btn
    // options select
    document.querySelectorAll('.options')[0].setAttribute('selected',"true") 

//************************************************************