<script setup lang="ts">
import {useQuery} from "@vue/apollo-composable";
import {graphql} from "@/__generated__";
import {computed} from "vue";
import {Character} from "@/__generated__/graphql";

const props = defineProps({
  character_id: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['close'])
const {result, loading, error} = useQuery(graphql(`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        name
        air_date
        episode
      }
    }
  }
`), {
  id: props.character_id
})
const character = computed(() => result.value?.character ? result.value.character as Character : null)
</script>

<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-gray-50 bg-opacity-50 flex justify-center items-center ">
    <div v-if="result" class="bg-emerald-500 p-4 rounded-lg flex flex-col items-center justify-center">
      <div class="bg-emerald-500 p-4 rounded-lg flex-col flex items-center">
        <h2 class="text-2xl font-bold">{{ character.name }}</h2>
        <img :src="character.image" :alt="character.name" class="rounded-full h-32 w-32">
        <span class="text-lg font-bold mt-4 p-1 rounded-lg"
              :class="character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'">
          {{ character.status === 'Alive' ? 'Vivant' : 'Mort' }}
        </span>
        <span>
          Origine: {{ character.origin.name }}
        </span>
        <p class="font-bold text-lg mt-4">
          {{ character.name }} est un {{ character.species }} de sexe {{ character.gender }}
        </p>
      </div>
      <div class="flex flex-col gap-2 justify-between w-full overflow-y-scroll max-h-32 py-2 mt-2 ">
        <h3 class="text-xl font-bold">Episodes</h3>
        <div class="flex flex-row gap-2 justify-between items-center w-full "
             v-for="ep in character.episode" :key="ep.name">
          <span>{{ ep.name }} - {{ ep.air_date }}</span>
        </div>
      </div>
      <div>
        <button @click="emit('close')" class="bg-red-500 text-white p-2 rounded-lg mt-4">Fermer</button>
      </div>
    </div>
    <div v-else class="fixed top-0 left-0 w-screen h-screen bg-gray-50 bg-opacity-50 flex justify-center items-center">
      <div class="bg-emerald-500 p-4 rounded-lg">
        <p class="text-white text-3xl">Chargement...</p>
      </div>
    </div>
  </div>

</template>
