<script lang="ts">
  // import { defineProps, ref, defineEmits, toRef } from 'vue'
  import api from 'src/AxiosInterceptors'
  import { useRouter } from 'vue-router'
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
        data: [] as { name: string; price: number; desc: string; picture: string }[],
      }
    },
    setup(props) {
      const navigate = useRouter()
      return { navigate }
    },
    mounted() {
      this.getDataFromApi()
    },
    methods: {
      async getDataFromApi() {
        try {
          const response = await api.get('/productReq', {
            withCredentials: true,
          })
          console.log(response.data)
          this.data = response.data.data
        } catch (error) {
          console.error('error fetching data: ', error)
        }
      },
    },
  }
</script>
<template>
  <div class="m-auto h-full overflow-scroll">
    <div class="flex justify-end p-2 w-full">
      <q-btn
        unelevated
        size="sm"
        rounded
        padding="sm"
        color="green"
        class="px-8 font-semibold flex justify-center items-center text-semibold"
        @click="navigate.push('/mitra/upload')"
        ><q-icon name="o_add" class="mr-5 w-2 items-center h-full" />
        <span class="font-bold">Upload</span>
      </q-btn>
    </div>
    <div class="max-h-xl overflow-scroll custom-scrollbar text-lg mt-10">
      <div class="block w-full gap-4 items-center">
        <div v-for="(card, index) in cardData" :key="index">
          <q-card class="card my-card text-white p-3 w-[80%] md:w-md m-auto my-5">
            <q-card-section horizontal class="flex justify-between">
              <div class="block relative w-32">
                <div class="text-md pb-1 font-bold">{{ card.namaProduk }}</div>
                <div class="text-xs text-justify">
                  {{ card.descProduk }}
                </div>
                <div class="flex flex-row items-center justify-between mb-2">
                  <div class="text-sm">
                    {{ card.hargaProduk }}
                  </div>
                </div>
                <div class="flex">
                  <q-btn
                    size="sm"
                    rounded
                    padding="xs"
                    color="green"
                    class="sm:px-2 w-24 font-semibold items-center font-semibold sm:py-2"
                    ><q-icon name="o_edit" class="mr-5 w-2 h-2 items-center h-full" />
                    <span>Edit</span>
                  </q-btn>
                </div>
              </div>
              <q-img :src="`/src/assets/img/${card.gambarProduk}`" class="w-24" ratio="1" />
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
