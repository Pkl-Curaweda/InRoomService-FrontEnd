<template>
    <div class="q-pa-md q-gutter-sm">
      <q-btn rounded label="Total" style="background-color: #16A75C; width: 9%;" @click="Total = true" />
  
      <q-dialog v-model="Total">
    <q-card>
      <q-card-section class="bg-white text-black" style="width: 316px; height: fit-content; padding: 24px 0; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="font-weight: bold;" class="text-h6 text-black">Total</div>
        <div class="text-h7 text-black" style="text-align: center;">Semua nya menjadi :</div>
        <div class="text-h7 text-black" style="text-align: center;">Rp.200.000</div>
      </q-card-section>
   
      <q-card-actions align="center" class="text-white" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <q-btn rounded label="Bayar" style="background-color: #16A75C; width: 50%;" text-color="black" @click="BayarBerhasil = true" />
      </q-card-actions>
  
      <q-card-actions align="center" class="text-white" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <q-btn rounded label="Kembali" style="background-color: #B7B7B7; width: 50%;" text-color="black" bg-color="grey" v-close-popup />
      </q-card-actions> 
  
    </q-card>
  </q-dialog>
  
  
      <q-dialog v-model="BayarBerhasil" transition-show="scale" transition-hide="scale">
        <q-card >
      <q-card-section class="bg-white text-black" style="width: 316px; height: fit-content; padding: 24px 0; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div class="text-h6 text-black" >Succeed</div>
        <q-icon name="check_circle" size="40px" color="green"></q-icon>
        <div class="text-h6" style="color:#B7B7B7;">Payment Is Complete</div>
        <div class="text-h7 text-black" style="text-align: center;">Rp.200.000</div>
      </q-card-section>
   
          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn rounded style="background-color: #B7B7B7; width: 50%;" text-color="black" flat label="Kembali" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <profile-page nama="Akbar" keterangan="Kanyut" />
  
  </template>
  
  <script>
  import { ref } from 'vue'
  import ProfilePage from './ProfilePage.vue';
  
  export default {
      setup() {
          return {
              Total: ref(false),
              BayarBerhasil: ref(false)
          };
      },
      components: { ProfilePage }
  }
  </script>
  