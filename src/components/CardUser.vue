<template>
  <q-card class="card my-card text-white p-3 w-[380px]">
    <q-card-section horizontal class="flex justify-between">
      <div class="tulisan">
        <div class="text-md pb-1 font-bold">{{ namaProduk }}</div>
        <div class="text-xs text-justify">
          {{ descProduk }}
        </div>
        <div class="flex flex-row items-center justify-between">
          <div class="text-sm">
            {{ hargaProduk }}
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

    <q-card-actions>
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="Send"
        name="send" />
    </q-card-actions>
  </q-card>
</template>

<script>
  import { defineProps, ref } from 'vue'

  export default {
    props: {
      gambarProduk: String,
      namaProduk: String,
      descProduk: String,
      hargaProduk: String,
    },
    setup(props) {
      const count = ref(0)

      const decrement = () => {
        if (count.value > 0) {
          count.value--
        }
      }

      const increment = () => {
        count.value++
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
