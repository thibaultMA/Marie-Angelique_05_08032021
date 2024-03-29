
if ( localStorage.getItem('order')!= null) {
                            // suppr alerte
  document.querySelector('#alerte').remove()
                          // order
  let order = JSON.parse(localStorage.getItem("order"));
                          // info client
  let firstName = order.contact.firstName;
  let lastName  = order.contact.lastName;
  let address   = order.contact.address;
  let city      = order.contact.city;
  let email     = order.contact.email;
                          // date commande
  let dateLs = JSON.parse(localStorage.getItem('date'))
  let date = dateLs.date

  
              // MAJ info client

  firstName =strUcFirst(firstName)
  lastName  =strUcFirst(lastName)
  address   =strUcFirst(address)
  city      =strUcFirst(city)
  
  function strUcFirst(a) {
    return (a + "").charAt(0).toUpperCase() + a.substring(1);
  }
                  // P info client
  let infoCl = document.querySelector('.infoCl')

  let CLname    = document.querySelector('#name')
  let CLemail   = document.querySelector('#email')

  let CLPrenom  = document.querySelector('#Prenom')
  let CLdate    = document.querySelector('#date')

  let CLadresse = document.createElement('span')
  let CLcity = document.createElement('span')

  CLadresse.innerHTML = `adresse : ${address} `
  CLcity.textContent = `à ${city}`

  CLname.innerHTML    = `Nom : ${firstName}` 
  CLPrenom.innerHTML  = `Prénom : ${lastName}`
  CLemail.innerHTML   = `Email : ${email}`
  CLdate.innerHTML    = `Le ${date}`

  infoCl.appendChild(CLadresse)
  infoCl.appendChild(CLcity)
  
                              // info produits
  let listeP = document.querySelector('.listeProd')
  let totFacture = []
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  let entete      = document.createElement('div')
  let titleNom    = document.createElement('p')
  let titleImage  = document.createElement('p')
  let titlePrix   = document.createElement('p')

  titleNom.textContent    = "Nom"
  titleImage.textContent  = "Image"
  titlePrix.textContent   = "Prix"

  
  titleNom.classList.add('entete')
  titleImage.classList.add('entete')
  titlePrix.classList.add('entete')

  titleNom.classList.add('prodName')
  titleImage.classList.add('imageUrl')
  titlePrix.classList.add('price')

  entete.appendChild(titleNom)
  entete.appendChild(titleImage)
  entete.appendChild(titlePrix)

  entete.classList.add('factProd')
  listeP.appendChild(entete)

  for (const produit of order.products) {
    let prodBlock = document.createElement('div')
    prodBlock.classList.add('factProd')
              // cree prod name
    let prodName = document.createElement('p')
    prodName.textContent=produit.name
    prodName.classList='prodName'
    prodBlock.appendChild(prodName)
                    // cree prod imageUrl
    let imageUrl  = document.createElement('img')
    imageUrl.src  = produit.imageUrl
    imageUrl.classList='imageUrl'
    prodBlock.appendChild(imageUrl)
                    // cree prod price

    let price = document.createElement('p')
    price.textContent = (Math.round(produit.price) /100).toFixed(2) + "€"
    price.classList="price"
    prodBlock.appendChild(price)
    totFacture.push(produit.price)


    listeP.appendChild(prodBlock)
  }
                // calcul TTC
  let reduceFact = totFacture.reduce(reducer)
  let affTot      = (reduceFact/100).toFixed(2)
  let HT  = document.querySelector('.totalHT')
  let TVA = document.querySelector('.TVAFact')
  let TTC = document.querySelector('.totalTTC')

  let calcTVA =  ((reduceFact*20/10000)).toFixed(2)
  let calcTTC = parseFloat((reduceFact/100).toFixed(2)) + parseFloat(calcTVA)

  HT.innerHTML  = "Total HT : "+ affTot+ "€"
  TVA.innerHTML = "Total TVA : "+calcTVA +"€"
  TTC.innerHTML = "Total TTC : "+ calcTTC.toFixed(2)+"€"
  
                      // n° commande
  let commande  = document.querySelector(".commande") 
  let numeroCom = document.createElement('span')
  let spanNum = document.createElement('span')

  spanNum.textContent = order.orderId
  numeroCom.innerHTML = "Facture n° : "
  
  spanNum.classList.add('span')
  numeroCom.classList.add('span')

  
  commande.insertBefore(spanNum,commande.childNodes[0])
  commande.insertBefore(numeroCom,commande.childNodes[0])
  
    
}else{
    console.log("le panier est vide");
}


