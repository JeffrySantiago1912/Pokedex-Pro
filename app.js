 //Accedemos al div que esta en html
const pokemonContainer = document.querySelector(".pokemon-container");



//Accedemos al id del elemento spinner que esta en html
const spinner = document.querySelector("#spinner");



//Acedemos al id del elemento li en html
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");


//Variasbles para controlar la llamada a los pokemos por paginas
let offset = 1;
let limit = 9;



//Evento de cargar los pokemones de atras
previous.addEventListener("click", () => {
  if(offset != 1){                                   //Si offset es diferente de 1, retornar error porque no puede haber un pokemon con id 0
    offset -= 9;                                    //Cada vez que le demos atras le quitamos 9 elementos, osea 9 pokemons
     removeChildNodes(pokemonContainer);           //Eliminara el contenedor de pokemon y volvera al anterior cuando se llame Feacthpokemons
       fetchPokemonsss(offset, limit);            //Llamamos los nuevos pokemos 
  }
});



//Evento de cargar los pokemones de alante
next.addEventListener("click", () => {
  offset +=9 ;                                //Cada vez que le demos adelante le añadimos los 9 elementos, osea 9 pokemons
    removeChildNodes(pokemonContainer);      //Eliminara el contenedor de pokemon y continuara al siuiente cuando se llame Feacthpokemons
      fetchPokemonsss(offset, limit);       //Llamamos los nuevos pokemos 
})




//Traer los pokemon desde la api
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)           //Traemos el link del pokeApi//
    .then((respuesta) => respuesta.json())                     //Obtenemos respuesta
     .then((dato) => crearPokemons(dato));                    //Para mostrarlo en consola y ver si trae los daotos "console.log(dato))"//
      spinner.style.display = "none"                         //Cada vez que llamamos a fetchPokemon vamos a esconder el spinner    
}




//Traer los primeros 9 pokedex
function fetchPokemonsss(offset, limit) {                    //Limita la traida de los pokemons//
  spinner.style.display = "block"                           //Cada vez que cargamos los 9 nuevos pokemons cargara el spinner 
      for(let i = offset; i < offset + limit; i++){        //Sumamos el offset y el limit//
        fetchPokemon(i);                                  // i, estara iterando hasta los primeros 9 pokemons
      }
}




//Crear pokemones
function crearPokemons(pokemon) {

  //Flicard
  const fliCard = document.createElement("div");
   fliCard.classList.add("flip-card");



  //Flicard contenedor
  const cardContainer = document.createElement("div");
   cardContainer.classList.add("card-container");



  //Le agregamos el flicard al Contenedorflip
  fliCard.appendChild(cardContainer);



  //Creamos la tarjeta que contendra el pokemon - Añadimos una clase de pokemon block
    const card = document.createElement("div"); 
     card.classList.add("pokemon-block"); 



    //Creamos el contenedor de la imagen - Contenedor de la imagen
    const spriteContainer = document.createElement("div");
     spriteContainer.classList.add("img-container"); 



    //Creamos la imagen - Url donde esta la imagen que esta en la api y se ve de frente la imagen
    const sprite = document.createElement("img"); 
     sprite.src = pokemon.sprites.front_default   



    //Entramos la imagen en su contenedor
    spriteContainer.appendChild(sprite); 



    //Creamos el numero del pokemon -- Agregamos esto para que se añadan los pokemones con 3 digitos como id = 101, añade 2 ceros al principio 
    const number = document.createElement("p");  
     number.textContent = `#${pokemon.id.toString().padStart(3,0)}` 



    //Creamos otro parrafo - Añadimos una clase - Añadir esta propiedad del pokemon
    const name = document.createElement("p"); 
     name.classList.add("name") 
      name.textContent = pokemon.name 



    //Agregamos todos esos datos a las cartas - Primero la imagen - Luego el numero - Luego el nombre
    card.appendChild(spriteContainer); 
     card.appendChild(number);  
      card.appendChild(name); 



    //Parte atras de la carta
    const cardBack = document.createElement("div");
     cardBack.classList.add("pokemon-block-back");
    


    cardBack.appendChild(progressBars(pokemon.stats));    //LLamamos a las estadisticas del pokemon
    


    cardContainer.appendChild(card);              //Añadir la carta al contenedor
     cardContainer.appendChild(cardBack);        //Añadir la carta de atras al contenedor
      pokemonContainer.appendChild(fliCard);    //Añadir la carta giratoria
 }




 //Barras de la carta trasera
 function progressBars(stats) {

  const statsContainer = document.createElement("div");
   statsContainer.classList.add("stats-container");



   //Pasaremos las caracteristicas del pokemon
   for (let i = 0; i < 3; i++) {
    const stat = stats[i];



    const statPercent = stat.base_stat / 2 + "%";   //Esta propieda se saca del array  que contiene la api de los pokemons



    const statContainer = document.createElement("stat-container"); //Creando elemento html
      statContainer.classList.add("stat-container"); //Añadiendo clase al div//



    const statName = document.createElement("p"); //Creando elemento html
      statName.textContent = stat.stat.name; //Accediedo a otra propiedad



    const progress = document.createElement("div"); //Barra de progreso
      progress.classList.add("progress"); //Estas son clases de Boostrap



    const progressBar = document.createElement("div"); //Barra de progreso
      progressBar.classList.add("progress-bar");//Estas son clases de Boostrap
 


    //Para mostrar las barras bien, estas clases vienen de Bosstrap//
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
     progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 200);
       progressBar.style.width = statPercent;



    progressBar.textContent = stat.base_stat; //Añadir informacion dentro de la barra

    

    progress.appendChild(progressBar);                   //Le añadimos el progressbar al progress
     statContainer.appendChild(statName);               //Le añadimos el statname al contenedor
      statContainer.appendChild(progress);             //Le añadimos el progress al contenedor
       statsContainer.appendChild(statContainer);     //Añadimos el otroContenedor en el contenedor original
   }



   return statsContainer; //Regresamos el statsContainer
 }


//Funcion para remover todos los elementos dentro de un elemento// mientras en el contenedor haya tarjetas, quitarlas.
 function removeChildNodes(parent) {
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
 }

 
 //Llamamos el metodo//
 fetchPokemonsss(offset,limit);