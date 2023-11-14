<template>
  <div class="px-8">
    <h1 class="font-bold">HISTORY ORDERS</h1>
    <ListPartner namaPartner="DIMAS PRAMUDIA" />
    <ListPartner namaPartner="INTAN" />
    <ListPartner namaPartner="FATIMAH" />

    <!-- BUTTON BACK -->
    <q-btn
      class="mb-10 mx-auto bg-green w-32 rounded-full text-sm text-black font-bold absolute-bottom q-mb-md"
      label="back"
      name="back" />
  </div>
</template>

<script setup>
  import ListPartner from 'src/components/ListPartner.vue'
</script>

<style></style>
