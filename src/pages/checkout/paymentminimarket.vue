<template>
  <div class="w-full h-screen px-5 pb-5 bg-gray-500">
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
        class="bg-green w-32 left-0 rounded-full text-sm text-black font-bold"
        label="back"
        @click="$router.push('/minimarket')" />
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
      <!-- <DialogModalVue :onClick="createOrder" /> -->
      <!-- <q-btn
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="payment"
        name="payment" /> -->
    </q-card-actions>

    <!-- <div>
      <h2>Selected Items:</h2>
      <ul>
        <li v-for="(selectedItem, index) in finalSelected" :key="index">
          {{ selectedItem.namaProduk }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script lang="ts">
  import { defineProps, ref } from 'vue'
  import DialogModalVue from '../../components/DialogModal.vue'
  import api from 'src/AxiosInterceptors'
  export default {
    data() {
      return {
        cart: [],
        ppn: 3950,
        servicefees: 1000,
        finalSelected: [],
        updatedCart: [],
        showUpdateButton: false,
        orderID: localStorage.getItem('orderId'),
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
      total: Number,
    },
    setup() {
      const count = ref(0)
      const decrement = () => {
        if (count.value > 0) {
          count.value--
        }
      }
      const increment = () => {
        count.value++
      }
      return {
        count,
        decrement,
        increment,
        text: ref(''),
        wa: ref(''),
        room: ref(''),
        group: ref(null),
        options: [
          { label: 'Cash', value: 'cash', name: 'cash' },
          { label: 'QRIS', value: 'qris', name: 'qris' },
          { label: 'Transfer', value: 'transfer', name: 'transfer' },
        ],
      }
    },
    components: { DialogModalVue },
    methods: {
      increm(cartItem: { namaProduk: any }) {
        const existProduct = this.finalSelected.find(
          (item) => item.namaProduk === cartItem.namaProduk
        )

        if (existProduct) {
          existProduct.qty++
        } else {
          // this.finalSelected.push(cartItem)
        }
      },
      decrem(cartItem: { namaProduk: any }) {
        const existProduct = this.finalSelected.find(
          (item) => item.namaProduk === cartItem.namaProduk
        )

        if (existProduct) {
          if (existProduct.qty > 1) {
            existProduct.qty--
          } else {
            existProduct.qty = 0
            existProduct.selected = false
          }
        }

        console.log(this.finalSelected)
      },
      getQuantity(cartItem: { namaProduk: any }) {
        const existProduct = this.finalSelected.find(
          (item) => item.namaProduk === cartItem.namaProduk
        )
        return existProduct ? existProduct.qty : 0
      },
      getCartFromLocalStorage() {
        const cartString = localStorage.getItem('cart')
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
              // this.checkoutData = response.data.data
              // this.ppn = response.data.data.ppn
              // this.fees = response.data.data.fees
              // this.total = response.data.data.total
              // this.length = response.data.data.orderDetails.length
              // this.sub = response.data.data.subtotal
              // console.log(this.length)

              localStorage.setItem('cart', JSON.stringify(this.updatedCart))
              window.location.reload()
              this.finalSelected = []

              console.log(this.updatedCart)

              localStorage.setItem('orderId', response.data.data.id)
              // console.log(this.checkoutData)
              console.log(this.finalSelected)
              // this.showUpdateButton = true
            })
            .catch((error) => {
              console.error('Error creating order:', error)
            })

          // fetch('http://localhost:8080/order/create', {
          //   method: 'POST',
          //   body: JSON.stringify({ items: [{ serviceId: 1, qty: 2 }] }),
          //   headers: {
          //     accept: 'application/json',
          //     'Content-Type': 'application/json',
          //   },
          // })
        } catch (error) {
          console.error('Unexpected error:', error)
        }
      },

      updateOrder() {
        const orderId = localStorage.getItem('orderId')
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
        return !!this.orderID
      },
      subTotal() {
        var subCost = 0
        for (var items in this.finalSelected) {
          var individualItem = this.finalSelected[items]
          subCost += individualItem.qty * individualItem.hargaProduk
        }

        return subCost
      },
      grandTotal() {
        return this.subTotal + this.ppn + this.servicefees
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

<style lang="scss" scoped></style>
