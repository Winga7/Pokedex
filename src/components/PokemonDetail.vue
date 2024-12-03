<template>
  <div
    v-if="pokemon"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    @click="$emit('close')"
  >
    <div
      class="bg-gray-800 p-6 rounded-lg max-w-md w-full"
      @click.stop
    >
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">{{ pokemon.name }}</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white">×</button>
      </div>

      <img :src="pokemon.image" :alt="pokemon.name" class="w-48 h-48 mx-auto mb-4" />

      <div class="grid gap-4">
        <div>
          <p class="font-bold mb-2">N° {{ pokemon.id }}</p>
          <div class="flex gap-2">
            <div
              v-for="type in pokemon.types"
              :key="type.name"
              class="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
              :style="{ backgroundColor: type.color }"
            >
              <img :src="type.image" :alt="type.name" class="w-5 h-5" />
              {{ type.name }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-bold">Taille</p>
            <p>{{ pokemon.height }} m</p>
          </div>
          <div>
            <p class="font-bold">Poids</p>
            <p>{{ pokemon.weight }} kg</p>
          </div>
        </div>

        <div>
          <p class="font-bold mb-2">Statistiques</p>
          <div class="grid gap-2">
            <div v-for="(value, stat) in pokemon.stats" :key="stat" class="flex justify-between">
              <span class="capitalize">{{ formatStatName(stat) }}:</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-blue-500 rounded-full"
                    :style="{ width: `${(value / 255) * 100}%` }"
                  ></div>
                </div>
                <span>{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

const formatStatName = (stat) => {
  return stat.replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
</script>
