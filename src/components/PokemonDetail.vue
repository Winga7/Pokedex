<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ pokemon.name.fr }}</h2>
      <img :src="pokemon.sprites.shiny" alt="Shiny Sprite" v-if="pokemon.sprites.shiny" />
      <img :src="pokemon.sprites.gmax" alt="Gmax Sprite" v-if="pokemon.sprites.gmax" />
      <p>Types: {{ pokemon.types.join(', ') }}</p>
      <p>Génération: {{ pokemon.generation }}</p>
      <p>Capacités: {{ pokemon.abilities.join(', ') }}</p>
      <p>Statistiques: {{ JSON.stringify(pokemon.stats) }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
