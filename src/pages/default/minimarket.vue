<script lang="ts">
  import CardUser from 'src/components/CardUser.vue'
  import DialogModal from 'src/components/DialogModal.vue'
  import pembayaranModal from 'src/components/pembayaranpages1.vue'
  import { defineProps, ref, defineEmits, toRef } from 'vue'
  import axios from 'axios'
  import api from 'src/AxiosInterceptors'
  export default {
    components: {
      CardUser,
      DialogModal,
      pembayaranModal,
    },

    data() {
      return {
        cart: [] as {
          namaProduk: string
          hargaProduk: number
          gambarProduk: string
          qty: number
        }[],
        price: 0,
        data: [] as { name: string; price: number; desc: string; picture: string }[],
        search: '',
      }
    },

    setup(props, { emit }) {
      const count = ref(0)

      return {
        count,
      }
    },
    mounted() {
      this.getDataFromApi()
      this.subTotal
    },
    methods: {
      async getDataFromApi() {
        try {
          const response = await api.get('/services/1', {
            withCredentials: true,
          })
          console.log(response.data)
          this.data = response.data.data.data
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      },
      updateTotalPrice(value: any) {
        console.log(value)
        this.price = value
        this.$emit('total', value)
      },

      addToCart(card: any) {
        const existingProductIndex = this.cart.findIndex((item) => item.namaProduk === card.name)

        if (existingProductIndex === -1) {
          this.cart.push({
            namaProduk: card.name,
            hargaProduk: card.price,
            gambarProduk: card.picture,
            qty: 1,
          })
        } else {
          this.cart[existingProductIndex].qty += 1
        }

        this.saveCartToLocalStorage()

        console.log(this.cart)
      },

      saveCartToLocalStorage() {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')

        for (const newItem of this.cart) {
          const existingProductIndex = existingCart.findIndex(
            (item: { namaProduk: string }) => item.namaProduk === newItem.namaProduk
          )

          if (existingProductIndex === -1) {
            existingCart.push({ ...newItem })
          } else {
            console.log('item sudah ada')
          }
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(existingCart))
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
    watch: {},
    computed: {
      filteredData() {
        const lowerCaseFilter = this.search.toLocaleLowerCase()
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
      <q-btn dense flat round icon="person" class="text-white" />
      <q-btn dense flat round icon="shopping_cart" @click="checkout()" class="text-white" />

      <q-input
        outlined
        v-model="search"
        label="Search"
        for="search"
        type="search"
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
  <div class="h-[550px] overflow-y-scroll scrollhide justify-center items-center">
    <div class="flex flex-col gap-4 items-center">
      <!-- <pembayaranModal /> -->
      <div v-for="(card, index) in filteredData" :key="index" class="mx-auto w-screen px-5">
        <CardUser
          :gambarProduk="`${card.picture}`"
          :namaProduk="card.name"
          :descProduk="card.desc"
          :hargaProduk="card.price"
          @quantityChanged="updateTotalPrice"
          :onClick="() => addToCart(card)"
          class="mx-auto" />
      </div>
    </div>
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
