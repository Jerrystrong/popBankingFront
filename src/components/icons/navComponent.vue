<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div>
    <nav
      class="p-[20px] flex gap-[50px] max-sm:gap-[20px] max-sm:p-[10px] bg-primary/30 backdrop-blur-3xl w-screen"
    >
      <div
        class="w-[60px] h-[60px] rounded-full bg-lightColor block max-sm:w-[40px] max-sm:h-[40px] overflow-hidden"
      >
        <img src="/popBanking.jpg" alt="" class="w-full h-full object-cover" @click="goHome" />
      </div>
      <h1 class="text-[32px] max-sm:text-[24px] font-sora text-darkColor" @click="goHome">
        PopBanking
      </h1>
    </nav>
    <div
      class="hero bg-primary/10 h-[250px] max-sm:h-[150px] w-full block relative before before:content-[''] before:block before:absolute before:w-[100px] before:h-[100px] max-sm:before:h-[60px] max-sm:before:w-[60px] before:bg-lightColor before:left-[-50px] max-sm:before:left-[-30px] before:rounded-full before:top-[75px] max-sm:before:top-[45px]"
    >
      <!-- <h1 class="font-sor text-[42px] font-semibold pl-[80px] pt-[50px] max-sm:pt-[30px]">
        Bienvenue ....
      </h1> -->
      <div
        class="absolute h-full top-0 bottom-0 right-0 border-[10px] max-sm:border-[5px] border-dashed rounded-full border-lightColor"
      ></div>
    </div>
  </div>
</template>
