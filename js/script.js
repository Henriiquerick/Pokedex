const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const formResult = document.querySelector('.form');
const inputResult = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data
    }
}

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
        pokemonNumber.innerHTML = ''
    }
}
renderPokemon(searchPokemon);

formResult.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputResult.value.toLowerCase());
});
buttonPrev.addEventListener('click', (event) => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } else{
        searchPokemon = 649;
    }
});
buttonNext.addEventListener('click', (event) => {
    if(searchPokemon < 649){
        searchPokemon =+ searchPokemon + 1;
        renderPokemon(searchPokemon);
    } else{
        searchPokemon = 1;
    }
});

