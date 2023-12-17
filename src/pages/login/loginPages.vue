<template>
  <div class="flex items-center flex-col justify-center">
    <p class="mt-8" v-if="$route.path === '/mitra'">
      Don't have an account?
      <a class="text-[#D1CB2A]" href="/mitra/register">Create an account</a>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import ButtonVue from '../../components/Button.vue'
  import CardMitra from 'src/components/CardMitra.vue'
  import CardUser from 'src/components/CardUser.vue'
  import CardMenu from 'src/components/CardMenu.vue'
  import { useRoute } from 'vue-router'

  const username = ref('')
  const pw = ref('')
  const ph = ref('')
  const dense = ref(false)

  const $route = useRoute()

  const getRegistrationLink = computed(() => {
    if ($route.path.startsWith('/admin')) {
      return '/admin/register'
    } else if ($route.path.startsWith('/mitra')) {
      return '/mitra/register'
    } else {
      // Set a default link if not in the '/admin' or '/mitra' path
      return '/default/register'
    }
  })
</script>
