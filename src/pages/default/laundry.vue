<script lang="ts">
  import CardUser from 'src/components/CardUser.vue'
  import { defineProps, ref, defineEmits, toRef } from 'vue'

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
            namaProduk: 'Bakso Baghdad',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: 20000,
          },
        ],
        price: 0,
      }
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
      updateTotalPrice(value: any) {
        console.log(value)
        this.price = value
        this.$emit('total', value)
      },

      saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart))
      },

      addToCart(card: any) {
        const existingProduct = this.cart.find((item) => item.namaProduk === card.namaProduk)

        if (!existingProduct) {
          this.cart.push({
            namaProduk: card.namaProduk,
            hargaProduk: card.hargaProduk,
            gambarProduk: card.gambarProduk,
            qty: 1,
          })

          this.saveCartToLocalStorage()
        }

        console.log(this.cart)
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
      <div v-for="(card, index) in cardData" :key="index" class="mx-auto w-screen px-5">
        <CardUser
          :gambarProduk="`/src/assets/img/${card.gambarProduk}`"
          :namaProduk="card.namaProduk"
          :descProduk="card.descProduk"
          :hargaProduk="card.hargaProduk"
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