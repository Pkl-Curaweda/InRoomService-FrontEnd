<template>
  <div class="w-full h-full px-5 pb-5 bg-gray-500">
    <!-- Produk -->
    <div class="w-full flex justify-end">
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
    </div>
    <div v-for="(cartItem, index) in cart" :key="index">
      <div>
        <input
          type="checkbox"
          v-model="cartItem.selected"
          @change="updateFinalSelected(cartItem)" />
        <h1 class="text-lg text-white font-bold m-0">{{ cartItem.namaProduk }}</h1>
        <div class="flex flex-row justify-around">
          <q-img :src="`${cartItem.gambarProduk}`" alt="gambaritems" class="w-36 h-36" />
          <q-card-actions>
            <q-btn
              @click="decrem(cartItem)"
              class="border-[#16A75C] text-black border-2"
              round
              color="white"
              icon="remove"
              size="sm" />
            <p class="mx-1 px-2">{{ getQuantity(cartItem) }}</p>
            <q-btn
              @click="increm(cartItem)"
              class="border-[#16A75C] text-black border-2"
              round
              color="white"
              icon="add"
              size="sm" />
          </q-card-actions>
        </div>
      </div>

      <!-- HARGA -->
      <q-item>
        <q-item-section class="text-white">
          <q-item-label>Rp. {{ cartItem.hargaProduk }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <!-- Deskripsi Harga -->
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label class="text-white"
          >Subtotal Order ({{ finalSelected.length }} menu)</q-item-label
        >
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ subTotal }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label class="text-white">PPN</q-item-label>
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ ppn }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label class="text-white">Service Fees</q-item-label>
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ servicefees }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label class="font-bold text-white">TOTAL</q-item-label>
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ grandTotal }}</q-item-label>
      </q-item-section>
    </q-item>
    <!-- Pembayaran -->
    <div class="q-pa-md -mt-5">
      <q-item-label class="my-1 text-white">Change Options</q-item-label>
      <q-option-group :options="options" type="radio" v-model="group" class="text-white" />
    </div>

    <!-- Whatsapp  Number-->
    <div class="q-pa-md max-w-full -mt-5">
      <q-item-label class="my-1 text-white">Whatsapp Number</q-item-label>
      <q-input v-model="wa" filled name="whatsappNumber" bg-color="white" />
    </div>
    <!-- Name -->
    <div class="q-pa-md max-w-full -mt-5">
      <q-item-label class="my-1 text-white">Your Note *</q-item-label>
      <q-input v-model="text" filled name="fullName" bg-color="white" type="textarea" />
    </div>

    <q-card-actions class="flex justify-around">
      <q-btn
        class="bg-green w-32 left-0 rounded-full text-sm text-black font-bold"
        label="back"
        @click="$router.push('/minimarket')" />
      <DialogModalVue :onClick="createOrder" />
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
      updateFinalSelected(cartItem: { selected: any }) {
        if (cartItem.selected) {
          this.finalSelected.push(cartItem)
        } else {
          const index = this.finalSelected.findIndex((item) => item === cartItem)
          if (index !== -1) {
            this.finalSelected.splice(index, 1)
          }
        }

        console.log(this.finalSelected)
      },

      createOrder() {
        const data = new FormData()

        data.append('roomId', this.room)
        data.append('subtotal', this.subTotal)

        try {
          api
            .post('/order/create', data, {
              withCredentials: true,
            })
            .then((response) => {
              console.log(response.data)
            })
        } catch (error) {
          console.error(error)
        }
      },
    },
    computed: {
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
  }
</script>

<style lang="scss" scoped></style>
