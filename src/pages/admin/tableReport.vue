<template>
  <div class="min-w-full p-3 min-h-full bg-white mt-10">
    <q-card class="p-3 rounded-xl shadow-md overflow-x-hidden">
     <!-- Table -->
      <q-table
        class="my-table q-mb-md"
        flat
        bordered
        title=""
        :rows="tableData"
        :columns="columns"
        row-key="no">
        <template v-slot:body-cell-action="props">
          <q-td :props="props" :key="props.col.name">
            <q-btn
              dense
              flat
              color="green"
              icon="edit"
              @click="handleEdit(props.row)"
            />
            <q-btn
              dense
              flat
              color="negative"
              icon="delete"
              @click="handleDelete(props.row)"
            />
          </q-td>
        </template>
      </q-table>
      </q-card>
      </div>
</template>

<script>
export default {
  data() {
    return {
     columns : [
        { name: 'no', align:'center', label: 'NO', field:'no', sortable: true },
        { name: 'nameshop', align:'center', label: 'Name Shop', field:'nameshop', sortable: true },
        { name: 'tog', align:'center', label: 'Type of Goods', field:'tog', sortable: true },
        { name: 'commission', align:'center', label: 'Commission', field:'commission',  sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),},
        { name: 'month', align:'center', label: 'Month', field:'month',  sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),},
        { name: 'action', align:'center', label: 'Action', field:'action', style: 'width: 5px; border-radius: 0 10px 10px 0;', },
      ],
    tableData : [
        { no: '1', nameshop: 'Ayam Taliwang', tog: 'Food & Beverage', commission: 'Rp. 825.000', month: 'Rp. 91.000', action: 'yes'},
        { no: '2', nameshop: 'Caesar Salad', tog: 'Food & Beverage', commission: 'Rp. 600.000', month: 'Rp. 85.000', action: 'yes'},
      ],
    };
  },
    methods: {
    handleEdit(row) {
      // Logika untuk menghandle edit
      console.log('Edit:', row);
    },
    handleDelete(row) {
      // Logika untuk menghandle delete
      console.log('Delete:', row);
    },
  },
};
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
