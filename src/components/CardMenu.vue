<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    tanggal: String,
    namaToko: String,
    jam: String,
    iconName: String,
    link: String,
  })
</script>

<template>
  <a class="flex flex-col justify-center h-[130px] cursor-pointer w-[236px]" :href="link">
    <div
      class="h-[130px] w-2 bg-[#0985BA] rounded-2xl border border-black -mr-2 z-10 shadow-md"></div>
    <div class="py-3 w-[236px]">
      <div
        class="rounded-xl bg-white flex border border-black flex-row items-center px-3 justify-between gap-6 py-3 pl-5 shadow-md">
        <div class="flex flex-col gap-2 items-start w-[110px]">
          <p class="text-[#0660A1]">{{ tanggal }}</p>
          <!-- elemen ini berdasarkan props -->
          <h5 class="text-black">{{ namaToko }}</h5>
          <!-- elemen ini berdasarkan props -->
          <p class="text-[#808080]">{{ jam }}</p>
          <!-- elemen ini berdasarkan props -->
        </div>
        <q-item-section>
          <q-icon :name="iconName" class="text-black text-7xl" />
          <!-- name nya berdasarkan props -->
        </q-item-section>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped></style>
