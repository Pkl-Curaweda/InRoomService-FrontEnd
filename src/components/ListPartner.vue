<template>
    <div class="h-12 border-gray-500 border rounded-xl flex mb-5">
        <div class="w-1/6 bg-gray-200 rounded-l-xl border-r border-gray-500 flex items-center justify-center">
            <q-icon name="person" size="28px"></q-icon>
        </div>
        <div class="w-5/6 flex items-center">
            <p class="pl-3 text-base">{{ namaPartner }}</p>
        </div>
    </div> 
</template>

<script>
  export default {
    props: {
        namaPartner: String,
    }
  }
</script>

<style>
</style>