<script setup>
import TicketIcon from './ticketIcon.vue'
import SettingIcon from './settingIcon.vue'
import UserIcon from './userIcon.vue'
import { useRouter } from 'vue-router'
const emits = defineEmits(['openParam'])
const openParam = () => {
  emits('openParam', true)
}
const router = useRouter()
const switchToHistorique = () => {
  router.push({ name: 'historique' })
}
const switchToHome = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div
    class="fixed bottom-0 h-[70px] max-sm:h-[50px] bg-primary/10 w-full flex items-center z-50 justify-between px-[150px] max-sm:px-[20px]"
  >
    <button class="bg-transparent z-50">
      <UserIcon
        class="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px]"
        @click="switchToHistorique"
      />
    </button>
    <div
      class="bg-lightColor w-[50px] h-[50px] flex items-center justify-center rounded-full"
      @click="switchToHome"
    >
      <TicketIcon />
    </div>
    <button class="bg-transparent z-50" @click="openParam">
      <SettingIcon />
    </button>
  </div>
</template>
