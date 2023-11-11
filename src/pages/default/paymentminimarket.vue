<template>
  <div class="w-full h-full px-5 pb-5 bg-gray-500">
    <!-- Produk -->
    <h1 class="text-lg text-white font-bold m-0">{{ items }}</h1>
    <div class="flex flex-row justify-around">
      <q-img :src="gambaritems" alt="gambaritems" class="w-36 h-36" />
      <q-card-actions>
        <q-btn
          @click="decrement"
          class="border-[#16A75C] text-black border-2"
          round
          color="white"
          icon="remove"
          size="sm" />
        <p class="mx-1 px-2">{{ count }}</p>
        <q-btn
          @click="increment"
          class="border-[#16A75C] text-black border-2"
          round
          color="white"
          icon="add"
          size="sm" />
      </q-card-actions>
    </div>

    <!-- HARGA -->
    <q-item>
      <q-item-section class="text-white">
        <q-item-label>{{ hargaitems }}</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Deskripsi Harga -->
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label>Subtotal Order</q-item-label>
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ subtotal }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label>PPN</q-item-label>
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ ppn }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label>Service Fees</q-item-label>
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ servicefees }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="-mt-4">
      <q-item-section>
        <q-item-label class="font-bold">TOTAL</q-item-label>
      </q-item-section>
      <q-item-section side class="text-white">
        <q-item-label>{{ total }}</q-item-label>
      </q-item-section>
    </q-item>
    <!-- Pembayaran -->
    <div class="q-pa-md -mt-5">
      <q-item-label class="my-1">Change Options</q-item-label>
      <q-option-group :options="options" type="radio" v-model="group" />
    </div>

    <!-- Whatsapp  Number-->
    <div class="q-pa-md max-w-full -mt-5">
      <q-item-label class="my-1">Whatsapp Number</q-item-label>
      <q-input v-model="wa" filled name="whatsapp-number" />
    </div>
    <!-- Name -->
    <div class="q-pa-md max-w-full -mt-5">
      <q-item-label class="my-1">Your Name</q-item-label>
      <q-input v-model="text" filled name="full-name" />
    </div>

    <q-card-actions class="flex justify-around">
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="back"
        name="back" />
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="payment"
        name="payment" />
    </q-card-actions>
  </div>
</template>

<script>
  import { defineProps, ref } from 'vue'

  export default {
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

        options: [
          { label: 'Cash', value: 'cash', name: 'cash' },
          { label: 'QRIS', value: 'qris', name: 'qris' },
          { label: 'Transfer', value: 'transfer', name: 'transfer' },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped></style>
