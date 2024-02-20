<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useQuery} from '@vue/apollo-composable'
import CharacterModal from "@/components/CharacterModal.vue";
import {graphql} from "@/__generated__/gql";

const page = ref(1);
const showMore = ref(false);
const currentCharacter = ref(null)

const {result, loading, refetch} = useQuery(
    graphql(`query Characters ($page: Int!) {
    characters (page: $page) {
      results {
        id
        name
        image
      }
    }
  }`),
    {
      page: page.value
    }
)

watch(page, () => {refetch({page: page.value});}, {immediate: true});
const characters = computed(() => result.value?.characters ? result.value.characters.results : [])


</script>

<template>
  <div class="flex flex-wrap justify-center pb-24">
    <div v-for="character in characters" :key="character.id"
         class="m-4 cursor-pointer hover:opacity-80 hover:scale-125 transition-transform flex flex-col items-center justify-center"
         @click="showMore = !showMore; currentCharacter = character.id">
      <img :src="character.image" :alt="character.name" class="rounded-full h-32 w-32">
      <span class="text-center max-w-32 text-white p-2 rounded-lg mt-1 bg-emerald-700">
        {{ character.name }}
      </span>
    </div>
    <CharacterModal :character_id="currentCharacter" v-if="showMore" @close="showMore = false"/>

    <div v-if="characters.length === 0" class="text-center">
      <p>Chargement...</p>
    </div>

    <div class="pagination flex justify-center fixed bottom-0 w-screen p-4  gap-2">
      <button class="rounded bg-emerald-700 text-white p-2 w-32 hover:bg-emerald-800"
              v-if="page > 1" @click="page--">Précédent
      </button>
      <button class="rounded bg-emerald-700 text-white p-2 w-32 hover:bg-emerald-800"
              @click="page++">Suivant
      </button>
    </div>
  </div>
</template>

