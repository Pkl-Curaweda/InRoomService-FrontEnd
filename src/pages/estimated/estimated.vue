<template>
  <div class="q-pa-lg">
    <div class="flex flex-col text-lg">
      {{ $q.screen.lt.sm ? 'Estimated' : $q.screen.lt.md ? 'Comfortable' : 'Loose' }} Time

      <div class="flex flex-row gap-6 items-center my-5">
        <q-img :src="productImage" alt="productImage" class="w-26 h-26 bg-black" />
        <div class="flex flex-col gap-2">
          <h1 class="font-bold text-sm">{{ productName }}</h1>
          <p class="text-xs">{{ productPrice }}</p>
        </div>
      </div>
    </div>

    <q-stepper
      v-model="step"
      ref="stepper"
      vertical
      animated
      active-color="green"
      active-icon="check">
      <q-step :name="1" prefix="1" color="green" title="Order Pending" caption="time 10:00 am">
      </q-step>

      <q-step :name="2" prefix="2" title="Order being process" caption="time 9:45 am"> </q-step>

      <q-step :name="3" prefix="3" title="Order being delivered" caption="time 9:40 am"> </q-step>

      <q-step :name="4" prefix="4" title="Order is done" caption="time 9:35 am"> </q-step>

      <q-step :name="5" prefix="5" title="Order canceled" caption="time 9:25 am"> </q-step>

      <!-- <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="deep-orange" :label="step === 5 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template> -->
    </q-stepper>

    <!-- BUTTON BACK -->
    <q-btn
      class="bg-green w-32 rounded-full text-sm text-black font-bold"
      label="back"
      name="back"
      @click="balik" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  export default {
    props: {
      productName: String,
      productPrice: String,
      productImage: String,
    },
    setup(props) {
      const step = ref(1)
      const productName = ref(props.productName)
      const productPrice = ref(props.productPrice)
      const productImage = ref(props.productImage)
      const route = useRoute()
      const router = useRouter()

      return {
        step,
        productName,
        productPrice,
        productImage,
        route,
        router,
      }
    },
    methods: {
      balik() {
        if (this.route.path === '/estimated/minimarket') {
          this.router.push('/minimarket')
        } else if (this.route.path === '/estimated/foodbeverage') {
          this.router.push('/foodbeverage')
        } else if (this.route.path === '/estimated/laundry') {
          this.router.push('/laundry')
        }
      },
    },
  }
</script>

<style>
  .q-btn[name='back'] {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
</style>
