<template>
    <div class="bg-white q-pa-md">
  
      <div class="bagianpertama mt-16">
        <div class="flex items-center px-1 gap-2">
          <q-icon 
          color="green" 
          name="shopping_cart" 
          size="20px " />
          <h2
          class="text-black font-open-sans"
          style="font-size: 18px; 
          justify-content: left;">
          Typess of Goods</h2>
        </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">  
        <q-select color="grey-3"
         outlined label-color="green"
         v-model="model" :options="options"
         label="Label">
      <template v-slot:append>
          <q-icon 
          name="event" 
          color="green" />
      </template>
        </q-select>
      </div>
    </div>
    
  
    <div class="bagiankedua mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" 
           name="shopping_cart_checkout"
           size="20px" />
          <h2
          class="text-black font-open-sans"
          style="font-size: 18px; 
          justify-content: left;">
          Name of Goods</h2>
        </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-card>
          <q-input 
          standout="bg-teal text-white" 
          v-model="namegoods" 
          label="Nama Pesanan" :dense="dense" />
        </q-card>   
      </div>
    </div>
  
  
    <div class="bagianketiga mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon 
        color="green" 
        name="payments" 
        size="20px" />
          <h2
          class="text-black font-open-sans"
          style="font-size: 18px; 
          justify-content: left; ">
          Price</h2>
        </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">  
        <q-card>
          <q-input 
          standout="bg-teal 
          text-white" 
          v-model="payments" 
          label="Harga Pesanan" :dense="dense" />
        </q-card>
      </div>
    </div>
  
  
    <div class="bagiankeempat mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon 
        color="green" 
        name="edit_note" 
        size="20px" />
          <h2
          class="text-black font-open-sans"
          style="font-size: 18px; 
          justify-content: left; ">
          Deskripsi</h2>
        </div>
      <div class="q-gutter-y-md column" style="max-width: 300px;">    
        <q-card>
          <q-input 
          standout="bg-teal text-white"
          v-model="deskripsi" 
          label="Deskripsi Pesanan" :dense="dense" />
        </q-card>
      </div>
    </div>
  
  
    <div class="bagiankelima mt-6">
      <div class="flex items-center px-1  gap-2">
        <q-icon 
        color="green" 
        name="folder" 
        size="20px" />
          <h2
          class="text-black font-open-sans"
          style="font-size: 18px; 
          justify-content: left;">
          Masukan File</h2>
        </div>
      <div class="q-gutter-md" style="max-width: 300px">
        <q-card>
          <q-file 
          filled bottom-slots
          v-model="model" 
          label="Label" 
          counter max-files="12">
          <template v-slot:before>
            <q-icon name="folder_open" />
          </template>
          <template v-slot:hint>
            Field hint
          </template>
          <template v-slot:append>
            <q-btn round dense flat icon="add" @click.stop.prevent />
          </template>
          </q-file>
        </q-card>  
      </div>
    </div>

    <div class="q-gutter-sm mx-auto mt-6 w-fit">
        <q-btn unelevated rounded color="green" label="SEND" />
        <q-btn outline rounded color="green" label="BACK" />
    </div>
    
  
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      return {
        model: ref(null),
        deskripsi: ref(''),
        payments: ref(''),
        namegoods: ref(''),
       
  
        options: [
          'Food', 'Drink', 'Laundry', 'Cleaning Tool'
        ]
      }
      
    }
    
  }
  
  </script>
  