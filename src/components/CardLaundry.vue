<template>
  <q-card class="card my-card text-white p-3 w-[380px]">
    <q-card-section horizontal class="flex justify-between">
      <div class="tulisan">
        <div class="text-md pb-1 font-bold">{{ namaProduk }}</div>
        <div class="text-xs text-justify">
          {{ hargaProduk }}
        </div>
        <div class="flex flex-row items-center justify-between">
          <div class="text-sm">
            {{ descProduk }}
          </div>
          <q-card-actions>
            <q-btn
              @click="decrement"
              class="border-[#16A75C] text-black border-2"
              round
              color="white"
              icon="remove"
              size="sm" />
            <p class="mx-1 px-2">{{ count }}</p>
            <q-btn
              @click="increment"
              class="border-[#16A75C] text-black border-2"
              round
              color="white"
              icon="add"
              size="sm" />
          </q-card-actions>
        </div>
      </div>
      <q-img :src="gambarProduk" class="col-4" ratio="1" />
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineProps, ref, defineEmits, toRef } from 'vue'

  export default {
    props: {
      gambarProduk: String,
      namaProduk: String,
      hargaProduk: String,
      descProduk: String,
    },
    setup(props, { emit }) {
      const count = ref(0)
      const hargaProduk = toRef(props, 'hargaProduk')
      const decrement = () => {
        if (count.value > 0) {
          count.value--
          // defineEmits('quantityChanged', count.value)
          emit('quantityChanged', count.value * hargaProduk.value)
        }
      }

      const increment = () => {
        count.value++
        // defineEmits('quantityChanged', count.value)
        emit('quantityChanged', count.value * parseFloat(hargaProduk.value))
      }

      return {
        count,
        decrement,
        increment,
      }
    },
  }
</script>

<style scoped>
  .card {
    background-color: rgba(153, 153, 153, 0.92);
  }
</style>
