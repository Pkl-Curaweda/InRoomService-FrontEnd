<template>
  <div class="min-w-full p-3 min-h-full bg-white mt-10">
    <q-select
      outlined
      name="serviceTypeId"
      label-color="green"
      class="w-52 ml-4"
      v-model="typeService"
      :options="typeServiceOptions"
      label="Service">
    </q-select>
    <!-- <p>{{ formattedDateRange }}</p> -->
    <q-input outlined name="date" class="w-56 ml-4 text-[#069550]" v-model="formattedDateRange">
      <template #append>
        <q-icon
          name="arrow_drop_down"
          class="text-[#069550] cursor-pointer"
          size="24px"
          @click="toggleDropdown">
          <q-popup-proxy>
            <q-date v-model="dateModel" range color="green" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-btn class="btn p-3 mb-3 ml-4" @click="generatePDF" label="Generate PDF"></q-btn>
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
            <q-btn dense flat color="green" icon="edit" @click="handleEdit(props.row)" />
            <q-btn dense flat color="negative" icon="delete" @click="handleDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script lang="ts">
  import jsPDF from 'jspdf'
  import autoTable from 'jspdf-autotable'
  import api from 'src/AxiosInterceptors'
  import { ref, computed } from 'vue'

  export default {
    setup() {
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
        market.value = response.data.data
      })
      return {
        market,
      }
    },
    data() {
      return {
        dateModel: ref({ from: '', to: '' }),
        typeService: null,
        typeServiceOptions: [
          { value: 1, label: 'Mini Market' },
          { value: 2, label: 'Food Beverage' },
        ],
        columns: [
          { name: 'no', align: 'center', label: 'NO', field: 'no', sortable: true },
          {
            name: 'nameshop',
            align: 'center',
            label: 'Name Shop',
            field: 'nameshop',
            sortable: true,
          },
          { name: 'tog', align: 'center', label: 'Type of Goods', field: 'tog', sortable: true },
          {
            name: 'commission',
            align: 'center',
            label: 'Commission',
            field: 'commission',
            sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
          },
          {
            name: 'month',
            align: 'center',
            label: 'Month',
            field: 'month',
            sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
          },
          {
            name: 'action',
            align: 'center',
            label: 'Action',
            field: 'action',
            style: 'width: 5px; border-radius: 0 10px 10px 0;',
          },
        ],
        tableData: [
          {
            no: '1',
            nameshop: 'Ayam Taliwang',
            tog: 'Food & Beverage',
            commission: 'Rp. 825.000',
            month: 'Rp. 91.000',
            action: 'yes',
          },
          {
            no: '2',
            nameshop: 'Caesar Salad',
            tog: 'Food & Beverage',
            commission: 'Rp. 600.000',
            month: 'Rp. 85.000',
            action: 'yes',
          },
        ],
      }
    },
    methods: {
      handleEdit(row: any) {
        // Logika untuk menghandle edit
        console.log('Edit:', row)
      },
      handleDelete(row: any) {
        // Logika untuk menghandle delete
        console.log('Delete:', row)
      },
      generatePDF() {
        const doc = new jsPDF()

        const tableData = this.market.map((row) => {
          return [row.id, row.title, row.serviceTypeId, row.price, row.typeId]
        })

        const columns = [
          { header: 'NO', dataKey: 'id' },
          { header: 'Name Shop', dataKey: 'title' },
          { header: 'Type of Goods', dataKey: 'typeId' },
          { header: 'Commission', dataKey: 'price' },
          { header: 'Month', dataKey: 'serviceTypeId' },
        ]
        console.log(tableData)
        autoTable(doc, {
          head: [columns.map((column) => column.header)],
          body: tableData,
        })

        doc.save('Tes.pdf')
      },
    },
    computed: {
      dateRange() {
        return this.dateModel && this.dateModel.from && this.dateModel.to
      },
      formattedDateRange() {
        const fromDate = new Date(this.dateModel.from)
        const toDate = new Date(this.dateModel.to)

        // Check if dates are valid
        if (!isNaN(fromDate) && !isNaN(toDate)) {
          const formattedFromDate = fromDate.toLocaleDateString()
          const formattedToDate = toDate.toLocaleDateString()
          return `${formattedFromDate} - ${formattedToDate}`
        } else {
          // Default value if dates are invalid
          return 'Select the date'
        }
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
