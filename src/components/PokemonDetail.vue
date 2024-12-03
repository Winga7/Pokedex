<template>
  <div
    v-if="pokemon"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    @click="$emit('close')"
  >
    <div
      class="bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">✨ {{ pokemon.name }} ✨</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl">×</button>
      </div>

      <img :src="pokemon.detailImage" :alt="pokemon.name" class="w-48 h-48 mx-auto mb-4" />

      <div class="grid gap-6">
        <!-- ID et Types -->
        <div>
          <p class="font-bold mb-2">📝 N° {{ pokemon.id }}</p>
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

        <!-- Génération -->
        <div>
          <p class="font-bold mb-2">🌟 Génération</p>
          <p>{{ pokemon.generation }}</p>
        </div>

        <!-- Talents -->
        <div>
          <p class="font-bold mb-2">💫 Talents</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="ability in pokemon.abilities"
              :key="ability"
              class="px-3 py-1 bg-gray-700 rounded-full text-sm"
            >
              {{ ability }}
            </span>
          </div>
        </div>

        <!-- Évolutions -->
        <div v-if="pokemon.evolution && pokemon.evolution.length > 0">
          <p class="font-bold mb-2">⚡ Évolutions</p>
          <div class="flex items-center gap-4 flex-wrap justify-center">
            <div class="text-center">
              <img
                :src="pokemon.image"
                :alt="pokemon.name"
                class="w-20 h-20 mx-auto"
              />
              <p class="text-sm">{{ pokemon.name }}</p>
            </div>
            <template v-for="(evo, index) in pokemon.evolution" :key="evo.name">
              <span class="text-xl">➜</span>
              <div class="text-center">
                <img
                  :src="evo.sprite"
                  :alt="evo.name"
                  class="w-20 h-20 mx-auto"
                />
                <p class="text-sm">{{ evo.name }}</p>
              </div>
            </template>
          </div>
        </div>

        <!-- Résistances -->
        <div>
          <p class="font-bold mb-2">🛡️ Résistances et Faiblesses</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div
              v-for="resistance in pokemon.resistances"
              :key="resistance.name"
              class="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg"
            >
              <img :src="resistance.image" :alt="resistance.name" class="w-5 h-5" />
              <span class="flex-1">{{ resistance.name }}</span>
              <span
                :class="{
                  'text-green-400': resistance.damage_multiplier < 1,
                  'text-red-400': resistance.damage_multiplier > 1,
                  'text-gray-400': resistance.damage_multiplier === 1
                }"
              >
                ×{{ resistance.damage_multiplier }}
              </span>
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <div>
          <p class="font-bold mb-2">📊 Statistiques</p>
          <div class="grid gap-2">
            <div v-for="(value, stat) in pokemon.stats" :key="stat" class="flex justify-between">
              <span class="capitalize">{{ formatStatName(stat) }}:</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :class="{
                      'bg-green-500': value >= 100,
                      'bg-blue-500': value < 100 && value >= 50,
                      'bg-red-500': value < 50
                    }"
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
    required: true,
  },
});

defineEmits(["close"]);

const formatStatName = (stat) => {
  return stat
    .replace("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>
