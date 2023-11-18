<template>
  <div class="bg-white q-pa-md">
    <div class="bagianpertama mt-16">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="shopping_cart" size="20px " />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Types of Goods
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-select
          color="grey-3"
          outlined
          label-color="green"
          v-model="typegoods"
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
      <div class="q-gutter-y-md column">
        <q-card>
          <q-input
            standout="bg-teal text-white"
            v-model="namegoods"
            bg-color="white"
            label="Name"
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
      <div class="q-gutter-y-md column">
        <q-card>
          <q-input
            standout="bg-teal 
            text-white"
            v-model="payments"
            bg-color="white"
            label="Price"
            :dense="dense" />
        </q-card>
      </div>
    </div>

    <div class="bagiankeempat mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="edit_note" size="20px" />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Description
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-card>
          <q-input
            type="textarea"
            standout="bg-teal text-white"
            bg-color="white"
            v-model="deskripsi"
            label="Description"
            :dense="dense" />
        </q-card>
      </div>

      <div class="mt-6">
        <div class="flex items-center px-1 gap-2">
          <q-icon color="green" name="folder" size="20px" />
          <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
            Upload Image
          </h2>
        </div>
        <div class="q-gutter-sm row items-start">
          <q-card>
            <q-uploader
              url="http://localhost:4444/upload"
              color="green"
              square
              flat
              bordered
              max-files="1"
              style="max-width: 300px" />
          </q-card>
        </div>
      </div>

      <!-- <div class="q-gutter-md" style="max-width: 300px">
            <q-card>
              <q-file filled v-model="file" label="Click To Upload" max-files="1">
                <template v-slot:before>
                  <q-icon name="folder_open" />
                </template>
              </q-file>
            </q-card>
          </div> -->

      <div class="q-gutter-sm mx-auto mt-6 w-fit">
        <q-btn unelevated rounded color="green" label="SEND" @click="sendData()" />
        <q-btn outline rounded color="green" label="BACK" @click="navigate.back()" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
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
        navigate: useRouter(),
        typegoods: ref(''),

        options: ['Food', 'Drink', 'Laundry', 'Cleaning Tool'],
      }
    },
    methods: {
      tes() {
        console.log(this.model)
      },
      sendData() {
        const data = {
          title: this.namegoods,
          type: this.model,
          desc: this.deskripsi,
          price: this.payments,
          picture: this.file,
        }

        axios
          .post('http://localhost:8080/productReq/create', data, {
            withCredentials: true,
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => {
            console.log('Data sent successfully:', response.data)
            // Reset form fields if needed
            this.model = null
            this.namegoods = ''
            this.payments = ''
            this.deskripsi = ''
            this.file = ''
          })
          .catch((error) => {
            console.error('Error sending data:', error)
          })
      },
    },
  }
</script>
