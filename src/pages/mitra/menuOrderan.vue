<template>
  <div class="px-8">
    <h1 class="font-bold">LIST OF ORDERS</h1>

    <div class="">
      <div v-for="(data, index) in partnerData" :key="data.id">
        <ListPartner :namaPartner="data.namaPartner" />
      </div>
    </div>
  </div>
</template>

<script>
  import ListPartner from 'src/components/ListPartner.vue'

  export default {
    components: { ListPartner },
    data() {
      return {
        partnerData: [
          {
            id: 1,
            namaPartner: 'asep',
          },
          {
            id: 2,
            namaPartner: 'agus',
          },
          {
            id: 3,
            namaPartner: 'udin',
          },
          {
            id: 4,
            namaPartner: 'wawan',
          },
          {
            id: 5,
            namaPartner: 'acep',
          },
          { id: 6, namaPartner: 'arif' },
        ],
      }
    },
    methods: {
      // details(id) {
      //   this.$router.push('/mitra/customer/order/${id}')
      // },
    },
  }
</script>

<style></style>
