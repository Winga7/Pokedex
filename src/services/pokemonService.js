const API_URL = "https://tyradex.vercel.app/api/v1/pokemon";

export const getPokemons = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des Pokémon");
  }
  const data = await response.json();
  return data.map((pokemon) => ({
    id: pokemon.pokedex_id,
    name: {
      fr: pokemon.name.fr,
      en: pokemon.name.en,
      ja: pokemon.name.ja,
    },
    sprites: {
      regular: pokemon.sprites.regular,
      shiny: pokemon.sprites.shiny || null,
      gmax: pokemon.sprites.gmax || null,
    },
    types: pokemon.types,
    generation: pokemon.generation,
    abilities: pokemon.abilities,
    stats: pokemon.stats,
    resistances: pokemon.resistances,
    evolution: pokemon.evolution || [],
  }));
};
