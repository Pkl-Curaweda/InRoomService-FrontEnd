<template>
  <q-card class="card my-card text-white p-3 w-[380px]">
    <q-card-section horizontal class="flex justify-between">
      <div class="tulisan">
        <div class="text-md pb-1 font-bold">{{ namaProduk }}</div>
        <div class="text-xs text-justify">
          {{ descProduk }}
        </div>
        <div class="flex flex-row items-center justify-between">
          <div class="text-sm font-bold">Rp. {{ hargaProduk }}</div>
        </div>
      </div>
      <q-img :src="gambarProduk" class="col-4" ratio="1" />
    </q-card-section>

    <q-card-actions>
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="Add to Cart"
        name="add"
        @click="handleClick" />
    </q-card-actions>
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
      // const hargaProduk = toRef(props, 'hargaProduk')
      // const decrement = () => {
      //   if (count.value > 0) {
      //     count.value--
      //     // defineEmits('quantityChanged', count.value)
      //     emit('quantityChanged', count.value * hargaProduk.value)
      //   }
      // }
      // const increment = () => {
      //   count.value++
      //   // defineEmits('quantityChanged', count.value)
      //   emit('quantityChanged', count.value * parseFloat(hargaProduk.value))
      // }
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
