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
          readonly
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
          readonly
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
            readonly
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
            readonly
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
            readonly
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
          <q-img :src="imgURL" />
        </div>
      </div>

      <div class="q-gutter-sm mx-auto mt-6 w-fit">
        <q-btn unelevated rounded color="green" label="accept" @click="updateData" />
        <q-btn unelevated rounded color="red" label="reject" @click="reject" />
        <q-btn outline rounded color="green" label="back" @click="navigate.back()" />
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
          // console.log(response.data)
          this.namegoods = response.data.data.title
          this.price = response.data.data.price
          this.deskripsi = response.data.data.desc
          this.imgURL = response.data.data.picture
          this.typegoods = this.getTypeLabel(response.data.data.typeId)
          this.typeService = this.getServiceLabel(response.data.data.serviceTypeId)
          // console.log(response.data.data.picture)
        } catch (error) {
          // console.error('error fetching data', error)
        }
      },

      async updateData() {
        try {
          await api
            .post(`/productReq/accept/${this.id}`, {
              withCredentials: true,
            })
            .then((response) => {
              // console.log('Data updated successfully', response.data)
            })

          this.$router.push('/admin/partners')
        } catch (error) {
          // console.error('Error update data', error)
        }
      },
      async reject() {
        try {
          await api
            .post(`/productReq/accept/${this.id}`, {
              withCredentials: true,
            })
            .then((response) => {
              // console.log('Data updated successfully', response.data)
            })

          this.$router.push('/admin/partners')
        } catch (error) {
          // console.error('Error updated data', error)
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
    },
    components: { QInput },
  }
</script>
