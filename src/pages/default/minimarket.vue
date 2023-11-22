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
        cardData: [
          {
            gambarProduk: 'crash.jpg',
            namaProduk: 'Bakso Baghdad',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: 20000,
          },
          {
            gambarProduk: 'crash.jpg',
            namaProduk: 'Bakso Bogor',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: 20000,
          },
          {
            gambarProduk: 'crash.jpg',
            namaProduk: 'Bakso Bagong',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: 20000,
          },
          {
            gambarProduk: 'crash.jpg',
            namaProduk: 'Bakso arab',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: 20000,
          },
        ],
        price: 0,
        data: [] as { name: string; price: number; desc: string; picture: string }[],
      }
    },
    mounted() {
      this.getDataFromApi()
    },
    setup(props, { emit }) {
      const count = ref(0)
      const hargaProduk = ref(0)
      // const decrement = () => {
      //   if (count.value > 0) {
      //     count.value--
      //     // defineEmits('quantityChanged', count.value)
      //     // emit('quantityChanged', count.value * hargaProduk.value)
      //   }
      // }

      // const increment = () => {
      //   count.value++
      //   // defineEmits('quantityChanged', count.value)
      //   // emit('quantityChanged', count.value * parseFloat(hargaProduk.value))
      // }

      return {
        count,
        // decrement,
        // increment,
      }
    },
    methods: {
      async getDataFromApi() {
        try {
          const response = await api.get('/services/1', {
            withCredentials: true,
          })
          console.log(response.data)
          this.data = response.data.data
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      },
      updateTotalPrice(value: any) {
        console.log(value)
        this.price = value
        this.$emit('total', value)
      },

      // saveCartToLocalStorage() {
      //   if (localStorage.getItem('cart') === null) {
      //     localStorage.setItem('cart', JSON.stringify([]))
      //   }
      // },
      // addToCart(card: any) {
      //   const existingProduct = this.cart.findIndex((item) => item.namaProduk === card.namaProduk)

      //   if (existingProduct === -1) {
      //     // Item does not exist in the cart, add it
      //     this.cart.push({
      //       namaProduk: card.namaProduk,
      //       hargaProduk: card.hargaProduk,
      //       gambarProduk: card.gambarProduk,
      //       qty: 1,
      //     })
      //   } else {
      //     // Item already exists in the cart, increment quantity
      //     this.cart[existingProduct].qty += 1
      //   }
      //   this.submit.push(this.cart)
      //   // localStorage.setItem('cart', JSON.stringify(this.cart))

      //   console.log(this.cart)
      //   console.log(this.cartLocal)
      // },
      addToCart(card: any) {
        const existingProductIndex = this.cart.findIndex((item) => item.namaProduk === card.title)

        if (existingProductIndex === -1) {
          // If the product is not in the cart, add a new entry
          this.cart.push({
            namaProduk: card.name,
            hargaProduk: card.price,
            gambarProduk: card.picture,
            qty: 1,
          })
        } else {
          // If the product is already in the cart, update the quantity
          this.cart[existingProductIndex].qty += 1
        }

        // Save the updated cart to localStorage
        this.saveCartToLocalStorage()

        console.log(this.cart)
      },

      saveCartToLocalStorage() {
        // Retrieve the existing cart from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')

        // Update the existing cart with the current cart from the component
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

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(existingCart))
      },
      increment(card: any) {
        const existingProduct = this.cart.find((item) => item.namaProduk === card.namaProduk)

        if (existingProduct) {
          existingProduct.qty++ // Increase the quantity for the specific product card in the cart
        } else {
          this.addToCart(card) // If the product is not in the cart, add it to the cart
        }
        console.log('halo')
      },
      // decrement(card: any) {
      //   const existingProduct = this.cart.find((item) => item.namaProduk === card.namaProduk)

      //   if (existingProduct) {
      //     if (existingProduct.qty >= 0) {
      //       existingProduct.qty-- // Decrease the quantity for the specific product card in the cart
      //       // if (existingProduct.qty === 0) {
      //       //   this.cart.splice(this.cart.indexOf(card), 1)
      //       // }
      //     }
      //   }
      // },
      removeFromCart(card: any) {
        this.cart = this.cart.filter((item) => item.namaProduk !== card.namaProduk)
      },
      decrement(card: any) {
        const existingProduct = this.cart.find((item) => item.namaProduk === card.namaProduk)

        if (existingProduct) {
          if (existingProduct.qty > 1) {
            existingProduct.qty-- // Decrease the quantity for the specific product card in the cart
          } else {
            this.removeFromCart(card) // If the quantity reaches zero, remove the product from the cart
          }
        }
      },
      getQuantity(card: any) {
        const cartItem = this.cart.find((item) => item.namaProduk === card.namaProduk)
        return cartItem ? cartItem.qty : 0
      },
    },
    // mounted() {
    //   this.saveCartToLocalStorage(), localStorage.setItem('cart', JSON.stringify(this.submit))
    // },
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

        <!-- <q-card class="card my-card text-white p-3">
            <q-card-section horizontal class="flex justify-around">
              <div class="tulisan my-auto">
                <div class="text-md pb-1 font-bold">{{ card.namaProduk }}</div>
                <div class="text-xs text-justify">
                  {{ card.descProduk }}
                </div>
                <div class="flex flex-row items-center justify-between">
                  <div class="text-sm">
                    {{ card.hargaProduk }}
                  </div>

                  <q-card-actions>
                    <q-btn
                      @click="decrement(card)"
                      class="border-[#16A75C] text-black border-2"
                      round
                      color="white"
                      icon="remove"
                      size="sm" />

                    <p class="mx-1 px-2">{{ getQuantity(card) }}</p>
                    <q-btn
                      @click="increment(card)"
                      class="border-[#16A75C] text-black border-2"
                      round
                      color="white"
                      icon="add"
                      size="sm" />
                  </q-card-actions>
                </div>
                <q-card-actions>
                  <q-btn
                    class="bg-green w-32 rounded-full text-sm text-black font-bold"
                    label="Send"
                    name="send"
                    @click="addToCart(card)" />
                </q-card-actions>
              </div>
              <q-img :src="`/src/assets/img/${card.gambarProduk}`" class="col-4" ratio="1" />
            </q-card-section>
          </q-card> -->
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
