<script lang="ts">
  import axios from 'axios'
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
          const response = await api.get('/services/2', {
            withCredentials: true,
          })
          console.log('Response status:', response.status)
          console.log('Response data:', response.data)
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
        const existingCart = JSON.parse(localStorage.getItem('cartFood') || '[]')

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

        localStorage.setItem('cartFood', JSON.stringify(existingCart))
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
