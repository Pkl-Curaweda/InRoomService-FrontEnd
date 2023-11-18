<script lang="ts">
  // import { defineProps, ref, defineEmits, toRef } from 'vue'
  import { useRouter } from 'vue-router'
  import CardMitra from 'src/components/CardMitra.vue'
  export default {
    components: { CardMitra },

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
    setup(props) {
      const navigate = useRouter()
      return { navigate }
    },
    methods: {
      edit() {
        this.$router.push('/mitra/edit')
      },
    },
  }
</script>
<template>
  <div class="m-auto h-full overflow-scroll">
    <div class="flex justify-end p-2 w-full">
      <q-btn
        @click="navigate.push('/mitra/upload')"
        unelevated
        size="sm"
        rounded
        padding="sm"
        color="green"
        class="px-8 font-semibold flex justify-center items-center text-semibold"
        ><q-icon name="o_add" class="mr-5 w-2 items-center h-full" />
        <span class="font-bold">Upload</span>
      </q-btn>
    </div>
    <div class="max-h-xl overflow-scroll custom-scrollbar text-lg mt-10">
      <div class="block w-full gap-4 items-center">
        <div v-for="(card, index) in cardData" :key="index">
          <card-mitra
            :nama-produk="card.namaProduk"
            :desc-produk="card.descProduk"
            :harga-produk="card.hargaProduk"
            :gambar-produk="card.gambarProduk"
            :onClick="edit" />
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
