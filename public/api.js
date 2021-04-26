                                      // add panier
const btnsAjout = document.querySelectorAll("#ajoutPanier");
const btnsDel = document.querySelectorAll("#delete")

const total = document.getElementById('totalPanier')
const reducer = (accumulator, currentValue) => accumulator + currentValue;

                                      // add Prod
const nameProds = document.querySelectorAll('.name')
const prix = document.querySelectorAll("p.prix span");
const imgProds = document.querySelectorAll('.imgProd')
              
for (let i = 0; i < btnsAjout.length; i++) {
//   const btnAjout = btnsAjout[i];
//   const btnDel = btnsDel[i]

//   const price = parseInt(prix[i].innerHTML)

//   let getPrix = []
// // *************************************************
   
//  // *************************************************
//     function testou(e){
//       value.push(price)
//       calcul = value.reduce(reducer)
//       localStorage.setItem('prix',value)
//       getPrix = localStorage.getItem('prix')
//       // console.log(getPrix);  
//       console.log(parseInt(getPrix));
//       total.innerHTML = 'total: '+ getPrix+ " €"  
//     }
//     // *************************************************
//     function second(e) {
//       if(calcul > 0){   
        
//           const sup = value.indexOf(price)
//         console.log(sup);
//         console.log(value);
//           if(sup !== -1){         /* s'il detecte un nbr dans la chaine */
//             value.splice(sup,1)
            
//             if(value.length === 0){         /* si value est vide */
//               localStorage.setItem('prix',value)
             
//               total.innerHTML = 'total: '+ 0+ " €"

//             }else if(value.length>0){       /* si value est remplie */

//               localStorage.setItem('prix',value)

//               getPrix = localStorage.getItem('prix')   

//               total.innerHTML = 'total: '+ getPrix+ " €" 
//             }
//           }
//         }
//        else{
//           localStorage.setItem('prix',value)
//         console.log(value + "ici");
//           total.innerHTML = 'total: '+ 0+ " €" 
//         }
      
//     }

    
//   btnAjout.addEventListener('click',testou)
//   btnDel.addEventListener('click',second)
}

// *****************************************************************************************************************************


for (let i = 0; i < btnsAjout.length; i++) {
  const btnAjout = btnsAjout[i]
  const btnDel = btnsDel[i]
  //                                      prods
  const nameProd = nameProds[i].innerText
  const imgProd = imgProds[i].currentSrc
  const price = parseFloat(prix[i].innerText)
  // console.log(btnDel.parentElement.children);
const quantity = 0
  const prod = [nameProd,imgProd,price,quantity]    /* produits */
  console.log(prod);

  var ajj=()=>{
    quantity++
    localStorage.setItem(nameProd , prod)
    console.log(nameProd);
  }
  var dell=()=>{
    localStorage.removeItem(nameProd , prod)
    console.log("del");
  }

  btnAjout.addEventListener('click',ajj)
  btnDel.addEventListener('click',dell)
}


