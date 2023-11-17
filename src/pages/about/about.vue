<template >
  <div class="h-full background sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] mx-auto">
    <div class="bg-[#00000090]">

      
        <q-btn flat round icon="o_arrow_back" class="opacity-80 hover:opacity-100 text-white" @click="navigate.back()" />

      <div class=" text-[10px] pt-10">
        <div class="h-72 background-room relative mb-10">
          <div class="bg-[#af904499] w-[80%] h-fit rounded-sm bg-opacity-80 drop-shadow-md pb-5 absolute right-2 top-0 mt-[-40px] text-white">
            <div class="p-2">
              <h2 class="uppercase">Lingian Hotel Convetion</h2>
              <p>Lingian Hotel &; Convention is a Telkom University hotel which has 3 Room Types with sufficient facilities and prices which is affordable, there are several types of rooms available at Lingian Hotels namely, Standard Room, Deluxe Room and Family Room. Lingian Hotel is located inside Telkom University in Building L.</p>
            </div>
            <div class="w-full px-auto grid grid-rows-1 grid-flow-col gap-2 md:gap-2 justify-center bg-opacity-25 px-2">
              <div class="bg-[#CCAA54] w-fit p-1 md:p-2 rounded-sm ">Standard Room</div>
              <div class="bg-[#CCAA54] w-fit p-1 md:p-2 rounded-sm ">Standard Room</div>
              <div class="bg-[#CCAA54] w-fit p-1 md:p-2 rounded-sm ">Standard Room</div>
            </div>
          </div>
        </div>
        <q-img
                :src="imageUrl1"
                spinner-color="white"
                class="w-full mb-10"
              >
          <div class="absolute right-2 top-0 pt-5 bg-transparent">
            <img src="../../assets/img/family-room.png" alt="" class="w-full">
          </div>
        </q-img>

        <q-img
                :src="imageUrl2"
                spinner-color="white"
                class="w-full"
              >
          <div class="absolute left-2 top-0 pt-5 bg-transparent">
            <img src="../../assets/img/desdelux.png" alt="" class="w-full">
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      imageUrl1: "/src/assets/img/room1.jpg",
      imageUrl2: "/src/assets/img/room3.jpg",
      about1: "/src/assets/img/family-room.png",
      about2: "/src/assets/img/desdelux.png",
    };
  },
  setup(props) {
      const navigate = useRouter()
      return { navigate }
    },
};
</script>

<style lang="scss" scoped>
  .background {
    background-image: url('/src/assets/img/background.png');
    background-size: cover;
    background-position: center;
    // background-attachment: fixed;
  }
</style>
