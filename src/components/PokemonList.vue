<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
    <div
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      class="card bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      @click="selectPokemon(pokemon)"
    >
      <h2 class="text-lg font-bold text-center mb-2">{{ pokemon.name.fr }}</h2>
      <img :src="pokemon.sprites.regular" alt="Sprite" class="pokemon-sprite w-24 h-24 mx-auto rounded-full border-2 border-pink-500" />
    </div>
  </div>
  <PokemonDetail v-if="selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPokemons } from '../services/pokemonService';
import PokemonDetail from './PokemonDetail.vue';

const pokemons = ref([]);
const selectedPokemon = ref(null);

onMounted(async () => {
  pokemons.value = await getPokemons();
});

const selectPokemon = (pokemon) => {
  selectedPokemon.value = pokemon;
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
  border: 1px solid #444;
  background-color: #2d2d2d;
}
.card:hover {
  transform: scale(1.05);
}
.pokemon-sprite {
  max-width: 100%;
  height: auto;
}
</style>
