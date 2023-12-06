<script lang="ts">
  // import { defineProps, ref, defineEmits, toRef } from 'vue'
  import { useRouter } from 'vue-router'
  import CardMitra from 'src/components/CardMitra.vue'
  import api from 'src/AxiosInterceptors'
  import { ref } from 'vue'

  import router from 'src/router'

  var id = ''
  export default {
    components: { CardMitra },

    data() {
      return {
        cart: [] as { namaProduk: string; hargaProduk: number; qty: number }[],

        price: 0,
        data: [] as {
          id: string
          title: string
          price: number
          desc: string
          picture: string
          serviceType: number
          typeId: number
        }[],
      }
    },
    async mounted() {
      await this.getProfile()
      this.getDataFromApi()
    },
    methods: {
      async getProfile() {
        try {
          const response = await api.get('/profile', { withCredentials: true })
          console.log(response.data)
          id = response.data.data.id
          console.log(id)
        } catch (error) {
          console.error(error)
        }
      },
      async getDataFromApi() {
        try {
          const response = await api.get(`/productReq/user/${id}`, {
            withCredentials: true,
          })
          console.log(response.data)
          this.data = response.data.data
        } catch (error) {
          console.error('error fetching data: ', error)
        }
      },
    },
    setup(props) {
      const navigate = useRouter()
      return { navigate }
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
      <div v-if="data && data.length > 0" class="block w-full gap-4 items-center">
        <div v-for="(card, index) in data" :key="index">
          <card-mitra
            :nama-produk="card.title"
            :desc-produk="card.desc"
            :harga-produk="card.price"
            :gambar-produk="card.picture"
            :onClick="card.id" />
        </div>
      </div>
      <div v-else>
        <p class="text-center">No Data Available</p>
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
