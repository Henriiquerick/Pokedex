//Intial instructions
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

//Forms
const formResult = document.querySelector('.form');
const inputResult = document.querySelector('.input_search');

//Buttons
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

//Initial pokemon
let searchPokemon = 1;

//get ID of the pokemon and return this
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
};
//result of fetchPokemon and return pokemon into API
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);
    if(data)
    {pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    inputResult.value = '';
    searchPokemon = data.id;}
    else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }
}
//Inicialization of site
renderPokemon(searchPokemon);

//Confirm button enter to return a sprite and pokemon name or number
formResult.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputResult.value.toLowerCase());
});

//Previous button
buttonPrev.addEventListener('click', (event) => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } else{
        searchPokemon = 649;
    }
});
//Next button
buttonNext.addEventListener('click', (event) => {
    if(searchPokemon < 649){
        searchPokemon =+ searchPokemon + 1;
        renderPokemon(searchPokemon);
    } else{
        searchPokemon = 1;
    }
});
//Uptadet By @Henriiquerick
