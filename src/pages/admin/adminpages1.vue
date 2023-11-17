<template>
    <div class="bg-white q-pa-md">
  
      <div class="bagianpertama mt-16">
        <div class="flex items-center px-1 gap-2">
          <q-icon 
          color="green" 
          name="shopping_cart" 
          size="20px" />
          <h2
          class="text-black font-open-sans"
          style="font-size: 18px; 
          justify-content: left;">
          Typess of Goods</h2>
        </div>
        <div class="q-gutter-y-md column" >
        <q-card>
          <q-input 
          standout="bg-teal text-white" 
          v-model="typegoods" 
           />
        </q-card>   
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
      <div class="q-gutter-y-md column" >
        <q-card>
          <q-input 
          standout="bg-teal text-white" 
          v-model="namegoods" 
           />
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
      <div class="q-gutter-y-md column" >  
        <q-card>
          <q-input 
          standout="bg-teal 
          text-white" 
          v-model="payments" 
          />
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
          Food Deskripsi</h2>
        </div>
      <div class="q-gutter-y-md column">    
        <q-card>
          <q-input
          type="textarea" 
          standout="bg-teal text-white"
          v-model="deskripsi" 
          />
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
        
      <div class="q-gutter-sm row items-start" >
        <q-card>
          <q-img
          src="../../assets/img/forbidden.svg"
          class="ayam rounded-full w-70 h-70"
       
      />
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
        typegoods: ref(''),
       
  
        options: [
          'Food', 'Drink', 'Laundry', 'Cleaning Tool'
        ]
      }
      
    }
    
  }
  
  </script>
  