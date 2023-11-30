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
    },
    watch: {},
    computed: {
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
  <div class="h-full overflow-y-scroll scrollhide justify-center items-center mb-5">
    <div class="flex flex-col gap-4 items-center">
      <!-- <pembayaranModal /> -->
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
