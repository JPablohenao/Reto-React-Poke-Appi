import React, { useState } from "react";
import axios from "axios";

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [imageSource, setImageSource] = useState(undefined)
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const searchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      console.log(response);
      setPokemonData(response.data);
      setImageSource(response.data.sprites.front_default);
      console.log(response.data);
      setError("");
    }
    catch (error) {
      setPokemonData(null);
      setError("NO EXISTE ");
    }
  };

  return (
    <div>
      <input type="text" value={pokemonName} onChange={handleInputChange} />
      <button onClick={searchPokemon}> BUSCAR </button>
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          {
            imageSource && <img src={imageSource} />
          }
          <h1>Nombre:{pokemonData.name}</h1>
          <h1>Altura:{pokemonData.height}</h1>
          <h1>Peso :{pokemonData.weight}</h1>
        </div>
      )}
    </div>
  );
};

export default Pokemon;


