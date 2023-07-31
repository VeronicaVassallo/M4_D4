let bibliotecaAll;

function makeRequest(url) {
    return new Promise(function(resolve, reject) {
      
      const xhr = new XMLHttpRequest();
    
      xhr.open("GET", url);
  
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(new Error('Errore durante la richiesta'))
        }
      }
  
      xhr.onerror = function() {
        reject(new Error('Errore di rete'))
      }

  
      xhr.send()
      
    })

   
  }
 makeRequest('https://striveschool-api.herokuapp.com/books').then( 
    function(resolve){                                          
        bibliotecaAll = JSON.parse(resolve)                      
       console.log('Questi sono tutti i libri:', bibliotecaAll);    
       iteraBiblioteca(bibliotecaAll);                           
    },
    function(reject){
        console.log(Error);
    }
 );

 function iteraBiblioteca(){                           


        let scaffali = bibliotecaAll.map( libro =>  `
        
        <div class="card col-6 col-lg-3 text-light bg-success my-3 scaffaleSezione ${libro.asin}">
        
          
            


                <div class="" style=" border: solid 3px; height:80%">
            
                    <img src="${libro.img}" class="object-fit-cover" style="width:100%" alt="...">

                </div>


                <h5 class="card-title">${libro.title}</h5>
                <p>${libro.price}</p>
                <a id="${libro.asin}" href="#" onclick="AggiungiCarrello(this)" class="btn btn-primary m-2">Aggiungi al carrello ${libro.price} €</a>
                <a href="#" onclick="Salta(this)" class="btn btn-primary">Salta</a>
          
  
        </div> `).join("");

    let reparto = document.getElementById('scaffaleLibreria');
    reparto.innerHTML = scaffali;


    




     
    
 }

 
   //Questa funzione mi aggiunge i libri alla sezione carello in alto
   
   function AggiungiCarrello(tastoAggiungi){

    let CarrelloJ = document.getElementById('carrello');

   let libroTrovato =  bibliotecaAll.filter( libro => libro.asin === tastoAggiungi.id )[0];
   let liLibro = document.createElement('li');
   liLibro.innerHTML = `${libroTrovato.title} Prezzo: ${libroTrovato.price}€ <div class='ascoltami' onclick="eliminaLibro(this)"> <i  class="fa-regular fa-trash-can mx-5"></i> </div>`;
   
   CarrelloJ.appendChild(liLibro);
    
    tastoAggiungi.parentNode.style.border='solid 5px red';
    

 }

 //Questa funzione elimina il libro dal dalla lista del carello

 function eliminaLibro(tasto){          

tasto.parentNode.style.display='none';

//Questa funzione nasconde il libro che non mi interessa tramite il bottone salta sulla card

 }

 function Salta(tastoSalta){
  tastoSalta.parentNode.style.display='none';
 }

 //Questa funzione mi permette di filtrare i libri che mi interessano tramite il valore input che gli passo

 function CercaLibro(valore){
   console.log(bibliotecaAll);
 
   let input = document.getElementById('cerca');

   let risultati = bibliotecaAll.filter(libroRicercato => libroRicercato.title.toLowerCase().includes(input.value.toLowerCase()));
   console.log(risultati);

  let scaffaleCard = document.getElementsByClassName('scaffaleSezione');

  
let listaAsin = risultati.map(x => x.asin);


  for(let card of scaffaleCard) {

    let mostrare = false;

    for(let asin of listaAsin){
      if(card.classList.contains(asin)){
        mostrare = true;
      }
    }


    if(mostrare){
      card.classList.remove("d-none");
    }else{
      card.classList.add("d-none");
    }   
  }


 }




 
