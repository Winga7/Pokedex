<script setup>
import PokemonList from "./components/PokemonList.vue";
</script>

<template>
  <header class="flex items-center justify-center bg-gray-900 p-4">
    <img alt="Pokédex" src="./assets/pokedex.png" width="150" height="150" />
    <h1 class="text-3xl text-white ml-4">Bienvenue dans le Pokédex !</h1>
  </header>
  <main>
    <PokemonList />
  </main>
</template>


