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
            gambarProduk: 'hotel.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
            selectedQuantity: 0,
          },
          {
            gambarProduk: 'hotel.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
            selectedQuantity: 0,
          },
          {
            gambarProduk: 'hotel.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
            selectedQuantity: 0,
          },
          {
            gambarProduk: 'hotel.png',
            namaProduk: 'Bakso Ngawi',
            descProduk: 'Dibuat dari daging unta asli baghdad',
            hargaProduk: '20000',
            selectedQuantity: 0,
          },
        ],
      }
    },
    methods: {
      // updateTotalPrice(quantity: any, index: number) {
      //   this.cardData[index].selectedQuantity = quantity // Store the selected quantity

      //   // Calculate total price based on selected quantity
      //   this.price = this.cardData.reduce((total, card) => {
      //     return total + parseInt(card.hargaProduk) * (card.selectedQuantity || 0)
      //   }, 0)
      // },

      updateTotalPrice(value: any) {
        console.log(value)
      },
    },
  }
</script>

<template>
  <div class="h-full overflow-scroll">
    <div class="flex flex-col gap-4 items-center">
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
