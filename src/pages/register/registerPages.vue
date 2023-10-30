<template>
  <div>
    <q-form class="flex flex-col gap-4 items-center justify-center">
      <q-input
        outlined
        v-model="text"
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
        v-model="text"
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

      <div class="flex items-center justify-between">
        <q-input
          outlined
          for="date"
          color="dark"
          bg-color="white"
          class="w-32"
          v-model="selectedDate">
          <template #append>
            <q-icon name="expand_more" class="text-[#069550] cursor-pointer" size="35px">
              <q-popup-proxy>
                <q-date v-model="selectedDate" :mask="mask" default-view="Years" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <q-btn unelevated rounded color="green" label="Submit" text-color="dark" class="px-8" />
      <q-btn unelevated rounded color="grey-5" label="Cancel" text-color="dark" class="px-8" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  const text = ref('')
  const pw = ref('')
  const email = ref('')
  const selectedDate = ref()
  const mask = 'DD/MM/YYYY'
  const passwordFieldType = ref('password')
  function togglePasswordVisibility() {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
  }

  const emailFieldType = ref('password')
  function toggleEmailVisibility() {
    emailFieldType.value = emailFieldType.value === 'password' ? 'text' : 'password'
  }
</script>
