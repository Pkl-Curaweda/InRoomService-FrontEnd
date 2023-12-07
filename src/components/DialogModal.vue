<template>
  <q-btn
    rounded
    label="Payment"
    class="bg-green w-32 rounded-full text-sm text-black font-bold"
    @click="Total = true" />

  <q-dialog v-model="Total">
    <q-card>
      <q-card-section
        class="bg-white text-black"
        style="
          width: 316px;
          height: fit-content;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        ">
        <div style="font-weight: bold" class="text-h6 text-black">Total</div>
        <div class="text-h7 text-black" style="text-align: center">Rp.200.000</div>
      </q-card-section>

      <q-card-actions
        align="center"
        class="text-white"
        style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <q-btn
          rounded
          label="Pay"
          style="background-color: #16a75c; width: 50%"
          text-color="black"
          @click="handleClick" />
      </q-card-actions>

      <q-card-actions
        align="center"
        class="text-white"
        style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <q-btn
          rounded
          label="Back"
          style="background-color: #b7b7b7; width: 50%"
          text-color="black"
          bg-color="grey"
          v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="BayarBerhasil" transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section
        class="bg-white text-black"
        style="
          width: 316px;
          height: fit-content;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        ">
        <div class="text-h6 text-black">Succeed</div>
        <q-icon name="check_circle" size="40px" color="green"></q-icon>
        <div class="text-h6" style="color: #b7b7b7">Order Is Complete</div>
        <div class="text-h7 text-black" style="text-align: center">Rp.200.000</div>
      </q-card-section>
      <q-card-actions
        align="center"
        class="text-white"
        style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <q-btn
          rounded
          label="Receipt"
          style="background-color: #16a75c; width: 50%"
          text-color="black"
          @click="Receipt = true" />
      </q-card-actions>
      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn
          rounded
          style="background-color: #b7b7b7; width: 50%"
          text-color="black"
          flat
          label="Back"
          v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="Receipt" transition-show="scale" transition-hide="scale">
    <div class="text-xs h-screen items-center flex z-10">
      <div
        class="w-full bg-[#E6F6EC] px-3 py-6 flex-block rounded-lg md:py-10 mx-auto drop-shadow-md">
        <div class="flex flex-nowrap align-middle my-5 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#069550"
            class="w-6 h-6 my-auto">
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd" />
          </svg>
          <p>Your form has been sent. Please wait next information.</p>
        </div>
        <div class="h-0.5 w-full bg-[#069550] rounded-md mb-2 opacity-50"></div>
        <!-- gap -->

        <!-- order item -->
        <div class="order-details">
          <h2>Order Details</h2>
          <div class="flex justify-between pb-5 font-bold">
            <table class="table-collapse justify-between w-full">
              <tr>
                <td>{{ items }}</td>
                <td>{{ totalitems }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="h-0.5 w-full bg-[#069550] rounded-md mb-2 opacity-50"></div>
        <!-- gap -->

        <div class="payment-details">
          <h2>Payment Details</h2>
          <div class="block justify-between pb-3">
            <table class="table-collapse justify-between w-full">
              <tr>
                <td class="w-[70%]">Subtotal Order ({{ totalitems }})</td>
                <td class="w-[30%] text-right">Rp.{{ subtotal }}</td>
              </tr>
              <tr>
                <td class="w-[70%]">PPN</td>
                <td class="w-[30%] text-right">Rp.{{ ppn }}</td>
              </tr>
              <tr>
                <td class="w-[70%]">Service Fees</td>
                <td class="w-[30%] text-right">Rp.{{ servicefees }}</td>
              </tr>
            </table>
            <table class="table-collapse justify-between w-full font-bold">
              <tr>
                <td class="w-[70%]">TOTAL</td>
                <td class="w-[30%] text-right">Rp.{{ total }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="h-0.5 w-full bg-[#069550] rounded-md mb-2 opacity-50"></div>
        <!-- gap -->

        <button
          class="px-10 py-2 bg-[#069550] flex justify-center mx-auto my-5 rounded-full font-bold"
          @click="Receipt = false">
          Back
        </button>
        <div class="w-full justify-center flex">
          <img src="../assets/img/lingian-logo-colored.png" class="w-36" alt="" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
  import { ref } from 'vue'
  import Receipt from './Receipt.vue'
  export default {
    props: {
      onClick: {
        type: Function,
        required: true,
      },
    },
    setup(props, emit) {
      return {
        Total: ref(false),
        BayarBerhasil: ref(false),
        Receipt: ref(false),
        items: '',
        totalitems: '',
        subtotal: '',
        ppn: '',
        servicefees: '',
        total: '',
        handleClick() {
          props.onClick()
          BayarBerhasil = true
        },
      }
    },
    components: {
      Receipt,
    },
  }
</script>
