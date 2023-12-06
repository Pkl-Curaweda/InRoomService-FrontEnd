<template>
  <div class="min-w-full p-3 min-h-full bg-white mt-10">
    <q-card class="p-3 rounded-xl shadow-md overflow-x-hidden">
      <!-- START OF TABLE -->
      <q-table
        class="my-table table-rounded"
        flat
        bordered
        title=""
        :rows="filteredData"
        :loading="loading"
        :columns="columns"
        v-model:pagination="pagination"
        row-key="name">
        <template v-slot:top-right>
          <div class="bg-gray-100 px-2 rounded-md">
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              input-class="placeholder-color text-black"
              placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" class="text-black" />
              </template>
            </q-input>
          </div>
        </template>
        <!-- img -->
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
            <q-img :src="props.row.picture" class="w-[75px] h-auto rounded-xl" />
          </q-td>
        </template>
        <!-- DETAIL ACTION -->
        <template v-slot:body-cell-detailaction="props">
          <q-td :props="props">
            <!-- <q-btn-dropdown class="text-white bg-green text-semibold round" label="detail">
              <q-list> -->
            <!-- <q-item
                  class="bg-green text-white m-2 rounded-sm px-10"
                  v-for="option in typeServiceOptions"
                  :key="option.value"
                  clickable
                  v-close-popup
                  @click="onItemClick(option)">
                  <q-item-section>
                    <q-item-label>{{ option.label }}</q-item-label>
                  </q-item-section>
                </q-item> -->
            <!-- </q-list>
            </q-btn-dropdown> -->
            {{ getService(props.row.typeId) }}
            <!-- <q-img :src="props.row.picture"  style="width: 100px; height: auto; border-radius: 10px;" /> -->
          </q-td>
        </template>
      </q-table>
      <!-- END OF TABLE -->
    </q-card>

    <!-- BUTTON ACTION -->
  </div>
</template>

