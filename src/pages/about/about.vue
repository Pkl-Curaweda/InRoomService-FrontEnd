<template >
  <div class="background h-full w-screen lg:hidden ">
    <router-link to="/">
            <q-btn flat round icon="o_arrow_back" class="opacity-80 hover:opacity-100" />
          </router-link>
    <div class="md:text-sm text-[10px] pt-10">
      <div class="h-72 background-room relative ">
        <div class="bg-[#af904499] w-[80%] md:w-lg h-fit rounded-sm  bg-opacity-80 drop-shadow-md pb-5 md:p-5 absolute right-2 top-0 mt-[-40px] text-white">
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
      <div class="h-72 mt-20 background-room-family relative">
        <div class="pb-5 md:p-5 absolute right-2 top-0 pt-5">
          <img src="../../assets/img/family-room.png" alt="" class="w-60">
        </div>
      </div>
      <div class="h-72 mt-20 background-room-deluxe relative">
        <div class="pb-5 md:p-5 absolute left-2 top-0 pt-5">
          <img src="../../assets/img/family-room.png" alt="" class="w-60">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .background {
    background-image: url('/src/assets/img/background.jpg');
    background-size: cover;
    background-position: center;
    // background-attachment: fixed;
  }

  .background-room {
    background-image: url('/src/assets/img/room-1.png');
    background-size: cover;
    background-position: center;
  }
  .background-room-family {
    background-image: url('/src/assets/img/room-3.jpg');
    background-size: cover;
    background-position: center;
  }

  .background-room-deluxe {
    background-image: url('/src/assets/img/room-2.png');
    background-size: cover;
    background-position: center;
  }
</style>
