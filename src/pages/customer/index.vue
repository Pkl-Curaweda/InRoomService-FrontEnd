<template>
  <div class="">
    <div class="w-full items-center flex justify-center">
      <h3 class="text-black font-bold text-2xl text-center">Welcome, Guest 355</h3>
      <p class="text-black text-base">What do you need today?</p>
    </div>

    <div v-for="(card, index) in cardData" :key="index">
      <card-menu
        :tanggal="card.tanggal"
        :namaToko="card.namaToko"
        :iconName="card.iconName"
        :link="card.link" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CardMenu from 'src/components/CardMenu.vue'
  const cardData = [
    {
      tanggal: new Date().toLocaleDateString(),
      namaToko: 'Mini Market',
      jam: '10 am - 12 pm',
      iconName: 'store',
      link: '/minimarket',
    },
    {
      tanggal: new Date().toLocaleDateString(),
      namaToko: 'Food & Beverage',
      jam: '10 am - 12 pm',
      iconName: 'emoji_food_beverage',
      link: '/foodbeverage',
    },
    {
      tanggal: new Date().toLocaleDateString(),
      namaToko: 'Laundry',
      jam: '10 am - 12 pm',
      iconName: 'local_laundry_service',
      link: '/laundry',
    },
    {
      tanggal: new Date().toLocaleDateString(),
      namaToko: 'Hotel Information',
      jam: '10 am - 12 pm',
      iconName: 'info',
      link: '/information',
    },
  ]
</script>
