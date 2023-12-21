<template>
  <q-card
    class="card my-card text-white p-3 sm:p-5 w-full sm:w-[600px] xl:w-[700px] justify-center">
    <q-card-section horizontal class="flex justify-around w-full">
      <div class="tulisan my-auto w-50 md:w-96">
        <h5 class="text-lg pb-1 font-bold capitalize">{{ namaProduk }}</h5>
        <div class="text-base text-justify truncate text-ellipsis">
          {{ descProduk }}
        </div>
        <div class="flex flex-row items-center justify-between pb-2 sm:pb-5">
          <div class="text-base font-bold">Rp.{{ hargaProduk }}</div>
        </div>
        <q-card-actions>
          <q-btn
            class="bg-green w-28 sm:w-32 md:text-sm text-xs rounded-full text-black font-bold"
            label="Add to Cart"
            name="add"
            dense
            @click="handleClick" />
        </q-card-actions>
      </div>
      <q-img :src="`${gambarProduk}`" class="w-36 sm:w-52 rounded-md opacity-90 border" ratio="1" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { defineProps, ref, defineEmits, toRef } from 'vue'

  export default {
    props: {
      gambarProduk: String,
      namaProduk: String,
      descProduk: String,
      hargaProduk: Number,
      onClick: {
        type: Function,
        required: true,
      },
    },
    setup(props, { emit }) {
      const count = ref(0)

      return {
        count,
        cart: [] as { namaProduk: string; hargaProduk: number; qty: number }[],
        // decrement,
        // increment,
        handleClick() {
          props.onClick()
        },
      }
    },
    methods: {},
  }
</script>

<style scoped>
  .card {
    background-color: rgba(153, 153, 153, 0.92);
  }
</style>
