<!-- <script lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { routes } from '../router'
  import { useHead } from '@vueuse/head'
  import { StreamBarcodeReader } from 'vue-barcode-reader'
  export default {
    components: { StreamBarcodeReader },
    data() {
      return {
        isValid: undefined,
        camera: 'auto',
        result: null,
        showCamera: false,
        error: '',
        content: '',
        tex: '',
      }
    },
    computed: {
      textInfo() {
        return this.showCamera
          ? 'position the qrcode on the camera'
          : 'Press the button and scan a qrcode.'
      },
    },
    methods: {
      // onDecode(content: string) {
      //   this.content = content
      //   // window.location.replace(content)
      //   this.turnCameraOff()
      // },
      onDecode(Text: any) {
        console.log(`Decode text from QR code is ${Text}`)
        const tex = Text.value
        // window.location.replace(Text)
      },
      onLoad(Text: any) {
        console.log(`Ready to start scanning barcodes`)
      },

      turnCameraOn() {
        this.camera = 'auto'
        this.showCamera = true
      },

      turnCameraOff() {
        this.camera = 'off'
        this.showCamera = false
      },
    },
    setup() {
      const leftDrawerOpen = ref(false)

      function toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

      const route = useRoute()
      const router = useRouter()

      useHead({
        title: 'Your Page Title',
        // other meta tags or properties
      })

      // You can also return any data or computed properties here.
      return {
        leftDrawerOpen,
        toggleLeftDrawer,
        route,
        router,
      }
    },
  }
</script> -->

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { routes } from '../router'
  import { useHead } from '@vueuse/head'
  import { StreamBarcodeReader } from 'vue-barcode-reader'

  const leftDrawerOpen = ref(false)
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const openCamera = ref(false)
  function toggleCamera() {
    openCamera.value = !openCamera.value
  }
  const route = useRoute()
  const router = useRouter()
  var tex = ''
  function onDecode(Text: any) {
    console.log(`Decode text from QR code is ${Text}`)
    tex = Text.value
    // window.location.replace(Text)
  }
  function onLoad(Text: any) {
    console.log(`Ready to start scanning barcodes`)
  }
  useHead({
    title: 'Your Page Title',
    // other meta tags or properties
  })
</script>
<template>
  <div class="my-bg">
    <q-layout view="lHh lpR fFf" class="text-white max-h-screen min-h-screen">
      <q-header reveal class="bg-transparent border-0 border-transparent">
        <q-toolbar class="flex items-center justify-end">
          <q-btn
            v-if="$route.path === '/'"
            dense
            flat
            round
            @click="toggleCamera"
            icon="qr_code_scanner"
            class="text-white" />
        </q-toolbar>
      </q-header>
      <div class="w-full h-screen absolute z-10" v-if="openCamera">
        <StreamBarcodeReader
          @decode="onDecode"
          @loaded="onLoad"
          style="position: absolute !important"
          class="absolute top-[23%] z-10"
          v-if="openCamera"></StreamBarcodeReader>
      </div>
      <!-- <div v-if="showCamera"> -->
      <!-- <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit"> </qrcode-stream> -->
      <!-- </div>
      <p @click="turnCameraOff">kanjut</p>
      <p>{{ textInfo }}</p> -->
      <q-page-container
        class="flex items-center justify-center h-screen"
        :class="{ hidden: openCamera }">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
  .my-bg {
    position: absolute;
    top: 0;
    left: 0;
    background-position-y: 30%;
    width: 100%;
    background-image: url('src/assets/img/login.png');
    background-size: cover;
    z-index: -1; /* Move the background behind other content */
  }

  .my-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('src/assets/img/login.png');
    background-size: cover;
    background-position-y: 50%;
    filter: brightness(50%); /* Apply the brightness filter */
    z-index: -2; /* Move the filtered background even further behind */
  }

  // .my-bg::before {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 60%;
  //   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  //   position: absolute;
  //   top: 0;
  // }

  // .my-bg::after {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 40%;
  //   background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  //   position: absolute;
  //   bottom: 0;
  // }
</style>
