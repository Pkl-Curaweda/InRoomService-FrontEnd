<script lang="ts">
  import axios from 'axios'
  import CardUser from 'src/components/CardUser.vue'
  import { defineProps, ref, defineEmits, toRef } from 'vue'
  import api from 'src/AxiosInterceptors'
  import { useQuasar } from 'quasar'
  export default {
    components: {
      CardUser,
    },

    data() {
      return {
        cart: [] as {
          serviceId: number
          namaProduk: string
          hargaProduk: number
          gambarProduk: string
          qty: number
        }[],
        price: 0,
        data: [] as { name: string; price: number; desc: string; picture: string }[],
        searchQuery: '',
        currPage: 1,
        totalPages: 1,
      }
    },
    mounted() {
      this.getDataFromApi()
    },
    setup(props, { emit }) {
      const count = ref(0)
      const $q = useQuasar()
      return {
        addNotif() {
          $q.notify({
            message: 'Item Added to Cart',
            color: 'green',
            position: 'top',
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
                handler: () => {
                  /* ... */
                },
              },
            ],
          })
        },
        existNotif() {
          $q.notify({
            message: 'Item Already Added',
            color: 'green',
            position: 'top',
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
                handler: () => {
                  /* ... */
                },
              },
            ],
          })
        },
        count,
      }
    },
    methods: {
      async getDataFromApi() {
        try {
          const response = await api.get('/services/2', {
            params: { search: this.searchQuery },
            withCredentials: true,
          })
          // console.log('Response status:', response.status)
          // console.log('Response data:', response.data)
          // console.log(response.data)
          this.data = response.data.data.data
          this.totalPages = response.data.data.meta.lastPage
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      },
      updateTotalPrice(value: any) {
        console.log(value)
        this.price = value
        this.$emit('total', value)
      },
      async goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
          this.currPage = page
          this.getDataFromApi()
        }
      },
      async goToNextPage() {
        this.goToPage(this.currPage + 1)
      },
      async goToPrevPage() {
        this.goToPage(this.currPage - 1)
      },

      addToCart(card: any) {
        const existingProductIndex = this.cart.findIndex((item) => item.serviceId === card.id)

        if (existingProductIndex === -1) {
          this.cart.push({
            serviceId: card.id,
            namaProduk: card.name,
            hargaProduk: card.price,
            gambarProduk: card.picture,
            qty: 1,
          })
          this.addNotif()
        } else {
          this.existNotif()
          this.cart[existingProductIndex].qty += 1
        }

        this.saveCartToLocalStorage()
        console.log(this.cart)
      },

      saveCartToLocalStorage() {
        const existingCart = JSON.parse(localStorage.getItem('cartFood') || '[]')

        for (const newItem of this.cart) {
          const existingProductIndex = existingCart.findIndex(
            (item: { serviceId: number }) => item.serviceId === newItem.serviceId
          )

          if (existingProductIndex === -1) {
            existingCart.push({ ...newItem })
          } else {
            console.log('item sudah ada')
          }
        }

        localStorage.setItem('cartFood', JSON.stringify(existingCart))
      },
      getQuantity(card: any) {
        const cartItem = this.cart.find((item) => item.namaProduk === card.namaProduk)
        return cartItem ? cartItem.qty : 0
      },
      estimated() {
        if (this.$route.path === '/minimarket') {
          this.$router.push('/estimated/minimarket')
        } else if (this.$route.path === '/foodbeverage') {
          this.$router.push('/estimated/foodbeverage')
        } else if (this.$route.path === '/laundry') {
          this.$router.push('/estimated/laundry')
        }
      },

      checkout() {
        if (this.$route.path === '/minimarket') {
          this.$router.push('/checkout/minimarket')
        } else if (this.$route.path === '/foodbeverage') {
          this.$router.push('/checkout/foodbeverage')
        } else if (this.$route.path === '/laundry') {
          this.$router.push('/checkout/laundry')
        }
      },
    },
    computed: {
      filteredData() {
        const lowerCaseFilter = this.searchQuery.toLocaleLowerCase()
        return this.data.filter((item) => item.name.toLocaleLowerCase().includes(lowerCaseFilter))
      },
      subTotal() {
        var subCost = 0
        for (var items in this.cart) {
          var individiualItem = this.cart[items]
          subCost += individiualItem.qty * individiualItem.hargaProduk

          this.$emit('total', subCost)
        }
        return subCost
      },
    },
  }
</script>

<template>
  <q-toolbar class="flex flex-col w-screen">
    <div class="flex items-center gap-2 flex-row">
      <q-btn dense flat round icon="timeline" @click="estimated()" class="text-white" />
      <q-btn dense flat round icon="person" @click="$router.push('/profile')" class="text-white" />
      <q-btn dense flat round icon="shopping_cart" @click="checkout()" class="text-white" />

      <q-input
        outlined
        v-model="searchQuery"
        label="Search"
        for="search"
        type="search"
        @update:model-value="getDataFromApi()"
        color="dark w-full"
        bg-color="white"
        class="w-56 sm:w-80 md:w-96">
        <template v-slot:append class="">
          <q-btn dense flat icon="search" color="green" rounded />
        </template>
      </q-input>
    </div>
    <div
      active-color="white"
      style="font-size: 16px"
      class="flex flex-row items-center mt-6 flex-nowrap">
      <div class="flex items-start gap-2 flex-nowrap">
        <q-btn class="text-white my-auto" label="1" color="green" rounded></q-btn>
        <div class="flex flex-col items-start">
          <p>Add to Cart</p>
          <p class="text-gray-400 text-sm">Choose Your Item</p>
        </div>
      </div>

      <div
        class="h-[2px] w-12 mx-2 bg-[#20A95A] rounded-2xl border-2 border-[#20A95A] z-10 shadow-md"></div>

      <div class="flex items-start gap-2 flex-nowrap">
        <q-btn
          class="text-gray-400 my-auto"
          label="2"
          @click="checkout()"
          color="dark"
          text-color="grey-13"
          rounded></q-btn>
        <div class="flex flex-col items-start">
          <p class="text-gray-400">Checkout</p>
          <p class="text-gray-400 text-sm">To Make Payment</p>
        </div>
      </div>
    </div>
  </q-toolbar>
  <div
    v-if="data && data.length > 0"
    class="h-[550px] overflow-y-scroll scrollhide justify-center items-center">
    <div class="flex flex-col gap-4 items-center">
      <div v-for="(card, index) in data" :key="index" class="mx-auto w-screen px-5">
        <CardUser
          :gambarProduk="`${card.picture}`"
          :namaProduk="card.name"
          :descProduk="card.desc"
          :hargaProduk="card.price"
          @quantityChanged="updateTotalPrice"
          :onClick="() => addToCart(card)"
          class="mx-auto" />
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
  </div>
  <div
    v-else-if="data && data.length === 0 && searchQuery.length > 0"
    class="h-[550px] overflow-y-scroll flex flex-col items-center px-5">
    <h1 class="text-3xl">Check your query</h1>
    <h3 class="text-2xl text-center">No matching results found for '{{ searchQuery }}'.</h3>
  </div>
  <div v-else class="h-[550px] overflow-y-scroll px-5">
    <h1 class="text-3xl">Something Wrong</h1>
    <h3 class="text-2xl text-center">Please, try again later.</h3>
  </div>
</template>

<style scoped>
  .card {
    background-color: rgba(153, 153, 153, 0.92);
  }

  .scrollhide::-webkit-scrollbar {
    width: 0px;
  }
</style>
