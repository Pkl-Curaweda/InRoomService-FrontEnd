<script lang="ts">
  // import { defineProps, ref, defineEmits, toRef } from 'vue'
  import { useRouter } from 'vue-router'
  import CardMitra from 'src/components/CardMitra.vue'
  import api from 'src/AxiosInterceptors'
  import { ref } from 'vue'

  import router from 'src/router'

  var id = 0
  export default {
    components: { CardMitra },

    data() {
      return {
        cart: [] as { namaProduk: string; hargaProduk: number; qty: number }[],

        price: 0,

        data: [] as {
          id: string
          name: string
          price: number
          desc: string
          picture: string
          serviceType: number
          typeId: number
          userId: number
        }[],
        currPage: 1,
        totalPages: 1,
      }
    },
    async mounted() {
      await this.getProfile()
      this.getData()
      // this.getDataFromApi()
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
      async getData() {
        try {
          const response = await api.get(`/services/1?page=` + this.currPage, {
            withCredentials: true,
          })

          this.data = response.data.data.data.filter(
            (item: { userId: number }) => item.userId === id
          )
          this.totalPages = response.data.data.meta.lastPage
          console.log(this.data)
        } catch (error) {
          console.error(error)
        }
      },
      async goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
          this.currPage = page
          this.getData()
        }
      },
      async goToNextPage() {
        this.goToPage(this.currPage + 1)
      },
      async goToPrevPage() {
        this.goToPage(this.currPage - 1)
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
    <div class="flex justify-between items-center p-2 px-4 w-full">
      <h3 class="font-bold">Accepted Product</h3>
      <q-btn
        @click="navigate.push('/mitra/upload')"
        unelevated
        size="sm"
        rounded
        padding="sm"
        color="green"
        class="">
        <div class="px-3 py-1 font-semibold flex justify-center items-center text-semibold">
          <q-icon name="o_add" class="mr-5" />
          <span class="font-bold">Upload</span>
        </div>
      </q-btn>
    </div>
    <div class="max-h-xl overflow-scroll custom-scrollbar text-lg mt-10">
      <div v-if="data && data.length > 0" class="block w-full gap-4 items-center">
        <div v-for="(card, index) in data" :key="index">
          <card-mitra
            :nama-produk="card.name"
            :desc-produk="card.desc"
            :harga-produk="card.price"
            :gambar-produk="card.picture"
            :onClick="card.id" />
        </div>
        <div class="flex justify-between p-2 px-4 w-full">
          <q-btn @click="goToPrevPage" unelevated size="sm" rounded padding="sm" color="green">
            <div class="px-3 font-semibold text-center">
              <span> Previous </span>
            </div>
          </q-btn>
          <q-btn @click="goToNextPage" unelevated size="sm" rounded padding="sm" color="green">
            <div class="px-3 font-semibold text-center">
              <span> Next </span>
            </div>
          </q-btn>
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
