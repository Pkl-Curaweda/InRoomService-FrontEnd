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
      <q-form>
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
            <p class="text-weight text-lg">Order Subtotal ({{ length }} menu)</p>
            <p>Rp. {{ sub }}</p>
          </div>
          <!-- <div class="row justify-between">
            <p class="text-weight">Shipping costs</p>
            <p>Rp. {{ shipfees }}</p>
          </div> -->
          <div class="row justify-between">
            <p class="text-weight">Service Fees</p>
            <p>Rp. {{ fees }}</p>
          </div>
          <div class="row justify-between">
            <p class="text-weight">PPN</p>
            <p>Rp. {{ ppn }}</p>
          </div>
          <q-space />
          <div class="row justify-between">
            <p class="text-weight-bold">TOTAL</p>
            <p>Rp. {{ total }}</p>
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
        ppn: 0,
        fees: 0,
        sub: 0,
        total: 0,
        finalSelected: [],
        length: 0,
        dialog: ref(false),
        orderId: localStorage.getItem('orderId'),
        serviceId: 0,
        maximizedToggle: ref(true),
        checkoutData: [],
        orderData: [],
        showUpdateButton: false,

        // shipfees: 5000,
      }
    },
    mounted() {
      this.getCartFromLocalStorage()
      this.getOrder()
    },
    props: {
      items: String,
      gambaritems: String,
      hargaitems: String,
      // subtotal: Number,
      // total: Number,
    },
    setup() {
      return {
        text: ref(''),
        wa: ref(''),
        group: ref(null),
        deliveryOrder: ref('reguler'),
      }
    },
    methods: {
      getOrder() {
        try {
          api.get('/order/' + this.orderId, { withCredentials: true }).then((response) => {
            this.orderData = response.data
            console.log(this.orderData)
          })
        } catch (error) {}
      },
      tampilkanDialog() {
        this.$refs.cashDialogRef.showModal = this.group === 'cash'
        this.$refs.qrisDialogRef.showModal = this.group === 'qris'
        this.$refs.transferDialogRef.showModal = this.group === 'transfer'
      },
      increm(cartItem) {
        const existProduct = this.finalSelected.find(
          (item) => item.serviceId === cartItem.serviceId
        )
        console.log(existProduct.serviceId)
        console.log(existProduct)
        if (existProduct) {
          const orderDetail = this.orderData.data.orderDetails.find(
            (detail) => detail.serviceId === cartItem.serviceId
          )
          if (orderDetail) {
            try {
              existProduct.qty++
              console.log(orderDetail)
              // Use the found detailid in the API request
              api.put(
                '/order/update/qty/' + this.orderId + '/' + orderDetail.id,
                {
                  serviceId: existProduct.serviceId,
                  qty: existProduct.qty,
                },
                {
                  withCredentials: true,
                  headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                }
              )
            } catch (error) {
              console.error(error)
            }
          } else {
            // console.warn('Order detail not found for serviceId:', cartItem.serviceId)
            existProduct.qty++
          }
        } else {
          // this.finalSelected.push(cartItem)
        }

        console.log(this.finalSelected)
      },
      decrem(cartItem) {
        const existProduct = this.finalSelected.find(
          (item) => item.serviceId === cartItem.serviceId
        )
        if (existProduct) {
          const orderDetail = this.orderData.data.orderDetails.find(
            (detail) => detail.serviceId === cartItem.serviceId
          )
          if (orderDetail) {
            try {
              if (existProduct.qty >= 0) {
                existProduct.qty--
                console.log(orderDetail)
                api.put(
                  '/order/update/qty/' + this.orderId + '/' + orderDetail.id,
                  {
                    serviceId: existProduct.serviceId,
                    qty: existProduct.qty,
                  },
                  {
                    withCredentials: true,
                    headers: {
                      accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  }
                )
              } else {
                existProduct.qty = 0
                existProduct.selected = false
              }
            } catch (error) {
              console.error(error)
            }
          } else {
            // console.warn('Order detail not found for serviceId:', cartItem.serviceId)
            if (existProduct.qty > 1) {
              existProduct.qty--
            } else {
              existProduct.qty = 0
              existProduct.selected = false
            }
          }
        }
        console.log(this.finalSelected)
      },
      getQuantity(cartItem) {
        const existProduct = this.finalSelected.find(
          (item) => item.serviceId === cartItem.serviceId
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
              this.checkoutData = response.data.data
              this.ppn = response.data.data.ppn
              this.fees = response.data.data.fees
              this.total = response.data.data.total
              this.length = response.data.data.orderDetails.length
              this.sub = response.data.data.subtotal
              console.log(this.length)
              this.cart.forEach((cartItem) => {
                cartItem.selected = false
              })
              this.finalSelected = []
              localStorage.setItem('orderId', response.data.data.id)
              console.log(this.checkoutData)
              console.log(this.finalSelected)
              this.showUpdateButton = true
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
              '/order/update/newItem/' + orderId,
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
              this.checkoutData = response.data.data
              this.ppn = response.data.data.ppn
              this.fees = response.data.data.fees
              this.total = response.data.data.total
              this.length = response.data.data.orderDetails.length

              this.sub = response.data.data.subtotal
              this.cart.forEach((cartItem) => {
                cartItem.selected = false
              })
              this.finalSelected = []
              console.log(response.data)
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
      // subTotal() {
      //   var subCost = 0
      //   for (var items in this.finalSelected) {
      //     var individualItem = this.finalSelected[items]
      //     subCost += individualItem.qty * individualItem.hargaProduk
      //   }
      //   return subCost
      // },
      // grandTotal() {
      //   return this.subTotal + this.ppn + this.servicefees + this.shipfees
      // },
    },
    created() {
      // Automatically show the Update button if orderId exists in localStorage
      if (this.orderIdExists) {
        this.showUpdateButton = true
      }
    },
  }
</script>
