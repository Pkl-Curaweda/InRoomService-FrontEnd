<template>
  <div class="flex items-center justify-center flex-col mt-5">
    <h3 class="text-black font-bold text-2xl">Welcome, {{ name }}</h3>
    <p class="text-black text-base">What do you need today?</p>

    <div class="flex gap-6 items-center flex-col mt-6">
      <div v-for="(card, index) in modifiedCardData" :key="index">
        <template></template>
        <card-menu
          v-if="shouldRenderCard(card.link)"
          :tanggal="card.tanggal"
          :namaToko="card.namaToko"
          :jam="card.jam"
          :iconName="card.iconName"
          :link="card.link" />
      </div>
    </div>
  </div>

  <div>
    <q-icon name="support_agent" size="34px" />
  </div>
</template>

<!-- <script setup lang="ts">
  import CardMenu from 'src/components/CardMenu.vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()

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
      link: '/about',
    },
  ]

  const modifiedCardData = cardData.map((card) => {
    // Modify the card's link based on the current route
    if (card.link !== '/about') {
      if (route.path === '/admin/home') {
        return {
          ...card,
          link: `/admin${card.link}`,
        }
      } else if (route.path === '/mitra/home') {
        return {
          ...card,
          link: `/mitra${card.link}`,
        }
      }
    }
    return card // If the route is neither '/admin/home' nor '/mitra/home', keep the original link
  })

  function shouldRenderCard(link: string): boolean {
    if (route.path === '/mitra/home') {
      return link !== '/mitra/laundry' && link !== '/mitra/foodbeverage'
    } else {
      return true // If the route is something else, render the card
    }
  }

  
</script> -->

<script lang="ts">
  import api from 'src/AxiosInterceptors'
  import CardMenu from 'src/components/CardMenu.vue'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    components: { CardMenu },
    setup() {
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
          link: '/about',
        },
      ]

      const route = useRoute()

      const modifiedCardData = cardData.map((card) => {
        // Modify the card's link based on the current route
        if (card.link !== '/about') {
          if (route.path === '/admin/home') {
            return {
              ...card,
              link: `/admin${card.link}`,
            }
          } else if (route.path === '/mitra/home') {
            return {
              ...card,
              link: `/mitra${card.link}`,
            }
          }
        }
        return card // If the route is neither '/admin/home' nor '/mitra/home', keep the original link
      })

      function shouldRenderCard(link: string): boolean {
        if (route.path === '/mitra/home') {
          return link !== '/mitra/laundry' && link !== '/mitra/foodbeverage'
        } else {
          return true // If the route is something else, render the card
        }
      }
      return {
        route,
        cardData,
        modifiedCardData,
        shouldRenderCard,
      }
    },
    mounted() {
      this.getData()
    },
    data() {
      return {
        name: null,
      }
    },
    methods: {
      async getData() {
        try {
          const response = await api.get('/profile', { withCredentials: true })

          this.name = response.data.data.name
        } catch (error) {
          console.error('failed to get data', error)
        }
      },
    },
  }
</script>
