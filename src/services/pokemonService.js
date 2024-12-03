const API_URL = "https://pokebuildapi.fr/api/v1";

export const getPokemons = async () => {
  const response = await fetch(`${API_URL}/pokemon`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des Pokémon");
  }
  const data = await response.json();
  return data.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprite,
    detailImage: pokemon.image,
    types: pokemon.apiTypes,
    stats: {
      HP: pokemon.stats.HP,
      attack: pokemon.stats.attack,
      defense: pokemon.stats.defense,
      special_attack: pokemon.stats.special_attack,
      special_defense: pokemon.stats.special_defense,
      speed: pokemon.stats.speed,
    },
    generation: pokemon.generation,
    abilities: pokemon.abilities,
    resistances: pokemon.apiResistances,
    evolution: pokemon.apiEvolutions || [],
  }));
};
