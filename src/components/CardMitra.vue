<script>
  import { defineProps } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import router from 'src/router'
  export default {
    props: {
      gambarProduk: String,
      namaProduk: String,
      descProduk: String,
      hargaProduk: Number,
      // onClick: {
      //   type: Function,
      //   required: true,
      // },
      onClick: Promise,
    },
    setup(props) {
      const navigate = useRouter()
      return {
        navigate,
        // handleClick() {
        //   props.onClick()
        // },
      }
    },
  }
</script>

<template>
  <q-card class="card my-card text-white p-3 w-[80%] md:w-md m-auto my-5">
    <q-card-section horizontal class="flex justify-between">
      <div class="block relative w-32">
        <h4 class="text-md font-bold">{{ namaProduk }}</h4>
        <p class="text-xs">
          {{ descProduk }}
        </p>
        <div class="flex flex-row items-center justify-between mb-2">
          <p class="text-sm">Rp. {{ hargaProduk }}</p>
        </div>
        <div class="flex">
          <q-btn
            size="sm"
            rounded
            padding="xs"
            color="green"
            @click="navigate.push('/mitra/edit/' + onClick)"
            class="sm:px-2 w-24 flex justify-center items-center font-semibold sm:py-2"
            ><q-icon name="o_edit" class="mr-5 w-2 items-center h-full" />
            <span>Edit</span>
          </q-btn>
        </div>
      </div>
      <q-img :src="`${gambarProduk}`" class="w-28" ratio="1" />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped></style>
