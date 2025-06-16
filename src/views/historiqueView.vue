<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
// if(route.pemission)
const historiques = ref([])
const loarding = ref(false)
const fetchHistoriqueDay = async () => {
  let currentDay = new Date().toLocaleDateString()
  const regexReplace = /\//g
  currentDay = currentDay.replace(regexReplace, '-')
  try {
    loarding.value = true
    const response = await fetch(
      `https://popbanking.onrender.com/api/dailyHistorique/${currentDay}`,
    )
    const data = await response.json()
    historiques.value = data.data
    // console.log(currentDay)
    // console.log(data)
  } catch (err) {
    loarding.value = true
    console.log(err)
  } finally {
    loarding.value = false
  }
}
fetchHistoriqueDay()
onMounted(async () => {
  console.log('sasas')
  const response = await axios.get('https://popbanking.onrender.com/api/help/get-applies')
  console.log('sasas')
  console.log(response)
})
const goBack = () => {
  router.go(-1)
}
</script>
<template>
  <section class="relative" v-touch:swipe.left="goBack" v-touch:swipe.right="goBack">
    <div class="max-sm:translate-y-[-50px] translate-y-[-100px]">
      <h1 class="text-[32px] max-sm:text-[24px] pl-[50px] max-sm:pl-[20px]">
        Historique journalier
      </h1>
    </div>
    <section class="text-[24px] max-sm:text-[16px] w-[90%] mx-auto">
      <div v-if="loarding">loarding ....</div>
      <div v-else>
        <div
          v-if="historiques.length > 0"
          class="grid grid-cols-2 max-sm:grid-cols-1 h-[500px] p-5 gap-3 max-sm:gap-1 overflow-y-scroll"
        >
          <div
            class="bg-white relative overflow-hidden h-[200px] rounded-lg p-4"
            v-for="(historique, index) in historiques"
            :key="index"
          >
            <h2 class="text-primary font-semibold">
              <small>Service:</small> {{ historique.serviceName }}
            </h2>
            <p class="p-4 font-bold font-sora">Code: {{ historique.codeTicket }}</p>
            <p class="text-primary/30">{{ historique.clientNumber }}</p>
            <p class="text-primary/70">{{ historique.createdAt }}</p>
            <div
              class="absolute bg-lightColor w-[100px] h-[100px] rounded-full top-[25%] right-[-15%]"
            ></div>
            <!-- {{ historique }} -->
          </div>
        </div>
        <div v-else>Aucun service n'a été fait aujourd'hui</div>
      </div>
    </section>
  </section>
</template>
