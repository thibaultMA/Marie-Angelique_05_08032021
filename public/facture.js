
if ( localStorage.getItem('order')!= null) {
                            // suppr alerte
    document.querySelector('#alerte').remove()
                            // order
    let order = JSON.parse(localStorage.getItem("order"));
                            // info client
    let firstName = order.contact.firstName;
    let lastName = order.contact.lastName;
    let address = order.contact.address;
    let city = order.contact.city;
    let email = order.contact.email;
                            // date commande
    let dateLs = JSON.parse(localStorage.getItem('date'))
    let date = dateLs.date
    let heure =`${dateLs.hour.heure} : `
    let minute = `${dateLs.hour.minutes}`
    let hour = heure + minute
    
                // MAJ info client

    firstName=strUcFirst(firstName)
    lastName=strUcFirst(lastName)
    address=strUcFirst(address)
    city=strUcFirst(city)
    
    function strUcFirst(a) {
      return (a + "").charAt(0).toUpperCase() + a.substring(1);
    }
                    // P info client
    let CLname = document.querySelector('#name')
    let CLemail = document.querySelector('#email')
    let CLadresse = document.querySelector('#adresse')
    let CLPrenom = document.querySelector('#Prenom')
    let CLdate = document.querySelector('#date')


    CLname.innerHTML = `"Nom : ${firstName}` 
    CLPrenom.innerHTML = ` Prenom : ${lastName}`
    CLemail.innerHTML = `email : ${email}`;
    CLadresse.innerHTML = `address : ${address} à ${city}`
    CLdate.innerHTML = `Le ${date} à ${hour}`
                                // info produits
    let listeP = document.querySelector('.listeProd')
    for (const produit of order.products) {
      
      
                // cree prod name
      let prodName = document.createElement('p')
      prodName.textContent=produit.name
      prodName.classList='prodName'
      listeP.appendChild(prodName)
                      // cree prod imageUrl
      let imageUrl = document.createElement('img')
      imageUrl.src=produit.imageUrl
      imageUrl.classList='imageUrl'
      listeP.appendChild(imageUrl)
                      // cree prod price

      let price = document.createElement('p')
      price.textContent= (Math.round(produit.price) /100).toFixed(2) + "€"
      price.classList="price"
      listeP.appendChild(price)
    }
                        // n° commande
    let commande = document.querySelector(".commande") 
    let numeroCom= document.createElement('p')
    numeroCom.textContent = "Nom de votre commande : " + order.orderId
    commande.appendChild(numeroCom)
    
}else{
    console.log("order doesn't exist");
}


