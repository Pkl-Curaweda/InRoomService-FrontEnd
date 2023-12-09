<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <span class="row items-center">
        <q-icon name="arrow_back_ios" class="h-10 w-10"></q-icon>
        <p>PAYMENT</p>
      </span>
      <q-icon name="map" class="h-10 w-10"></q-icon>
    </div>
    <div class="q-px-md">
      <!-- SECTION 1 -->
      <h2 class="text-weight-bold">Delivery Order</h2>
      <q-form>
        <div class="w-3/4 bg-red-100 rounded-lg">
          <div class="row items-center justify-between px-5">
            <p class="">Reguler</p>
            <q-radio left-label v-model="deliveryOrder" val="reguler" label="5.000" />
          </div>
          <q-separator />
          <div class="row items-center justify-between px-5">
            <p class="">Premium</p>
            <q-radio left-label v-model="deliveryOrder" val="premium" />
          </div>
        </div>

        <q-separator class="q-my-lg q-mb-xs" />

        <!-- SECTION 2 -->
        <div v-for="(cartItem, index) in cart" :key="index">
          <div class="row justify-between">
            <div class="column justify-between">
              <div>
                <p class="text-weight-bold">{{ cartItem.namaProduk }}</p>
                <p>Rp. {{ cartItem.hargaProduk }}</p>
                <input
                  type="checkbox"
                  v-model="cartItem.selected"
                  @change="updateFinalSelected(cartItem)" />
              </div>
              <q-btn
                no-caps
                color="red-1"
                class="text-black mb-2"
                name="o_description"
                icon="description"
                label="Notes" />
            </div>
            <div class="column items-center">
              <q-img :src="`${cartItem.gambarProduk}`" class="bg-red-100 w-30 h-30" />
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
        </div>
        <!-- SECTION 3 -->
        <q-separator class="q-my-lg q-mb-xs" />

        <div class="column gap-2">
          <div class="row justify-between">
            <p class="text-weight text-lg">Order Subtotal ({{ finalSelected.length }} menu)</p>
            <p>Rp. {{ subTotal }}</p>
          </div>
          <div class="row justify-between">
            <p class="text-weight">Shipping costs</p>
            <p>Rp. {{ shipfees }}</p>
          </div>
          <div class="row justify-between">
            <p class="text-weight">Service Fees</p>
            <p>Rp. {{ servicefees }}</p>
          </div>
          <div class="row justify-between">
            <p class="text-weight">PPN</p>
            <p>Rp. {{ ppn }}</p>
          </div>
          <q-space />
          <div class="row justify-between">
            <p class="text-weight-bold">TOTAL</p>
            <p>Rp. {{ grandTotal }}</p>
          </div>
        </div>

        <!-- BTN PAYMENT METHOD -->
        <q-btn
          no-caps
          label="Payment Method"
          color="pink-1"
          class="text-black my-5"
          @click="dialog = true"
          icon-right="expand_more" />

        <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down">
          <q-card class="bg-primary text-white">
            <q-bar>
              <q-space />

              <q-btn
                dense
                flat
                icon="minimize"
                @click="maximizedToggle = false"
                :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn
                dense
                flat
                icon="crop_square"
                @click="maximizedToggle = true"
                :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
                  >Maximize</q-tooltip
                >
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <div class="text-h6">Choose payment method</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
              voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel
              numquam exercitationem aut, natus minima, porro labore.
            </q-card-section>
          </q-card>
        </q-dialog>
        <br />

        <q-card-actions class="flex justify-end">
          <q-btn
            @click="createOrder"
            no-caps
            class="bg-green w-32 rounded-full text-sm text-black font-bold"
            label="Payment" />
        </q-card-actions>
      </q-form>
    </div>
  </div>
</template>

<script>
  import { defineProps, ref } from 'vue'
  import api from 'src/AxiosInterceptors'

  export default {
    data() {
      return {
        cart: [],
        ppn: 3950,
        servicefees: 1000,
        shipfees: 5000,
        finalSelected: [],
        dialog: ref(false),
        maximizedToggle: ref(true),
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
        group: ref(null),
        deliveryOrder: ref('reguler'),
      }
    },
    methods: {
      tampilkanDialog() {
        this.$refs.cashDialogRef.showModal = this.group === 'cash'
        this.$refs.qrisDialogRef.showModal = this.group === 'qris'
        this.$refs.transferDialogRef.showModal = this.group === 'transfer'
      },
      increm(cartItem) {
        const existProduct = this.finalSelected.find((item) => item.id === cartItem.id)
        if (existProduct) {
          existProduct.qty++
        } else {
          // this.finalSelected.push(cartItem)
        }

        console.log(this.finalSelected)
      },
      decrem(cartItem) {
        const existProduct = this.finalSelected.find((item) => item.id === cartItem.id)
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
      getQuantity(cartItem) {
        const existProduct = this.finalSelected.find((item) => item.id === cartItem.id)
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
      updateFinalSelected(cartItem) {
        const { serviceId, qty } = cartItem
        if (cartItem.selected) {
          // this.finalSelected.push(cartItem)

          this.finalSelected.push({ serviceId, qty })
        } else {
          const index = this.finalSelected.findIndex((item) => item === cartItem)
          if (index !== -1) {
            this.finalSelected.splice(index, 1)
          }
        }
        console.log(this.finalSelected)
      },
      createOrder() {
        try {
          // const data = new FormData()

          // Convert finalSelected array to JSON string and append it to FormData
          // data.append('items[]', JSON.stringify(this.finalSelected))

          let tes = JSON.stringify(this.finalSelected)
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
              console.log(response.data)
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
        return this.subTotal + this.ppn + this.servicefees + this.shipfees
      },
    },
  }
</script>
