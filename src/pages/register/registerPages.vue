<template>
  <div>
    <q-form class="flex flex-col gap-4 items-center justify-center" @submit.prevent="postdataAPI">
      <q-input
        outlined
        v-model="user"
        label="Username"
        for="username"
        placeholder="Enter Username Here"
        color="dark"
        bg-color="white"
        class="w-full"
        :error="userError !== ''"
        :error-message="userError">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        outlined
        v-model="name"
        label="name"
        for="name"
        placeholder="Enter Username Here"
        color="dark"
        @input="checkAll"
        bg-color="white"
        class="w-full"
        :error="nameError !== ''"
        :error-message="nameError">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-select
        outlined
        v-model="selectedGender"
        :options="optionGender"
        label="select Gender"
        color="dark"
        class="outline-none focus:bg-none active:bg-none w-full"
        bg-color="white"
        :error="genderError !== ''"
        :error-message="genderError" />

      <q-input
        outlined
        v-model="pw"
        :type="passwordFieldType"
        label="Password"
        for="password"
        color="dark"
        class="w-full"
        bg-color="white"
        @input="checkPassword"
        :error="passwordError !== ''"
        :error-message="passwordError">
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="passwordFieldType === 'password' ? 'visibility' : 'visibility_off'"
            @click="togglePasswordVisibility"
            class="cursor-pointer" />
        </template>
      </q-input>
      <q-input
        outlined
        v-model="email"
        class="w-full"
        :type="emailFieldType"
        @input="validateEmail"
        label="Email"
        for="email"
        color="dark"
        bg-color="white"
        :error="emailError !== ''"
        :error-message="emailError">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>
      <q-input
        outlined
        v-model="phone"
        label="Phone Number"
        type="number"
        for="phone"
        placeholder="Enter Phone Number Here"
        color="dark"
        bg-color="white"
        class="w-full"
        :error="phoneError !== ''"
        :error-message="phoneError">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="nik"
        label="NIK"
        for="NIK"
        placeholder="Enter NIK here"
        color="dark"
        bg-color="white"
        class="w-full"
        :error="nikError !== ''"
        :error-message="nikError">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input
        outlined
        for="date"
        color="dark"
        label="Birth Day"
        type="date"
        bg-color="white"
        class="w-full"
        placeholder="YYYY/MM/DD"
        v-model="selectedDate">
        <template #append>
          <q-icon
            :name="dropDown"
            class="text-[#069550] cursor-pointer"
            size="35px"
            @click="toggleDropdown">
            <q-popup-proxy>
              <q-date v-model="selectedDate" :mask="mask" default-view="Years" color="green" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <div v-if="showError" class="w-full h-20 bg-green">
        <p>Password harus memiliki setidaknya 6 karakter.</p>
      </div>
      <!-- <div v-if="!showErrorEmail" class="w-full h-20 bg-green">
        <p>Alamat Email harus mengandung '@'</p>
      </div> -->
      <q-btn
        unelevated
        rounded
        color="green"
        label="Submit"
        text-color="dark"
        @click="postdataAPI"
        class="px-8"
        :class="{ blur: shadow }" />
      <q-btn
        unelevated
        rounded
        color="grey-5"
        label="Cancel"
        @click="cancletoggle"
        text-color="dark"
        class="px-8" />
    </q-form>
  </div>
</template>

<script>
  import { computed, ref, watch } from 'vue'
  import api from 'src/AxiosInterceptors'

  export default {
    name: 'register',
    data() {
      return {
        user: '',
        name: '',
        pw: '',
        email: '',
        phone: '',
        emailFieldType: 'email',
        passwordFieldType: 'password',
        selectedDate: '',
        passwordError: '',
        nameError: '',
        userError: '',
        emailError: '',
        phoneError: '',
        genderError: '',
        showError: false,
        shadow: true,
        role: '1',
        nik: '',
        nikError: '',
        selectedGender: null,
        optionGender: ['Female', 'Male'],
        picture: '../../assets/img/crash.jpg',
        // showErrorEmail: true,
      }
    },
    setup() {},
    methods: {
      async postdataAPI() {
        // if (this.selectedDate) {
        //   this.selectedDate = this.selectedDate + 'T00:00:00'
        // }
        if (this.selectedDate) {
          const dateObj = new Date(this.selectedDate)
          this.selectedDate = dateObj.toISOString()
        }

        const data = {
          username: this.user,
          password: this.pw,
          birthday: this.selectedDate,
          email: this.email,
          phone: this.phone,
          name: this.name,
          roleId: this.role,
          nik: this.nik,
          gender: this.selectedGender.toUpperCase(),
          picture: this.picture,
        }

        try {
          const response = await api.post('/auth/register', data, {
            withCredentials: true,
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          })
          console.log(response.message)
          this.$router.push('/mitra')
        } catch (error) {
          console.error('Error post data: ', error)
          // alert('Registration Failed')
          if (error.response && error.response.data && error.response.data.message) {
            // Menampilkan pesan kesalahan dari backend ke pengguna
            alert(error.response.data.message)
          } else {
            alert('Registration Failed')
          }
        }
      },
      cancletoggle() {
        const reqtoggle = confirm('apakah anda ingin membatalkan registrasi? ')
        reqtoggle == 1 ? this.$router.push('/login') : ''
      },
      togglePasswordVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      validatePassword() {
        if (this.pw.length <= 6) {
          this.passwordError = 'Password must be at 6 characters'
          // this.showError = true
        } else {
          this.passwordError = ''
          // this.showError = false
        }
      },
      checkPassword() {
        if (this.pw.length <= 6 || this.pw == null) {
          this.showError = true
        } else {
          this.showError = false
        }
      },
      // validateEmail() {
      //   this.showErrorEmail = this.email.includes('@')
      // },
      checkAll() {
        this.passwordError = this.pw.length <= 6 ? 'Password must be at least 6 characters' : ''

        if (this.user.length <= 6) {
          this.userError = 'Password must be at 6 characters'
          // this.showError = true
        } else {
          this.userError = ''
          // this.showError = false
        }

        if (this.name.length == 0) {
          this.nameError = 'Password must not null'
        } else {
          this.nameError = ''
          // this.showError = false
        }
        this.genderError = this.selectedGender == null ? 'Gender must not be empty' : ''
        this.emailError = this.email.length == 0 ? 'Password must not null' : ''
        this.phoneError = this.phone.length == 0 ? 'Password must not null' : ''
        this.nikError = this.nik.length == 0 ? 'Password must not null' : ''
        if (
          this.pw.length >= 6 &&
          this.name.length >= 1 &&
          this.user.length >= 6 &&
          this.email.length >= 1 &&
          this.phone.length >= 1 &&
          this.nik.length >= 1
        ) {
          this.shadow = false
        } else {
          this.shadow = true
        }
      },
    },
    // computed: {
    //   isPasswordValid() {
    //     return this.pw.length >= 6
    //   },
    // },
    watch: {
      pw: 'checkAll',
      name: 'checkAll',
      user: 'checkAll',
      phone: 'checkAll',
      email: 'checkAll',
      nik: 'checkAll',
      gender: 'checkAll',
    },
  }
</script>
<style>
  .blur {
    pointer-events: none;
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
