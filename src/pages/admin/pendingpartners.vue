<template>
  <div class="px-8">
    <h1 class="font-bold">PENDING PRODUCT</h1>

    <div v-if="data && data.length > 0" class="">
      <div v-for="(daata, index) in data" :key="index">
        <ListPartner :namaPartner="daata.user.name" :onClick="daata.id" />
      </div>
    </div>

    <div v-else>
      <p class="text-center">No Upcoming Product</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { matAutoAwesome } from '@quasar/extras/material-icons'
  import ListPartner from 'src/components/ListPartner.vue'
  import api from 'src/AxiosInterceptors'
  export default {
    components: {
      ListPartner,
    },
    data() {
      return {
        data: [] as { id: any; user: { name: String } }[],
      }
    },
    setup() {
      return {}
    },
    mounted() {
      this.getPending()
    },
    methods: {
      async getPending() {
        try {
          const response = await api.get('/productReq/status/PENDING', {
            withCredentials: true,
          })
          // console.log(response.data.data)
          this.data = response.data.data
        } catch (error) {
          // console.error(error)
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