<script lang="ts">
  import api from 'src/AxiosInterceptors'
  import { ref, computed } from 'vue'

  const rows = [
    {
      image: 'Ayam Taliwang.jpg',
      id: 111,
      name: 'Ayam Taliwang',
      price: 'Rp. 98.500',
      detail: 'Detail',
    },
    {
      image: 'Ayam Taliwang.jpg',
      id: 222,
      name: 'Ayam Taliwang',
      price: 'Rp. 98.500',
      detail: 'Detail',
    },
    {
      image: 'Ayam Taliwang.jpg',
      id: 333,
      name: 'Ayam Taliwang',
      price: 'Rp. 98.500',
      detail: 'Detail',
    },
    {
      image: 'Ayam Taliwang.jpg',
      id: 444,
      name: 'Ayam Taliwang',
      price: 'Rp. 98.500',
      detail: 'Detail',
    },
    {
      image: 'Ayam Taliwang.jpg',
      id: 555,
      name: 'Ayam Taliwang',
      price: 'Rp. 98.500',
      detail: 'Detail',
    },
    {
      image: 'Ayam Taliwang.jpg',
      id: 666,
      name: 'Ayam Taliwang',
      price: 'Rp. 98.500',
      detail: 'Detail',
    },
  ]
  const detailOptions = [
    { id: 1, label: 'Medicine' },
    { id: 2, label: 'Food' },
    { id: 2, label: 'Drink' },
    { id: 2, label: 'Cleaning Tool' },
  ]

  export default {
    setup() {
      const columns = [
        {
          name: 'image',
          label: 'Image',
          align: 'center',
          field: 'picture',
          sortable: false,
          style: 'width: 15px; border-radius: 10px 0 0 10px;',
        },
        { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
        { name: 'title', align: 'center', label: 'Name', field: 'title', sortable: true },
        {
          name: 'price',
          label: 'Price',
          field: 'price',
          sortable: true,
          align: 'center',
          sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
        },

        {
          name: 'detailaction',
          label: 'Detail',
          align: 'center',
          field: 'typeId',
          style: 'width: 15px; border-radius: 0 10px 10px 0;',
        },
      ]
      // const filter = ref('')
      // const data = ref()
      // const filteredRows = computed(() => {
      //   const searchTerm = filter.value.toLowerCase().trim()
      //   if (!searchTerm) {
      //     return data
      //   } else {
      //     return data.filter((row) => {
      //       return (
      //         row.title.toLowerCase().includes(searchTerm) || row.id.toString().includes(searchTerm)
      //       )
      //     })
      //   }
      // })

      const onItemClick = (option: any) => {
        // Handle item click based on the selected option
        // You can access the selected option using 'option'
      }
      const pagination = ref({
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 3,
      })
      const market = ref(
        [] as {
          id: any
          picture: String
          title: String
          price: Number
          typeId: Number
          serviceTypeId: Number
          user: {
            name: String
          }
        }[]
      )

      api.get('/productReq/status/ACCEPTED', { withCredentials: true }).then((response) => {
        market.value = response.data.data.filter(
          (item: { serviceTypeId: number }) => item.serviceTypeId === 1
        )
      })
      const loading = ref(true)
      return {
        columns,
        loading,
        pagination,
        // filteredRows,
        // filter,
        rows,
        market,
        detailOptions,
        onItemClick,
      }
    },
    data() {
      return {
        typegoods: null,
        typeOptions: [
          { value: 1, label: 'Drink' },
          { value: 2, label: 'Food' },
          { value: 3, label: 'Cleaning Tool' },
          { value: 4, label: 'Medicine' },
          // Add more options as needed
        ],
        data: [] as {
          id: any
          picture: String
          title: String
          price: Number
          typeId: Number
          serviceTypeId: Number
          user: {
            name: String
          }
        }[],
        filter: '',
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      async getData() {
        try {
          const response = await api.get('/productReq/status/ACCEPTED', { withCredentials: true })
          this.data = response.data.data.filter(
            (item: { serviceTypeId: number }) => item.serviceTypeId === 1
          )
          console.log(response.data.data)
        } catch (error) {
          console.error(error)
        }
      },

      getService(typeId: any) {
        const labels = {
          1: 'Drink',
          2: 'Food',
          3: 'Cleaning Tool',
          4: 'Medicine',
        }

        return labels[typeId] || 'Unknown'
      },
    },
    computed: {
      filteredData() {
        const lowerCaseFilter = this.filter.toLowerCase()
        return this.market.filter(
          (item) =>
            item.title.toLowerCase().includes(lowerCaseFilter) ||
            item.user.name.toLowerCase().includes(lowerCaseFilter) ||
            this.getService(item.typeId).toLowerCase().includes(lowerCaseFilter)
        )
      },
    },
  }
</script>

<style lang="scss">
  .my-table {
    border-radius: 0.375rem;
  }
  .q-table tbody tr:nth-child(even) {
    background-color: #f1fff4; /* Warna abu-abu untuk baris genap */
  }

  .q-table tbody tr:nth-child(odd) {
    background-color: #ffffff; /* Warna putih untuk baris ganjil */
  }

  .q-table thead th {
    background-color: #069550; /* Ganti dengan warna latar belakang yang Anda inginkan untuk header */
    color: #ffffff; /* Warna teks di header */
    font-weight: bold;
  }

  .table-rounded thead tr:first-child th:first-child {
    border-radius: 10px 0 0 10px;
  }

  .table-rounded thead tr:first-child th:last-child {
    border-radius: 0 10px 10px 0;
  }

  .table-rounded tbody tr {
    border-spacing: 0.25rem 0.25rem;
    row-gap: 1px;
    margin: 10px 0 !important;
  }
  .q-table tbody tr:hover {
    background-color: initial;
  }
  .q-table tbody tr:margin {
    margin: 10px 0 !important;
  }
</style>
