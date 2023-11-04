<script lang="ts">
  import CardUser from 'src/components/CardUser.vue'

  export default {
    components: {
      CardUser,
    },

    data() {
      return {
        cardData: [
          {
            gambarProduk: 'desdelux.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
          },
          {
            gambarProduk: 'desdelux.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
          },
          {
            gambarProduk: 'desdelux.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
          },
          {
            gambarProduk: 'desdelux.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
          },
        ],
        price: 0,
      }
    },
    methods: {
      updateTotalPrice(value: any) {
        console.log(value)
        this.price = value
        this.$emit('total', value)
      },
    },
  }
</script>

<template>
  <div class="h-full overflow-scroll">
    <div class="flex flex-col gap-4 items-center">
      <p>{{ price }}</p>
      <div v-for="(card, index) in cardData" :key="index">
        <CardUser
          :gambarProduk="`/src/assets/img/${card.gambarProduk}`"
          :namaProduk="card.namaProduk"
          :descProduk="card.descProduk"
          :hargaProduk="card.hargaProduk"
          @quantityChanged="updateTotalPrice" />
      </div>
    </div>
  </div>
</template>
