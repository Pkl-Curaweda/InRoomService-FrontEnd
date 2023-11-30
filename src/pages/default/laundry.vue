<script lang="ts">
  import CardUser from 'src/components/CardUser.vue'
  import { defineProps, ref, defineEmits, toRef } from 'vue'
  import api from 'src/AxiosInterceptors'
  export default {
    components: {
      CardUser,
    },

    data() {
      return {
        cart: [] as {
          namaProduk: string
          hargaProduk: number
          gambarProduk: string
          qty: number
        }[],
        data: [] as { name: string; price: number; desc: string; picture: string }[],
        price: 0,
      }
    },
    mounted() {
      this.getAPI()
    },
    setup(props, { emit }) {
      const count = ref(0)

      return {
        count,
      }
    },
    methods: {
      async getAPI() {
        try {
          const response = await api.get('/services/3', {
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

      saveCartToLocalStorage() {
        const existingCart = JSON.parse(localStorage.getItem('cartLaundry') || '[]')
        for (const newItem of this.cart) {
          const existingProductIndex = existingCart.findIndex(
            (item: { namaProduk: string }) => item.namaProduk === newItem.namaProduk
          )

          if (existingProductIndex === -1) {
            // If the product is not in the existing cart, add a new entry
            existingCart.push({ ...newItem })
          } else {
            // If the product is already in the existing cart, update the quantity
            // existingCart[existingProductIndex].qty += newItem.qty
            console.log('item sudah ada')
          }
        }
        localStorage.setItem('cartLaundry', JSON.stringify(existingCart))
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

      getQuantity(card: any) {
        const cartItem = this.cart.find((item) => item.namaProduk === card.namaProduk)
        return cartItem ? cartItem.qty : 0
      },
    },
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
  <div class="h-full overflow-y-scroll scrollhide justify-center items-center mt-5">
    <div class="flex flex-col gap-4 items-center">
      <p class="hidden">{{ subTotal }}</p>
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
