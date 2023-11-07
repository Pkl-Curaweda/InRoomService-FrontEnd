<template>
  <div class="bg-white">
    <div class="py-8 bg-green">
      <q-card class="mt-5 mx-2 rounded">
        <q-card-section
          class="bg-white text-black"
          style="
            height: fit-content;
            padding: 25px 0px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 30px;
          ">
          <q-img
            src="../../assets/img/profile.jpg"
            class="ayam rounded-full"
            style="width: 65px; height: 65px">
          </q-img>
          <div>
            <h2 class="text-black open-sans text-2xl font-bold">Akbar Fadhl Ramadhan</h2>
            <h2 class="text-black open-sans text-lg">Basic Member</h2>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="bagiankedua mt-16">
      <div class="flex items-center px-4 gap-2">
        <q-icon color="green" name="phone" size="20px" />
        <h2
          class="text-black open-sans font-bold"
          style="font-size: 20px; justify-content: left; margin-left: 10px">
          Nomor Telepon
        </h2>
      </div>
      <q-card class="mt-2 mx-2 rounded">
        <q-card-section
          class="bg-white text-black w-full"
          style="
            height: fit-content;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
          ">
          <h2 class="text-black open-sans text-lg" style="font-size: 16px">
            {{ telepon || '0856969091' }}
          </h2>
          <button
            @click="changetelepon"
            class="text-green-500 open-sans text-lg"
            style="font-size: 16px">
            CHANGE
          </button>
        </q-card-section>
      </q-card>
    </div>

    <div class="bagianketiga mt-12">
      <div class="flex items-center px-4 gap-4">
        <q-icon  color="green" name="mail" size="20px" />
        <h2
          class="text-black open-sans font-bold"
          style="font-size: 20px; justify-content: left; margin-left: 10px">
          Email
        </h2>
      </div>
      <q-card class="mt-2 mx-2 rounded">
        <q-card-section
          class="bg-white text-black w-full"
          style="
            height: fit-content;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
          ">
          <h2 class="text-black open-sans text-lg" style="font-size: 16px">
            {{ email || 'akbarrr210@gmail.com' }}
          </h2>
          <button
            @click="changeemail"
            class="text-green-500 open-sans text-lg"
            style="font-size: 16px">
            CHANGE
          </button>
        </q-card-section>
      </q-card>
    </div>

    <div class="bagianempat mt-12">
      <div class="flex items-center px-4 gap-4">
        <q-icon  color="green" name="fingerprint" size="20px" />
        <h2
          class="text-black open-sans font-bold"
          style="font-size: 20px; justify-content: left; margin-left: 10px">
          NIK
        </h2>
      </div>
      <q-card class="mt-2 mx-2 rounded">
        <q-card-section
          class="bg-white text-black w-full"
          style="
            height: fit-content;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
          ">
          <h2 class="text-black open-sans text-lg" style="font-size: 16px">
            {{ NIK || '2122119085' }}
          </h2>
          <button
            @click="changenik"
            class="text-green-500 open-sans text-lg"
            style="font-size: 16px">
            CHANGE
          </button>
        </q-card-section>
      </q-card>
    </div>

    <div class="bagiantujuh mt-12">
      <div class="flex items-center px-4 gap-4">
        <q-icon color="green" name="person" size="20px" />
        <h2
          class="text-black open-sans font-bold"
          style="font-size: 20px; justify-content: left; margin-left: 10px">
          Jenis Kelamin
        </h2>
      </div>
      <q-card class="mt-2 mx-2 rounded">
        <q-card-section
          class="bg-white text-black"
          style="
            height: fit-content;
            padding: 24px 0;
            display: flex;
            flex-direction: row;
            justify-content: left;
            margin-left: 10px;
            align-items: center;
            gap: 30px;
          ">
          <div>
            <h2 class="text-black open-sans text-lg" style="font-size: 16px">
              {{ gender || 'Laki-Laki' }}
            </h2>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="bagiandelapan mt-12">
      <div class="flex items-center px-4 gap-4">
        <q-icon color="green"  name="person" size="20px" />
        <h2
          class="text-black open-sans font-bold"
          style="font-size: 20px; justify-content: left; margin-left: 10px">
          Tanggal Lahir
        </h2>
      </div>
      <q-card class="mt-2 mx-2 rounded">
        <q-card-section
          class="bg-white text-black"
          style="
            height: fit-content;
            padding: 24px 0;
            display: flex;
            flex-direction: row;
            justify-content: left;
            margin-left: 10px;
            align-items: center;
            gap: 30px;
          ">
          <div>
            <h2 class="text-black open-sans text-lg" style="font-size: 16px">
              {{ gender || '21 Oktober 2005' }}
            </h2>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-gutter-sm mx-auto mt-6 w-fit">
      <q-btn unelevated rounded color="green" label="back" />
    </div>
  </div>
</template>

<script setup lang>
  import { ref } from 'vue'
  const telepon = ref('085696086038')
  const email = ref('akbarrrr210@gmail.com')
  const NIK = ref('2122119085')

  const changetelepon = () => {
    const newtelepon = prompt('Enter a new telepon: ')
    telepon.value = newtelepon
  }
  const changeemail = () => {
    const newEmail = prompt('Enter a new email address:')
    email.value = newEmail
  }
  const changenik = () => {
    const newNIK = prompt('Enter a new NIK:')
    NIK.value = newNIK
  }
</script>

<style scoped>

</style>
