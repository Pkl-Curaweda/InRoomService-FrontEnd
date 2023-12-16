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
        <div v-for="(data, index) in orderData" :key="index">
          <div class="row justify-between">
            <div class="column justify-between">
              <div>
                <p class="text-weight-bold">{{ data.service.name }}</p>
                <p>Rp. {{ data.service.price }}</p>
              </div>
              <!-- <q-btn
                no-caps
                color="red-1"
                class="text-black mb-2"
                name="o_description"
                icon="description"
                label="Notes" /> -->
            </div>
            <div class="column items-center">
              <q-img :src="`${data.service.picture}`" class="bg-red-100 w-30 h-30" />
              <q-card-actions>
                <q-btn
                  @click="decrem(data)"
                  class="border-[#16A75C] text-black border-2"
                  round
                  color="white"
                  icon="remove"
                  size="sm" />
                <p class="mx-1 px-2">{{ data.qty }}</p>
                <q-btn
                  @click="increm(data)"
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
          <q-card class="bg-white text-black">
            <q-bar>
              <q-space />

              <!-- <q-btn
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
              </q-btn> -->
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <div class="text-h6">Select payment method</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
              voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel
              numquam exercitationem aut, natus minima, porro labore.
            </q-card-section>
          </q-card>
        </q-dialog>
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
        qty: 0,
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
            this.orderData = response.data.data.orderDetails
            this.length = response.data.data.orderDetails.length
            this.fees = response.data.data.fees
            this.ppn = response.data.data.ppn
            this.total = response.data.data.total
            this.sub = response.data.data.subtotal
            console.log(this.orderData)
          })
        } catch (error) {}
      },
      tampilkanDialog() {
        this.$refs.cashDialogRef.showModal = this.group === 'cash'
        this.$refs.qrisDialogRef.showModal = this.group === 'qris'
        this.$refs.transferDialogRef.showModal = this.group === 'transfer'
      },
      async increm(data) {
        var id = data.id
        var qty = data.qty
        var serviceId = data.service.id
        console.log(serviceId)
        try {
          qty++
          await api.put(
            `/order/update/qty/${this.orderId}/${id}`,
            {
              serviceId: serviceId,
              qty: qty,
            },
            {
              withCredentials: true,
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          )

          this.getOrder()
        } catch (error) {
          console.error(error)
        }
      },
      async decrem(data) {
        var id = data.id
        var qty = data.qty
        var serviceId = data.service.id

        try {
          if (qty >= 0) {
            qty--
            await api.put(
              `/order/update/qty/${this.orderId}/${id}`,
              {
                serviceId: serviceId,
                qty: qty,
              },
              {
                withCredentials: true,
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }
            )

            this.getOrder()
          }
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
