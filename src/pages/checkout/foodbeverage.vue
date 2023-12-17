<template>
  <div class="w-full h-full overflow-y-scroll px-5 pb-5 bg-gray-500" v-if="cart && cart.length > 0">
    <q-btn
      class="bg-green left-0 rounded-full text-sm text-black font-bold"
      icon="arrow_back"
      @click="$router.push('/foodbeverage')" />
    <!-- Produk -->
    <!-- <div class="w-full flex justify-end">
      <div>
        <p class="text-white">Room</p>
        <q-input
          v-model="room"
          filled
          name="room"
          bg-color="white"
          type="number"
          class="outline-none w-12"
          min="1" />
      </div>
    </div> -->
    <div v-for="(cartItem, index) in cart" :key="index">
      <div>
        <div class="flex gap-4">
          <input
            type="checkbox"
            v-model="cartItem.selected"
            @change="updateFinalSelected(cartItem)" />
          <h1 class="text-lg text-white font-bold m-0">{{ cartItem.namaProduk }}</h1>
        </div>
        <div class="flex flex-row justify-around">
          <q-img :src="`${cartItem.gambarProduk}`" alt="gambaritems" class="w-36 h-36" />
        </div>
      </div>

      <!-- HARGA -->
      <q-item>
        <q-item-section class="text-white">
          <q-item-label>Rp. {{ cartItem.hargaProduk }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <q-card-actions class="flex justify-around">
      <q-btn
        v-if="!orderIdExists && !showUpdateButton"
        @click="createOrder"
        no-caps
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="Checkout" />
      <q-btn
        v-if="orderIdExists || showUpdateButton"
        @click="updateOrder"
        no-caps
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="Update Checkout" />
      <q-btn
        v-if="orderIdExists || showUpdateButton"
        @click="navigate.push('/payment')"
        no-caps
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="Next" />
    </q-card-actions>
  </div>

  <div
    v-else
    class="w-full h-full bg-gray-500 flex flex-col gap-4 justify-center items-center text-white">
    <h1 class="text-3xl">Item Not Found</h1>
    <h3 class="text-2xl text-center">Please, add item into cart before you checkout it.</h3>
    <q-btn
      no-caps
      label="Back"
      color="green"
      class="text-white my-5"
      @click="navigate.push('/foodbeverage')" />
  </div>
</template>

<script lang="ts">
  import { defineProps, ref } from 'vue'
  import DialogModalVue from '../../components/DialogModal.vue'
  import api from 'src/AxiosInterceptors'
  import { useRouter } from 'vue-router'
  export default {
    data() {
      return {
        cart: [],
        finalSelected: [],
        updatedCart: [],
        showUpdateButton: false,
        orderId: localStorage.getItem('orderFoodId'),
      }
    },
    mounted() {
      this.getCartFromLocalStorage()
    },
    props: {
      items: String,
      gambaritems: String,
      hargaitems: String,
      subtotal: Number,
      ppn: Number,
      servicefees: Number,
      total: Number,
    },
    setup() {
      const navigate = useRouter()

      return {
        navigate,
        text: ref(''),
        wa: ref(''),
        room: ref(''),
      }
    },
    components: { DialogModalVue },
    methods: {
      getCartFromLocalStorage() {
        const cartString = localStorage.getItem('cartFood')
        if (cartString) {
          this.cart = JSON.parse(cartString)
        } else {
          this.cart = []
        }
      },
      updateFinalSelected(cartItem: never) {
        const { serviceId, qty } = cartItem
        if (cartItem.selected) {
          // this.finalSelected.push(cartItem)

          this.finalSelected.push({ serviceId, qty })
          this.updatedCart = this.cart.filter(
            (item) =>
              !this.finalSelected.some((selectedItem) => selectedItem.serviceId === item.serviceId)
          )
        } else {
          const index = this.finalSelected.findIndex((item) => item === cartItem)
          if (index !== -1) {
            this.finalSelected.splice(index, 1)
          }
          this.updatedCart = this.cart
        }

        const orderId = localStorage.getItem('orderId')
        // if (orderId) {
        //   // this.updatedCart = this.cart.map((item) => ({ ...item, selected: false }))
        //   if (cartItem.selected) {
        //     this.updatedCart = this.cart.filter(
        //       (item) =>
        //         !this.finalSelected.some(
        //           (selectedItem) => selectedItem.serviceId === item.serviceId
        //         )
        //     )
        //   } else {
        //     this.updatedCart = this.cart
        //   }
        // }

        console.log(this.updatedCart)
        console.log(this.finalSelected)
      },

      createOrder() {
        try {
          api
            .post(
              '/order/create',
              { items: this.finalSelected },
              {
                withCredentials: true,
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((response) => {
              localStorage.setItem('cartFood', JSON.stringify(this.updatedCart))
              window.location.reload()
              this.finalSelected = []

              console.log(this.updatedCart)

              localStorage.setItem('orderFoodId', response.data.data.id)
              console.log(this.finalSelected)
            })
            .catch((error) => {
              console.error('Error creating order:', error)
            })
        } catch (error) {
          console.error('Unexpected error:', error)
        }
      },

      updateOrder() {
        const orderId = localStorage.getItem('orderFoodId')
        try {
          api
            .put(
              `/order/update/newItem/${orderId}`,
              { items: this.finalSelected },
              {
                withCredentials: true,
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((response) => {
              localStorage.setItem('cart', JSON.stringify(this.updatedCart))
              this.finalSelected = []
              window.location.reload()

              console.log(response)
            })
        } catch (error) {
          console.error(error)
        }
      },
    },
    computed: {
      orderIdExists() {
        return !!this.orderId
      },
    },
    created() {
      // Automatically show the Update button if orderId exists in localStorage
      if (this.orderIdExists) {
        this.showUpdateButton = true
      }
    },
  }
</script>

<style lang="scss">
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
