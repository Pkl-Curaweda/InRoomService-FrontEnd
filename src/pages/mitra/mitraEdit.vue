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
          name="serviceTypeId"
          label-color="green"
          v-model="typeService"
          :options="typeServiceOptions"
          @update:model-value="updateServiceId"
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
          name="typeId"
          outlined
          label-color="green"
          v-model="typegoods"
          @update:model-value="updateTypeId"
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
        <q-icon color="green" name="attach_money" size="20px" />
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
              accept="image/*"
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
        <q-btn
          outline
          rounded
          color="green"
          label="BACK"
          @click="navigate.push('/mitra/minimarket')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import axios from 'axios'
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue'
  import api from 'src/AxiosInterceptors'
  import { QInput, useQuasar } from 'quasar'
  console.log(document.cookie)
  export default {
    setup() {
      const imgURL = ref('')
      const img = ref(null)
      const $q = useQuasar()
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
        successNotif() {
          $q.notify({
            message: 'Item updated successfully',
            color: 'white',
            textColor: 'green',
            position: 'top',
            actions: [
              {
                icon: 'close',
                color: 'green',
                round: true,
                handler: () => {
                  /* ... */
                },
              },
            ],
          })
        },
        failedNotif() {
          $q.notify({
            message: 'Item failed to update',
            color: 'white',
            textColor: 'green',
            position: 'top',
            actions: [
              {
                icon: 'close',
                color: 'green',
                round: true,
                handler: () => {
                  /* ... */
                },
              },
            ],
          })
        },
      }
    },
    data() {
      return {
        typeService: {} as { value: Number; label: String },
        typeServiceOptions: [
          { value: 1, label: 'Mini Market' },
          { value: 2, label: 'Food Beverage' },
        ],
        serviceId: '',
        typegoods: {} as { value: Number; label: String },
        typeId: '',
        typeOptions: [
          { value: 1, label: 'Drink' },
          { value: 2, label: 'Food' },
          { value: 3, label: 'Cleaning Tool' },
          { value: 4, label: 'Medicine' },
        ],
        data: [] as { name: string; price: number; desc: string; picture: string }[],
      }
    },
    mounted() {
      this.getData()
    },
    // watch: {
    //   serviceId(newValue) {
    //     const selectedService = this.typeServiceOptions.find((option) => option.value === newValue)
    //     if (selectedService) {
    //       this.serviceId = selectedService.value
    //     }
    //   },
    // },
    methods: {
      tes() {
        console.log(this.model)
      },
      async getData() {
        try {
          const response = await api.get(`/services/1?id=${this.id}/`, {
            withCredentials: true,
          })

          if (response.data.success) {
            const serviceData = response.data.data.data[0]
            this.namegoods = serviceData.name
            this.price = serviceData.price
            this.imgURL = serviceData.picture
            this.typegoods = this.getTypeLabel(serviceData.subTypeId)
            this.typeId = serviceData.subTypeId
            this.serviceId = serviceData.serviceTypeId
            this.typeService = this.getServiceLabel(serviceData.serviceTypeId)
            this.deskripsi = serviceData.desc
          } else {
            console.error('Error: Service request was not successful')
          }

          // console.log(response.data.data.data.picture)
        } catch (error) {
          console.error('error fetching data', error)
        }
      },
      updateServiceId() {
        this.serviceId = this.typeService.value
        console.log('tes')
      },
      updateTypeId() {
        this.typeId = this.typegoods.value
      },
      updateData() {
        const formData = new FormData()

        formData.append('name', this.namegoods)
        formData.append('serviceTypeId', this.serviceId) // ngambil dari select
        formData.append('subTypeId', this.typeId) // ngambil dari yang duh di set di database
        formData.append('desc', this.deskripsi)
        formData.append('price', this.price)
        formData.append('picture', this.img)
        console.log(this.typeService.value)
        api
          .put(`/services/update/${this.id}`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            this.successNotif()
            console.log('Data updated successfully', response.data)
          })
          .catch((error) => {
            this.failedNotif()
            console.error('Error update data:', error)
          })
      },
      // async updateData() {
      //   try {
      //     const updatedData = {
      //       title: this.namegoods,
      //       serviceTypeId: this.typeService.value,
      //       typeId: this.typegoods.value,
      //       desc: this.deskripsi,
      //       price: this.price,
      //       picture: this.img,
      //     }
      //     await api
      //       .put(`/productReq/update/${this.id}`, updatedData, {
      //         withCredentials: true,
      //         headers: {
      //           'Content-Type': 'multipart/form-data',
      //         },
      //       })
      //       .then((response) => {
      //         console.log('Data updated successfully', response.data)
      //       })
      //   } catch (error) {
      //     console.log(this.typeService.value)
      //     console.error('Error update data', error)
      //   }
      // },
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
