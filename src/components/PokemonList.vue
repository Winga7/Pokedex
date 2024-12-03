<template>
  <div class="p-4 bg-gray-800 text-white rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-4">🌟 Liste des Pokémon 🌟</h1>

    <div class="flex flex-col gap-4 mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher par nom ou ID..."
        class="bg-gray-700 text-white px-4 py-2 rounded-lg"
      />

      <div class="bg-gray-700 p-4 rounded-lg">
        <h3 class="font-bold mb-2">Filtrer par type</h3>
        <div class="flex flex-wrap gap-2">
          <label
            v-for="type in uniqueTypes"
            :key="type.name"
            class="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer"
            :style="{ backgroundColor: type.color }"
          >
            <input
              type="checkbox"
              :value="type.name"
              v-model="selectedTypes"
              class="rounded"
            />
            <img :src="type.image" :alt="type.name" class="w-5 h-5" />
            <span>{{ type.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-4">
      <div
        class="bg-gray-700 rounded-lg p-1 text-center cursor-pointer hover:bg-gray-600 transition-colors flex flex-col items-center aspect-square"
        v-for="pokemon in paginatedAndFilteredPokemons"
        :key="pokemon.id"
        @click="selectedPokemon = pokemon"
      >
        <div class="flex-1 flex items-center justify-center w-full p-0.5">
          <img
            :src="pokemon.image"
            :alt="pokemon.name"
            class="w-24 h-24 sm:w-28 sm:h-28 object-contain"
          />
        </div>
        <h2 class="text-xs mt-0.5 truncate w-full px-1">{{ pokemon.name }}</h2>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-2 mt-4">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-600"
      >
        Précédent
      </button>
      <span class="px-4 py-2 bg-gray-700 rounded-lg">
        Page {{ currentPage }} sur {{ totalPages }}
      </span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-600"
      >
        Suivant
      </button>
    </div>

    <PokemonDetail
      v-if="selectedPokemon"
      :pokemon="selectedPokemon"
      @close="selectedPokemon = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { getPokemons } from '../services/pokemonService';
import PokemonDetail from './PokemonDetail.vue';

const pokemons = ref([]);
const selectedPokemon = ref(null);
const searchQuery = ref('');
const selectedTypes = ref([]);
const currentPage = ref(1);
const itemsPerPage = 40;

const uniqueTypes = computed(() => {
  const typesMap = new Map();
  pokemons.value.forEach(pokemon => {
    pokemon.types.forEach(type => {
      if (!typesMap.has(type.name)) {
        typesMap.set(type.name, type);
      }
    });
  });
  return Array.from(typesMap.values());
});

const filteredPokemons = computed(() => {
  return pokemons.value.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         pokemon.id.toString().includes(searchQuery.value);
    const matchesTypes = selectedTypes.value.length === 0 ||
                        pokemon.types.some(type => selectedTypes.value.includes(type.name));
    return matchesSearch && matchesTypes;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredPokemons.value.length / itemsPerPage);
});

// Obtenir les Pokémon pour la page actuelle
const paginatedAndFilteredPokemons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPokemons.value.slice(start, end);
});

// Réinitialiser la page quand les filtres changent
watch([searchQuery, selectedTypes], () => {
  currentPage.value = 1;
});

onMounted(async () => {
  try {
    pokemons.value = await getPokemons();
  } catch (error) {
    console.error('Erreur:', error);
  }
});
</script>
