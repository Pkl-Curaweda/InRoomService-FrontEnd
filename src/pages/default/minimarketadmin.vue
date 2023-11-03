<template>
  <div class="min-w-screen p-3 min-h-full bg-white">
    <q-card class="p-2 rounded-xl shadow-md">
      <!-- START OF TABLE -->
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title=""
        :rows="rows"
        :columns="columns"
        row-key="name">

        <!-- SEARCH BAR -->
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" input-class="placeholder-color text-white" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" class="text-white" />
            </template>
          </q-input>
        </template>

        <!-- IMAGE DATA -->
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
            <q-avatar size="50px">
              <img :src="props.row.image">
            </q-avatar>
          </q-td>
        </template>

        <!-- DETAIL ACTION -->
        <template v-slot:body-cell-detailaction="props">
          <q-td :props="props">
            <q-btn-dropdown class="text-white btnDetail" label="detail">
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Heavy Meal</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Snack</q-item-label>
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
    <q-card-actions class="flex justify-between">
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="back"
        name="back" />
      <q-btn
        class="bg-green w-32 rounded-full text-sm text-black font-bold"
        label="next"
        name="next" />
    </q-card-actions>
  </div>
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'image',
    required: true,
    label: 'Image',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true,
    style: 'width: 15px'
  },
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true , },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    sortable: true,
    align: 'center',
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  { name: 'detailaction', label: 'Detail', align: 'center' },
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
]

export default {
  setup() {
    return {
      columns,
      rows,
      filter: ref(''),
    }
  },
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 400px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #16A75C

  .q-table thead tr
    color: white 

  thead tr th
    position: sticky
    color: white
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px

  /* coloring tr */
  tbody tr:nth-child(even)
    background-color: #9cffa4

  .btnDetail
    background-color: #16A75C

</style>
