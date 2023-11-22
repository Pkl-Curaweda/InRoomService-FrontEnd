<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { routes } from '../router'
  import { useHead } from '@vueuse/head'
  import Minimarket from 'src/pages/default/minimarket.vue'
  import FoodBeverage from 'src/pages/default/foodbeverage.vue'

  const leftDrawerOpen = ref(false)
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const route = useRoute()
  const router = useRouter()
  const search = ref('')
  useHead({
    title: 'Your Page Title',
    // other meta tags or properties
  })

  const item = ref([])
  const length = ref(0)
  onMounted(() => {
    const cartItem = localStorage.getItem('cart')
    item.value = cartItem ? JSON.parse(cartItem) : []

    length.value = item.value.length
  })

  watch(item, (newItems) => {
    length.value = newItems.length
  })

  function estimated() {
    if (route.path === '/minimarket') {
      router.push('/estimated/minimarket')
    } else if (route.path === '/foodbeverage') {
      router.push('/estimated/foodbeverage')
    } else if (route.path === '/laundry') {
      router.push('/estimated/laundry')
    }
  }

  function checkout() {
    if (route.path === '/minimarket') {
      router.push('/checkout/minimarket')
    } else if (route.path === '/foodbeverage') {
      router.push('/checkout/foodbeverage')
    } else if (route.path === '/laundry') {
      router.push('/checkout/laundry')
    }
  }

  function cancel() {
    if (route.path === '/minimarket') {
      localStorage.removeItem('cart')
    } else if (route.path === '/foodbeverage') {
      localStorage.removeItem('cartFood')
    } else if (route.path === '/laundry') {
      router.push('/estimated/laundry')
    }
  }
  console.log()
</script>

<template>
  <div class="my-bg bg1">
    <q-layout view="lHh lpR fFf" class="text-white max-h-screen min-h-screen">
      <q-header class="bg-transparent border-0 border-transparent">
        <q-toolbar class="flex items-center justify-between">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="text-white" />

          <q-toolbar-title class="text-capitalize font-bold">
            {{ route.meta.label }}
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar class="flex flex-col w-screen">
          <div class="flex items-center gap-2 flex-row">
            <q-btn dense flat round icon="timeline" @click="estimated()" class="text-white" />
            <q-btn dense flat round icon="person" @click="toggleLeftDrawer" class="text-white" />
            <q-btn
              dense
              flat
              round
              icon="shopping_cart"
              @click="toggleLeftDrawer"
              class="text-white" />

            <q-form>
              <q-input
                outlined
                v-model="search"
                label="Search"
                for="search"
                type="search"
                color="dark w-full"
                bg-color="white"
                class="w-56 sm:w-80 md:w-96">
                <template v-slot:append class="">
                  <q-btn dense flat icon="search" color="green" rounded />
                </template>
              </q-input>
            </q-form>
          </div>
          <div
            active-color="white"
            style="font-size: 16px"
            class="flex flex-row items-center mt-6 flex-nowrap">
            <div class="flex items-start gap-2 flex-nowrap">
              <q-btn class="text-white my-auto" label="1" color="green" rounded></q-btn>
              <div class="flex flex-col items-start">
                <p>Add to Cart</p>
                <p class="text-gray-400 text-sm">Choose Your Item</p>
              </div>
            </div>

            <div
              class="h-[2px] w-12 mx-2 bg-[#20A95A] rounded-2xl border-2 border-[#20A95A] z-10 shadow-md"></div>

            <div class="flex items-start gap-2 flex-nowrap">
              <q-btn
                class="text-gray-400 my-auto"
                label="2"
                @click="checkout()"
                color="dark"
                text-color="grey-13"
                rounded></q-btn>
              <div class="flex flex-col items-start">
                <p class="text-gray-400">Checkout</p>
                <p class="text-gray-400 text-sm">To Make Payment</p>
              </div>
            </div>
          </div>
        </q-toolbar>
      </q-header>
      <q-footer
        reveal
        class="mb-1 rounded-lg bg-[#9F9F9F] w-full sm:w-[600px] xl:w-[700px] justify-center mx-auto">
        <q-toolbar class="flex items-center">
          <div class="flex items-center gap-1 flex-nowrap">
            <q-icon name="o_shopping_cart" size="32px"></q-icon>
            <p>{{ length }}</p>
          </div>
          <div class="flex justify-end gap-5 p-2 w-full">
            <q-btn
              class="bg-green w-28 rounded-full text-sm text-black font-bold"
              label="cancel"
              name="cancel"
              @click="cancel()" />
            <q-btn
              class="bg-green w-28 rounded-full text-sm text-black font-bold"
              label="continue"
              name="continue"
              @click="checkout()" />
          </div>
        </q-toolbar>
      </q-footer>
      <q-drawer
        v-model="leftDrawerOpen"
        side="left"
        overlay
        elevated
        :width="240"
        class="text-white bg-[#9F9F9F]">
        <q-scroll-area class="fit">
          <div class="flex flex-col items-center p-2 mb-4">
            <q-btn
              flat
              round
              color="white"
              icon="close"
              size="60"
              @click="toggleLeftDrawer"
              class="ms-auto z-10" />
            <q-img src="../assets/img/logoLingian.png" class="w-40" />
          </div>
          <q-list>
            <template v-for="(route, index) in routes" :key="index">
              <!-- Only display routes with a non-empty label in the sidebar -->
              <template v-if="route.meta.label">
                <q-item
                  clickable
                  :active="route.meta.label === 'Outbox'"
                  v-ripple
                  @click="router.push(route.path)">
                  <q-item-section avatar>
                    <q-icon :name="'o_' + route.meta.icon" />
                  </q-item-section>
                  <q-item-section>
                    <p class="text-bold text-capitalize">
                      {{ route.meta.label }}
                    </p>
                  </q-item-section>
                </q-item>
              </template>
            </template>
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="o_logout" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Logout</p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="flex items-center justify-center h-screen overflow-hidden">
        <!-- <Minimarket @total="marktUpdatePrice" v-if="$route.path === '/minimarket'" />
        <FoodBeverage @total="foodUpdatePrice" v-if="$route.path === '/foodbeverage'" /> -->
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    background-color: rgba(153, 153, 153, 0.92);
  }
  .my-bg {
    position: absolute;
    top: 0;
    left: 0;
    background-position-y: 30%;
    width: 100%;

    background-size: cover;
    z-index: -1; /* Move the background behind other content */
  }

  .my-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position-y: 50%;
    filter: brightness(50%); /* Apply the brightness filter */
    z-index: -2; /* Move the filtered background even further behind */
  }

  .bg1 {
    background-image: url('src/assets/img/minimarket.png');
  }

  // .my-bg::before {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 60%;
  //   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  //   position: absolute;
  //   top: 0;
  // }

  // .my-bg::after {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 40%;
  //   background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  //   position: absolute;
  //   bottom: 0;
  // }
</style>
