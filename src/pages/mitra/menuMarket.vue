<script lang="ts">
  import { defineProps, ref, defineEmits, toRef } from 'vue'

  export default {
    components: {},

    data() {
      return {
        cart: [] as { namaProduk: string; hargaProduk: number; qty: number }[],
        cardData: [
          {
            gambarProduk: 'example.png',
            namaProduk: 'Betadine',
            descProduk: '5ml',
            hargaProduk: 20000,
          },
          {
            gambarProduk: 'example.png',
            namaProduk: 'Betadine',
            descProduk: '5ml',
            hargaProduk: 20000,
          },

          {
            gambarProduk: 'example.png',
            namaProduk: 'Betadine',
            descProduk: '5ml',
            hargaProduk: 20000,
          },

          {
            gambarProduk: 'example.png',
            namaProduk: 'Betadine',
            descProduk: '5ml',
            hargaProduk: 20000,
          },

          {
            gambarProduk: 'example.png',
            namaProduk: 'Betadine',
            descProduk: '5ml',
            hargaProduk: 20000,
          },
        ],
        price: 0,
      }
    },
  }
</script>
<template>
  <div class="h-screen">
    <div class="sticky flex justify-end w-full px-2 pb-20 gap-2 z-10 bg-transparent">
      <q-btn unelevated rounded color="green" label="Edit" class="px-8 font-bold" />
      <q-btn unelevated rounded color="green" label="Upload" class="px-8 font-bold" />
    </div>

    <div class="max-h-screen overflow-scroll custom-scrollbar">
      <div class="flex flex-col gap-4 items-center">
        <div v-for="(card, index) in cardData" :key="index">
          <q-card class="card my-card text-white p-3 w-[380px]">
            <q-card-section horizontal class="flex justify-between">
              <div class="tulisan">
                <div class="text-md pb-1 font-bold">{{ card.namaProduk }}</div>
                <div class="text-xs text-justify">
                  {{ card.descProduk }}
                </div>
                <div class="flex flex-row items-center justify-between">
                  <div class="text-sm">
                    {{ card.hargaProduk }}
                  </div>
                </div>
              </div>
              <q-img :src="`/src/assets/img/${card.gambarProduk}`" class="col-4" ratio="1" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .card {
    background-color: rgba(153, 153, 153, 0.92);
  }
  .custom-scrollbar {
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: transparent transparent; /* Firefox */
    overflow: -moz-scrollbars-none; /* Firefox */
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px; /* Safari and Chrome */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent; /* Safari and Chrome */
  }
</style>
