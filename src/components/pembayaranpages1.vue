<template>
  <div>
    <q-btn
      rounded
      label="Payment"
      class="bg-green w-32 rounded-full text-sm text-black font-bold"
      @click="Total = true" />

    <q-dialog v-model="Total">
      <q-card
        class="w-100% max-w-400px h-100% max-w-300px mx-auto px-6"
        style="background-color: #e6f6ec">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="account_balance" size="35px"> </q-icon>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="font-semibold" style="font-size: 14px">
              SELECT BANK DESTINATION
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator color="black" />

        <q-item class="mt-10">
          <q-item-section avatar>
            <q-img height="30px" width="30px" src="../assets/img/logobca.png" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="font-medium"> Bank Central Asia </q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="mt-6">
          <q-item-section avatar>
            <q-img src="../assets/img/logomandiri.png" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="font-medium"> Mandiri </q-item-label>
          </q-item-section>
        </q-item>

        <div @click="Bank = true">
          <q-item class="mt-6">
            <q-item-section avatar>
              <q-img height="30px" width="30px" src="../assets/img/logobri.png" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="font-medium"> Bank Rakyat Indonesia </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <q-item class="mt-6">
          <q-item-section avatar>
            <q-img height="30px" width="30px" src="../assets/img/logobni.png" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="font-medium"> Bank Negara Indonesia </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator color="green" class="mt-12" />

        <div class="q-pa-md q-gutter-sm tw-text-center">
          <q-btn
            style="width: 85px; height: 10px"
            unelevated
            rounded
            color="green"
            label="BACK"
            size="10px"
            @click="Total = false" />
        </div>

        <div class="mt-16 text-center">
          <q-img height="200px" width="200px" src="../assets/img/lingian-logo-colored.png" />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="Bank">
      <q-card class="my-card mx-auto px-2" style="background-color: #e6f6ec">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-img height="35px" width="35px" src="../assets/img/logobri.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="font-extrabold" style="font-size: 18px">
              Bank Rakyat Indonesia
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator color="black" />

        <q-item class="mt-8">
          <q-item-section>
            <q-item-label class="font-medium"> ADD NEW ACCOUNT </q-item-label>
          </q-item-section>
        </q-item>
        <div class="q-gutter-y-md column tw-mt-">
          <q-card>
            <q-input
              standout="bg-green text-white"
              v-model="typegoods"
              label="New Account"
              :dense="dense" />
          </q-card>
        </div>

        <q-separator color="green" class="mt-10" />

        <div class="q-gutter-sm mx-auto mt-8 w-fit">
          <q-btn unelevated rounded color="green" label="SEND" />
          <div class="q-gutter-sm mx-auto mt-8 w-fit">
            <q-btn outline rounded color="green" label="BACK" @click="Bank = false" />
          </div>
        </div>

        <div class="mt-32 text-center">
          <q-img height="200px" width="200px" src="../assets/img/lingian-logo-colored.png" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      return {
        Total: ref(false),
        Bank: ref(false),
        lorem:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      }
    },
  }
</script>

<style scoped>
  .my-card {
    width: 100%;
    max-width: 400px;
    height: 100%;
    max-height: 300px;
  }
</style>
