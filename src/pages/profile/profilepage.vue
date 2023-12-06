<template>
  <div class="bg-white" v-if="userData">
    <div class="py-8 bg-[#069550] h-24 justify-center items-center px-auto"></div>

    <div>
      <div class="relative">
        <q-card class="rounded absolute -top-34 w-[80%] left-1/2 transform -translate-x-1/2 px-2">
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
              :src="userData.data.picture || '../../assets/img/profile.jpg'"
              class="ayam rounded-full"
              style="width: 65px; height: 65px">
            </q-img>
            <div>
              <h2 class="text-black open-sans text-2xl font-bold">{{ userData.data.name }}</h2>
              <h2 class="text-black open-sans text-lg">{{ idName }}</h2>
            </div>
          </q-card-section>
        </q-card>
        <div class="flex items-center px-4 gap-2 mt-20">
          <h2
            class="text-black open-sans font-bold"
            style="font-size: 20px; justify-content: left; margin-left: 10px">
            Phone
          </h2>
        </div>
        <q-card class="mt-2 mx-2 rounded">
          <q-card-sectionhorizontal
            class="bg-white text-black w-full"
            style="
              justify-content: space-between;
              height: fit-content;
              padding: 0 10px;
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 30px;
            ">
            <div>
              <q-input
                :disabled="!editable"
                v-model="phoneUpdate"
                label="phone"
                for="phone"
                color="dark"
                @input="checkAll"
                bg-color="white"
                :placeholder="phoneUpdate"
                class="w-full">
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>
            </div>
            <button @click="updatephone()" class="text-green-500 open-sans cursor-pointer">
              CHANGE
            </button>
          </q-card-sectionhorizontal>
        </q-card>
      </div>

      <div class="bagianketiga mt-12">
        <div class="flex items-center px-4 gap-4">
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
              padding: 0 10px;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              gap: 30px;
            ">
            <div>
              <q-input
                :disabled="!editable"
                v-model="nikUpdate"
                label="nik"
                for="nik"
                color="dark"
                @input="checkAll"
                bg-color="white"
                :placeholder="nikUpdate"
                class="w-full">
                <template v-slot:prepend>
                  <q-icon name="fingerprint" />
                </template>
              </q-input>
            </div>
            <button @click="updatenik()" class="text-green-500 open-sans cursor-pointer">
              CHANGE
            </button>
          </q-card-section>
        </q-card>
      </div>

      <div class="bagianketiga mt-12">
        <div class="flex items-center px-4 gap-4">
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
              padding: 0 10px;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              gap: 30px;
            ">
            <div>
              <q-input
                :disabled="!editable"
                v-model="emailUpdate"
                label="email"
                for="email"
                color="dark"
                @input="checkAll"
                bg-color="white"
                :placeholder="emailUpdate"
                class="w-full">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>
            <button @click="updateemail()" class="text-green-500 open-sans cursor-pointer">
              CHANGE
            </button>
          </q-card-section>
        </q-card>
      </div>

      <div class="bagiantujuh mt-12">
        <div class="flex items-center px-4 gap-4">
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
              padding: 10px;
              display: flex;
              flex-direction: row;
              justify-content: left;
              margin-left: 10px;
              align-items: center;
              gap: 30px;
            ">
            <div>
              <h2 class="text-black open-sans text-lg lowercase" style="font-size: 16px">
                {{ userData.data.gender }}
              </h2>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="bagiandelapan mt-12">
        <div class="flex items-center px-4 gap-4">
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
              padding: 10px;
              display: flex;
              flex-direction: row;
              justify-content: left;
              margin-left: 10px;
              align-items: center;
              gap: 30px;
            ">
            <div>
              <h2 class="text-black open-sans text-lg" style="font-size: 16px">
                {{ formatDate(userData.data.birthday) }}
              </h2>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-gutter-sm mx-auto my-6 w-fit">
        <q-icon
          @click="checkdata()"
          color="green"
          name="logout"
          size="25px"
          class="p-1 rounded-full w-fit">
          <q-btn
            text-color="green"
            unelevated
            size="md"
            rounded
            padding="sm"
            label="back"
            @click="checkdata()"
            class="px-20 font-sans w-full font-semibold items-center text-bold">
          </q-btn>
        </q-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import api from 'src/AxiosInterceptors'

  export default {
    name: 'profile',
    data() {
      return {
        phoneUpdate: null,
        emailUpdate: null,
        nikUpdate: null,
        userData: null,
        idName: '',
        admin: null,
        confirmExit: null,
        updateEmail: false,
        updatePhone: false,
        updateNik: false,
        editable: false,
      }
    },
    mounted() {
      this.getdataAPI()
    },
    setup() {},
    methods: {
      async updatenikAPI() {
        try {
          const update = await api.put(
            '/profile/updateNIK',
            {
              nik: this.nikUpdate,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            }
          )
        } catch (error) {
          console.error('Error post data: ', error)
          // alert('Registration Failed')
          if (error.response && error.response.data && error.response.data.message) {
            // Menampilkan pesan kesalahan dari backend ke pengguna
            alert(error.response.data.message)
          } else {
            alert('Update data failed')
          }
        }
      },
      async updateemailAPI() {
        try {
          const update = await api.put(
            '/profile/updateEmail',
            {
              email: this.emailUpdate,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            }
          )
        } catch (error) {
          console.log('Error post data: ', error)

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message)
          } else {
            alert('Update data failed')
          }
        }
      },
      async updatephoneAPI() {
        this.editable = !this.editable

        if (!this.editable) {
          console.log('Phone number updated:', this.phoneUpdate)
        }
        try {
          const update = await api.put(
            '/profile/updateNumber',
            {
              phone: this.phoneUpdate,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            }
          )

          console.log(update.message)
          // this.$router.push('/profile')
        } catch (error) {
          console.error('Error post data: ', error)
          // alert('Registration Failed')
          if (error.response && error.response.data && error.response.data.message) {
            // Menampilkan pesan kesalahan dari backend ke pengguna
            alert(error.response.data.message)
          } else {
            alert('Update data failed')
          }
        }
      },
      async getdataAPI() {
        try {
          const response = await api.get('/profile', { withCredentials: true }) // Endpoint untuk mendapatkan data pengguna
          const user = {
            name: response.data.name,
            username: response.data.username,
            birthday: response.data.birthday,
          }
          // this.updatePhone = this.response.data.phone
          this.userData = response.data // Menambahkan data pengguna ke dalam array userData
          this.phoneUpdate =
            this.userData.data && this.userData.data.phone ? this.userData.data.phone : ''
          this.admin =
            this.userData.data && this.userData.data.roleId ? this.userData.data.roleId : ''
          this.nikUpdate =
            this.userData.data && this.userData.data.nik ? this.userData.data.nik : ''
          this.emailUpdate =
            this.userData.data && this.userData.data ? this.userData.data.email : ''

          console.log('User data:', this.userData.data)
          console.log('User data:', this.userData.data.picture)
          // console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }

        if (this.admin == 1) {
          this.idName = 'admin'
          console.log(this.idName)
        } else {
          console.log('error')
        }
      },
      formatDate(date) {
        const formattedDate = new Date(date)
        return formattedDate.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      },
      changetelephone() {
        this.updatePhone = !this.updatePhone

        if (!this.updatePhone) {
          // Di sini Anda dapat menambahkan logika lain jika diperlukan saat nilai updatePhone bernilai false
          console.log('Update phone number cancelled')
        } else {
          // Di sini Anda dapat menambahkan logika lain jika diperlukan saat nilai updatePhone bernilai true
          console.log('Changing phone number')
        }
      },
      updatephone() {
        const change = confirm('are you sure change number telephone?')
        change == true ? this.updatephoneAPI() : ''
      },
      updatenik() {
        const change = confirm('are you sure change NIK?')
        change == true ? this.updatenikAPI() : ''
      },
      updateemail() {
        const change = confirm('are you sure change email?')
        change == true ? this.updateemailAPI() : ''
      },
      checkdata() {
        if (
          this.phoneUpdate != this.userData.data.phone ||
          this.nikUpdate != this.userData.data.nik ||
          this.emailUpdate != this.userData.data.email
        ) {
          this.confirmExit = confirm('are you sure exit?')
          console.log('cancle input')
          this.confirmExit == true ? this.$router.push('/home') : ''
        } else {
          this.$router.push('/home')
        }
      },
    },
  }
</script>

<style scoped></style>
