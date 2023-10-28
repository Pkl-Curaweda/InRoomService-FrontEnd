<template>
  <q-btn unelevated rounded color="color" label="buttonLabel" />
</template>

<script setup>
  import { ref, defineProps } from 'vue'

  const props = defineProps({
    buttonLabel: String,
    color: String,
  })
</script>
