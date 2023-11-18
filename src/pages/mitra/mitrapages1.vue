<template>
  <q-form
    class="bg-white q-pa-md flex justify-center items-start flex-col"
    @submit.prevent="sendData">
    <div class="bagianpertama mt-16">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="shopping_cart" size="20px " />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Types of Goods
        </h2>
      </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-select
          color="black"
          outlined
          label-color="green"
          v-model="model"
          :options="options"
          label="Label">
        </q-select>
      </div>
    </div>

    <div class="bagiankedua mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="shopping_cart_checkout" size="20px" />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Name of Goods
        </h2>
      </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-card>
          <q-input
            standout="bg-teal text-white"
            v-model="namegoods"
            bg-color="white"
            label="Nama Pesanan"
            :dense="dense" />
        </q-card>
      </div>
    </div>

    <div class="bagianketiga mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="payments" size="20px" />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Price
        </h2>
      </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-card>
          <q-input
            standout="bg-teal 
          text-white"
            v-model="payments"
            bg-color="white"
            label="Harga Pesanan"
            :dense="dense" />
        </q-card>
      </div>
    </div>

    <div class="bagiankeempat mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="edit_note" size="20px" />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Deskripsi
        </h2>
      </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-card>
          <q-input
            standout="bg-teal text-white"
            v-model="deskripsi"
            bg-color="white"
            label="Deskripsi Pesanan"
            :dense="dense" />
        </q-card>
      </div>
    </div>

    <div class="bagiankelima mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="folder" size="20px" />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Masukan File
        </h2>
      </div>
      <div class="q-gutter-md" style="max-width: 300px">
        <q-card>
          <q-file filled v-model="file" label="Click To Upload" max-files="1">
            <template v-slot:before>
              <q-icon name="folder_open" />
            </template>
          </q-file>
        </q-card>
      </div>
    </div>

    <div class="q-gutter-sm mx-auto mt-6 w-fit">
      <q-btn unelevated rounded color="green" label="SEND" @click="sendData()" />
      <q-btn outline rounded color="green" label="BACK" @click="tes()" />
    </div>
  </q-form>
</template>

<script>
  import axios from 'axios'
  import { ref } from 'vue'
  import api from 'src/AxiosInterceptors'
  console.log(document.cookie)
  export default {
    setup() {
      // const sendData = () => {
      //   // Prepare data object
      //   const data = {
      //     type: this.model,
      //     name: this.namegoods,
      //     price: this.payments,
      //     description: this.deskripsi,
      //     file: this.file,
      //   }

      //   // Send data to the server using axios (replace the URL with your actual API endpoint)
      //   axios
      //     .post('http://localhost:8080/productReq', data)
      //     .then((response) => {
      //       console.log('Data sent successfully:', response.data)
      //       // Reset form fields if needed
      //       this.model = null
      //       this.namegoods = ''
      //       this.payments = ''
      //       this.deskripsi = ''
      //       this.file = ''
      //     })
      //     .catch((error) => {
      //       console.error('Error sending data:', error)
      //     })
      // }
      return {
        model: ref(null),
        deskripsi: ref(''),
        payments: ref(''),
        namegoods: ref(''),
        file: ref(undefined),

        options: [1, 2, 3, 4],
      }
    },
    methods: {
      tes() {
        console.log(this.model)
      },
      async sendData() {
        const formData = new FormData()
        formData.append('title', this.namegoods)
        formData.append('typeId', this.model)
        formData.append('desc', this.deskripsi)
        formData.append('price', this.payments)
        formData.append('picture', this.file)
        // for (const pair of formData.entries()) {
        //   console.log(pair[0], pair[1])
        // }
        try {
          const response = await api
            .post(
              'http://localhost:8080/productReq/create',
              {
                title: this.namegoods,
                typeId: this.model,
                desc: this.deskripsi,
                price: this.payments,
                picture: this.file,
              },
              {
                withCredentials: true,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                data: {
                  title: this.namegoods,
                  typeId: this.model,
                  desc: this.deskripsi,
                  price: this.payments,
                  picture: this.file,
                },
              }
            )
            .then((response) => {
              const responseData = response.data.data
              console.log(responseData)
            })
        } catch (error) {
          console.log(error.message)
        }
      },
    },
  }
</script>
