<template>
  <div class="bg-white q-pa-md">
    <div class="bagianpertama mt-16">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="storefront" size="20px " />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Service Types
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-select
          outlined
          label-color="green"
          v-model="typeService"
          :options="typeServiceOptions"
          label="Label">
        </q-select>
      </div>
    </div>
    <div class="bagianpertama mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="shopping_cart" size="20px " />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Types of Goods
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-select
          outlined
          label-color="green"
          v-model="typegoods"
          :options="typeOptions"
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
            label="Name" />
        </q-card>
      </div>
    </div>

    <div class="bagianketiga mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="price" size="20px" />
        <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
          Price
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-card>
          <q-input
            standout="bg-teal 
            text-white"
            v-model="price"
            bg-color="white"
            label="Price" />
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
            label="Description" />
        </q-card>
      </div>

      <div class="mt-6">
        <div class="flex items-center px-1 gap-2">
          <q-icon color="green" name="folder" size="20px" />
          <h2 class="text-black font-open-sans" style="font-size: 18px; justify-content: left">
            Image
          </h2>
        </div>
        <!-- <div class="q-gutter-sm row items-start">
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
        </div> -->
        <div class="q-gutter-y-md" style="max-width: 300px">
          <q-card>
            <q-file
              filled
              v-model="img"
              label="Click To Upload"
              :placeholder="img"
              max-files="1"
              @update:model-value="handleUpload()"
              type="file">
              <template v-slot:before>
                <q-icon name="folder_open" />
              </template>
            </q-file>
          </q-card>

          <q-img :src="imgURL" />
        </div>
      </div>

      <div class="q-gutter-sm mx-auto mt-6 w-fit">
        <q-btn unelevated rounded color="green" label="save" @click="updateData" />
        <q-btn outline rounded color="green" label="BACK" @click="navigate.back()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import axios from 'axios'
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue'
  import api from 'src/AxiosInterceptors'
  import { QInput } from 'quasar'
  console.log(document.cookie)
  export default {
    setup() {
      const imgURL = ref('')
      const img = ref(null)
      const handleUpload = () => {
        console.log('handleUpload is triggered')
        if (img.value) {
          imgURL.value = URL.createObjectURL(img.value)
        }
      }
      const route = useRoute()
      const id = route.params.id
      // const sendData = () => {
      //   // Prepare data object
      //   const data = {
      //     type: this.model,
      //     name: this.namegoods,
      //     price: this.price,
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
      //       this.price = ''
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
        price: ref(''),
        namegoods: ref(''),
        navigate: useRouter(),
        imgURL,
        img,
        handleUpload,
        route,
        id,
        options: ['Food', 'Drink', 'Laundry', 'Cleaning Tool'],
      }
    },
    data() {
      return {
        typeService: null,
        typeServiceOptions: [
          { value: 1, label: 'Mini Market' },
          { value: 2, label: 'Food Beverage' },
        ],
        typegoods: null,
        typeOptions: [
          { value: 1, label: 'Drink' },
          { value: 2, label: 'Food' },
          { value: 3, label: 'Cleaning Tool' },
          { value: 4, label: 'Medicine' },
          // Add more options as needed
        ],
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      tes() {
        console.log(this.model)
      },
      async getData() {
        try {
          const response = await api.get(`/productReq/${this.id}`, {
            withCredentials: true,
          })
          console.log(response.data)
          this.namegoods = response.data.data.title
          this.price = response.data.data.price
          this.deskripsi = response.data.data.desc
          this.imgURL = response.data.data.picture
          this.typegoods = this.getTypeLabel(response.data.data.typeId)
          this.typeService = this.getServiceLabel(response.data.data.serviceTypeId)
          console.log(response.data.data.picture)
        } catch (error) {
          console.error('error fetching data', error)
        }
      },

      async updateData() {
        try {
          const updatedData = {
            title: this.namegoods,
            serviceTypeId: this.typeService.value,
            typeId: this.typegoods.value,
            desc: this.deskripsi,
            price: this.price,
            picture: this.img,
          }
          await api
            .put(`/productReq/update/${this.id}`, updatedData, {
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              console.log('Data updated successfully', response.data)
            })
        } catch (error) {
          console.error('Error update data', error)
        }
      },
      getTypeLabel(typeId: any) {
        const typeOption = this.typeOptions.find((option) => option.value === typeId)
        return typeOption ? typeOption.label : null
      },
      getServiceLabel(serviceId: any) {
        const typeServiceOption = this.typeServiceOptions.find(
          (option) => option.value === serviceId
        )
        return typeServiceOption ? typeServiceOption.label : null
      },
      sendData() {
        const data = {
          title: this.namegoods,
          type: this.model,
          desc: this.deskripsi,
          price: this.price,
          // picture: this.file,
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
            this.price = ''
            this.deskripsi = ''
            // this.file = ''
          })
          .catch((error) => {
            console.error('Error sending data:', error)
          })
      },
    },
    components: { QInput },
  }
</script>
