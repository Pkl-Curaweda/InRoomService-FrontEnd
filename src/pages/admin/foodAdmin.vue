<template>
  <div class="min-w-full p-3 min-h-full bg-white mt-10">
    <q-card class="p-3 rounded-xl shadow-md overflow-x-hidden">
      <!-- START OF TABLE -->
      <q-table
        class="my-table table-rounded"
        flat
        bordered
        title=""
        :rows="filteredRows"
        :columns="columns"
        row-key="name">
        <!-- rounded -->
        <!-- <template v-slot:body-row="props">
          <q-tr :props="props" class="rounded-row" />
        </template> -->
        <!-- 
        <template v-slot:top-row>
          <q-tr>
            <q-th v-for="column in columns" :key="column.name">
              {{ column.label }}
            </q-th>
          </q-tr>
        </template> -->

        <!-- SEARCH BAR -->
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

        <!-- DETAIL ACTION -->
        <template v-slot:body-cell-detailaction="props">
          <q-td :props="props">
            <q-btn-dropdown class="text-white bg-green text-semibold round" label="detail">
              <q-list>
                <q-item
                  class="bg-green text-white m-2 rounded-sm px-10"
                  v-for="option in detailOptions"
                  :key="option.id"
                  clickable
                  v-close-popup
                  @click="onItemClick(option)">
                  <q-item-section>
                    <q-item-label>{{ option.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </q-table>
      <!-- END OF TABLE -->
    </q-card>

    <!-- BUTTON ACTION -->
    <q-card-actions class="flex justify-end gap-5 mt-5">
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-white font-bold"
        label="back"
        name="back" />
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-white font-bold"
        label="next"
        name="next" />
    </q-card-actions>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'

  const columns = [
    {
      name: 'image',
      required: true,
      label: 'Image',
      align: 'left',
      field: (row) => row.name,
      format: (val) => `${val}`,
      sortable: true,
      style: 'width: 15px; border-radius: 10px 0 0 10px;',
    },
    { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
    { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
    {
      name: 'price',
      label: 'Price',
      field: 'price',
      sortable: true,
      align: 'center',
      sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    },

    {
      name: 'detailaction',
      label: 'Detail',
      align: 'center',
      style: 'width: 15px; border-radius: 0 10px 10px 0;',
    },
  ]

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
    {
      image: 'Ayam Taliwang.jpg',
      id: 777,
      name: 'Ayam Taliwang',
      price: 'Rp. 98.500',
      detail: 'Detail',
    },
    {
      image: 'Ayam Taliwang.jpg',
      id: 888,
      name: 'Ayam Taliwang',
      price: 'Rp. 100.500',
      detail: 'Detail',
    },
  ]

  const detailOptions = [
    { id: 1, label: 'Heavy Meal' },
    { id: 2, label: 'Snack' },
  ]

  export default {
    setup() {
      const filter = ref('')

      const filteredRows = computed(() => {
        const searchTerm = filter.value.toLowerCase().trim()
        if (!searchTerm) {
          return rows
        } else {
          return rows.filter((row) => {
            return (
              row.name.toLowerCase().includes(searchTerm) ||
              row.price.toLowerCase().includes(searchTerm) ||
              row.id.toString().includes(searchTerm)
            )
          })
        }
      })

      const onItemClick = (option) => {
        // Handle item click based on the selected option
        // You can access the selected option using 'option'
      }

      return {
        columns,
        filteredRows,
        filter,
        detailOptions,
        onItemClick,
      }
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
