<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    gambarProduk: String,
    namaProduk: String,
    descProduk: String,
    hargaProduk: String,
  })
</script>

<template>
<q-card class="my-card bg-[#999999EB] text-white p-2 h-40">
<q-card-section horizontal>
      <q-card-section>
        <div class="text-h6 text-bold mb-3 text-sm">{{ namaProduk }}</div>
        <div class="text-subtitle2 mb-3">{{ descProduk }}</div>
        <div class="text-subtitle3 mb-3">{{ hargaProduk }}</div>
        </q-card-section>

        <q-img
          class="col-5"
          :src="gambarProduk"
        />
      </q-card-section>  
    </q-card>
</template>

<style lang="scss" scoped></style>