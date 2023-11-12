<template>
  <div class="flex items-center flex-col justify-center gap-6">
    <q-img src="../../assets/img/notfound.svg" alt="forbidden" class="w-96 h-72" ratio="" />

    <q-btn
      @click="navigate.back()"
      unelevated
      rounded
      color="green"
      label="back"
      text-color="white"
      class="px-8" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'ForbiddenPage',
    setup(props) {
      const navigate = useRouter()
      return { navigate }
    },
  })
</script>
