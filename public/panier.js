//          affiche panier
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const total = document.getElementById("totalPanier");
//          valide panier
const submit = document.getElementById("submit");
let paniers = JSON.parse(localStorage.getItem("panier"));


              // title
document.title = "Orinoco | Panier"
let products = []

let totTableau = []
var totPanier = () => {
  // if () {
  

                          //   debut affiche panier complet
  let tbody = document.getElementById("tbody");

  for (let i = 0; i < localStorage.length; i++) {
     
   
    const u = localStorage.key(i);
   
    if ( u != "order" && u!="date") {
      const prod = JSON.parse(localStorage[u]);

      const prodList = document.createElement("tr");

      const prodNom = prod[0];
      const prodImg = prod[1];
      const prodprix = prod[2];
      const prodQuantity = prod[3];
      const prodID = prod[4]

      totTableau.push(prodprix*prodQuantity)

      if (prodQuantity !== 0) {
        //                          nom
        const specNom = document.createElement("td");
        specNom.textContent = prodNom;
        specNom.classList.add('prodNom')
        prodList.appendChild(specNom);

        //                           Image
        const specImg = document.createElement("td");
        const creatImg = document.createElement("img");
        const imgLien = document.createElement("a")
        imgLien.setAttribute('href',`/${prodID}`)
        creatImg.src = prodImg;
        specImg.classList.add('tdImg')
        imgLien.appendChild(creatImg);
        specImg.appendChild(imgLien);
        prodList.appendChild(specImg);

        //                           prix
        const specPrix = document.createElement("td");
        specPrix.textContent = prodprix + ".00€";
        specPrix.classList.add("prodPrix")
        prodList.appendChild(specPrix);
        //                           quantity
        const specQuantity = document.createElement("td");
        const select = document.createElement("select");
        select.classList.add("select");
        for (let n = 0; n < prodQuantity + 5; n++) {
          const option = document.createElement("option");
          option.value = n;
          option.innerHTML = n;
          option.classList.add('option')
          select.appendChild(option);
        }
        specQuantity.classList.add('tdQuantite')

        select.options[prodQuantity].setAttribute("selected", true);
        specQuantity.appendChild(select);
        prodList.appendChild(specQuantity);
      }

      tbody.appendChild(prodList);
    }
  }
  //            totale panier tableau
  const totalTr = document.createElement("tr");
  const totPoint = document.createElement("td");
  const vide = document.createElement("td");
  const tot = document.createElement("td");

  totPoint.textContent = "totale de votre panier :";
  totPoint.setAttribute('colspan',"2")
    // tot panier
  tot.classList.add('totFact')
  tot.textContent = totTableau.reduce(reducer) + ".00€";

 total.innerHTML ="total: "+ totTableau.reduce(reducer)+" €"
  
  totalTr.appendChild(totPoint);
  totalTr.appendChild(tot);
  totalTr.appendChild(vide);


  tbody.appendChild(totalTr);

  //          formulaire
  //          ajout obj proucts

  
    for (let i = 0; i < localStorage.length; i++) {
    const u = localStorage.key(i);

      if ( u != "order" && u!="date") {
        const prods = JSON.parse(localStorage[u]);

        let quantity = prods[3];
        let id = prods[4];

        for (let i = 0; i < quantity; i++) {
          products.push(id);

          prods[0]--;
        }
        
      }
    }
  
  
}
// }
          //check panier



// ajout info client

const clform = document.forms[0];
const POSTFORM = document.getElementById("POSTFORM");



clform.addEventListener("submit", (e) => {
  e.preventDefault();



  var firstName = clform.firstName.value;
  var lastName = clform.lastName.value;
  var address = clform.address.value;

  var city = clform.city.value;
  var email = clform.email.value;

  

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
  })
  

                                        // POST!
  if (document.querySelector('.select')!=null) {
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
        window.location.href = "/facture"
      }
    };

    request.send(objetJson);
  } else {
    console.log("Administration : ERROR");
    let err = document.querySelector('.err')
    err.innerHTML = "Attention ! votre panier est vide."
  }
  
});




window.onload = totPanier();



if (document.querySelector('.select')!=null) {
  var selectElems = document.querySelectorAll('.select');
  for (let i = 0; i < selectElems.length; i++) {
    const selectElem = selectElems[i];
    let prodPrix = document.querySelectorAll('.prodPrix')[i].textContent
    
    let prodPrice = parseInt(prodPrix.replace(".00€",""))
    
    // totTableau.push(prodPrice)

    selectElem.addEventListener('change',()=>{
      var index = selectElem.selectedIndex;

      let prodNom=document.querySelectorAll('.prodNom');

      let prod = JSON.parse(localStorage.getItem(prodNom[i].textContent))
      
      let td = document.querySelectorAll('tr')
      
      if (index === 0) {

        localStorage.removeItem(prodNom[i].textContent)
        td[i+2].style.display = "none"
        td[i+2].remove()
        let del = totTableau.indexOf(totTableau[i])
        if (del >-1) {
          
          if (totTableau.length === 1) {
            
            totTableau.splice(0,1)
            totTableau.push(0)
            document.querySelector('.err').innerHTML="vous venez de vidé votre panier"
          }else{
          totTableau.splice(del,1)
          }
        }
        console.log(totTableau);
      }else{
        
        prod[3] = index
        localStorage.setItem(prodNom[i].textContent,JSON.stringify(prod))
        
        totTableau[i]=index * prod[2]
        
      }


      total.innerHTML ="total: "+ totTableau.reduce(reducer)+" €"
      document.querySelector('.totFact').innerHTML=totTableau.reduce(reducer)+".00€"
      
      // actu products
      products = []
      for (let i = 0; i < localStorage.length; i++) {
        const u = localStorage.key(i);
    
          if ( u != "order" && u!="date") {
            const prods = JSON.parse(localStorage[u]);
    
            let quantity = prods[3];
            let id = prods[4];
    
            for (let i = 0; i < quantity; i++) {
              products.push(id);
    
              prods[0]--;
            }
            
          }
        }
        
    })
  }
}else{
  
}
