<template>
  <div>
    <q-form class="flex flex-col gap-4 items-center justify-center">
      <q-input
        outlined
        v-model="username"
        label="Username"
        for="username"
        placeholder="Enter Username Here"
        color="dark"
        bg-color="white"
        class="w-full">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        outlined
        v-model="pw"
        :type="passwordFieldType"
        label="Password"
        for="password"
        color="dark"
        class="w-full"
        bg-color="white">
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
        label="Email"
        for="email"
        color="dark"
        bg-color="white">
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="emailFieldType === 'password' ? 'visibility' : 'visibility_off'"
            @click="toggleEmailVisibility"
            class="cursor-pointer" />
        </template>
      </q-input>
      <q-input
        outlined
        v-model="phone"
        label="Phone Number"
        for="phone"
        placeholder="Enter Phone Number Here"
        color="dark"
        bg-color="white"
        class="w-full">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input
        outlined
        for="date"
        color="dark"
        label="Birth Day"
        placeholder="DD/MM/YYYY"
        bg-color="white"
        class="w-full"
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

      <q-btn unelevated rounded color="green" label="Submit" text-color="dark" class="px-8" />
      <q-btn unelevated rounded color="grey-5" label="Cancel" text-color="dark" class="px-8" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  const username = ref('')
  const pw = ref('')
  const email = ref('')
  const phone = ref('')
  const selectedDate = ref('')
  const day = ref('')
  const month = ref('')
  const year = ref('')
  const mask = 'DD/MM/YYYY'
  const passwordFieldType = ref('password')
  const dropDown = ref('expand_more')

  function toggleDropdown() {
    dropDown.value = dropDown.value === 'expand_more' ? 'expand_less' : 'expand_more'
  }

  function togglePasswordVisibility() {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
  }

  const emailFieldType = ref('password')
  function toggleEmailVisibility() {
    emailFieldType.value = emailFieldType.value === 'password' ? 'text' : 'password'
  }
</script>
