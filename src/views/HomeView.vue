<script setup>
import CreateIcon from '@/components/icons/createIcon.vue'
import CashMoney from '@/components/icons/cashMoney.vue'
import DepotIcon from '@/components/icons/depotIcon.vue'
import ComplaintIcon from '@/components/icons/complaintIcon.vue'
import { inject, onMounted, ref } from 'vue'
// import { allServices } from '../../composable/service'
import UserIcon from '@/components/icons/userIcon.vue'
import CardIcon from '@/components/icons/cardIcon.vue'
import CloseIcon from '@/components/icons/closeIcon.vue'
import OtherServiceIcon from '@/components/icons/otherServiceIcon.vue'

// import TheWelcome from '../components/TheWelcome.vue'
const popState = ref(false)
const serviceTitle = ref('')
const services = ref([])
const serviceValue = ref('')
const serviceCount = ref(0)
const tel = ref()
const currentService = ref('')
const injData = inject('pushService')
// services.value = [...allServices]
// services.value = JSON.parse(localStorage.getItem('services'))
onMounted(() => {
  // console.log('mount')
  services.value = injData
})
const dataLoarding = ref(false)
const messageSuccess = ref(false)
const sendMessage = async (data) => {
  try {
    dataLoarding.value = true
    const fetchData = await fetch('https://popbanking.onrender.com/api/newToken', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await fetchData.json()
    // console.log(response)
    if (response.message) {
      // popState.value = false
      dataLoarding.value = false
      tel.value = ''
      messageSuccess.value = true
      // popState.value = false
    }
  } catch (err) {
    dataLoarding.value = true
    console.log(`Erreur: ${err}`)
  } finally {
    dataLoarding.value = false
  }
}
const regexReplace = /\//g
const currentDay = ref('')
currentDay.value = new Date().toLocaleDateString()
currentDay.value = currentDay.value.replace(regexReplace, '-')
const pushData = () => {
  sendMessage({
    codeTcket: `${serviceValue.value}${serviceCount.value}`,
    createdAt: currentDay.value,
    numero: `243${tel.value.toString()}`,
    service: currentService.value,
  })
}
const numberOfitems = localStorage.getItem('numberOfitems')
const setService = (service) => {
  serviceCount.value = 0
  currentService.value = service
  const acceptedService = services.value.find((s) => s.serviceName.includes(service))
  if (acceptedService) {
    serviceValue.value = acceptedService.serviceLetter
    serviceTitle.value = service
    if (acceptedService.current < numberOfitems) {
      acceptedService.current++
    }
    serviceCount.value = acceptedService.current.toString()
    popState.value = true
  }
}
const closeSuccessWindow = () => {
  popState.value = false
  messageSuccess.value = false
}

// watch(injData, (newValue, oldValue) => {
//   console.log(newValue)
//   console.log(oldValue)
// })
</script>

<template>
  <section class="relative">
    <!-- popup ticket -->
    <div
      class="bg-darkColor/30 fixed top-0 bottom-0 right-0 left-0 w-full z-50 flex items-center justify-center"
      v-if="popState"
      @click.self="popState = false"
    >
      <div class="w-[300px] h-[300px] bg-lightColor rounded-lg overflow-hidden relative">
        <button class="absolute right-0 z-50" @click="popState = false">
          <CloseIcon @click="popState = false" />
        </button>
        <div
          class="relative h-[70%] border-b-3 border-primary/20 border-dashed p-4 flex flex-col justify-between"
        >
          <!-- loarder -->
          <div
            class="absolute bg-primary top-0 left-0 h-full bottom-0 w-full flex items-center justify-center"
            v-if="dataLoarding"
          >
            <div class="flex flex-col items-center justify-center" v-if="dataLoarding">
              <div class="w-[50px] h-[50px] rounded-full block bg-lightColor animate-bounce"></div>
              <p class="text-lightColor font-sora text-[18px] animate-pulse">chargement...</p>
            </div>
          </div>
          <div
            v-if="messageSuccess"
            class="absolute bg-primary top-0 left-0 h-full bottom-0 w-full flex flex-col items-center justify-center text-lightColor"
          >
            Code envoyé avec success
            <button
              class="bg-lightColor text-primary px-3 py-1 rounded-md"
              @click="closeSuccessWindow"
            >
              Quitter
            </button>
          </div>
          <!-- end loardr -->
          <h2 class="text-[24px] font-semibold">Service: {{ serviceTitle }}</h2>
          <div class="border-2 rounded-md border-primary/30 p-2">
            <p class="text-[18px]">Numero</p>
            <div class="flex items-ceneter gap-1">
              <UserIcon class="w-[20px] h-[20px]" />
              <input
                type="tel"
                placeholder="Entrez le numero du client"
                class="focus:border-0 hover:border-0 focus:outline-0 hover:outline-0 outline-0 text-primary"
                v-model="tel"
                @keyup.enter="pushData"
              />
            </div>
          </div>
        </div>
        <div class="h-[30%] flex items-center justify-center">
          <div
            class="absolute bg-primary/90 w-[30px] h-[30px] rounded-full -left-5 bottom-[25%]"
          ></div>
          <div
            class="absolute bg-primary/90 w-[30px] h-[30px] rounded-full -right-5 bottom-[25%]"
          ></div>
          <p class="text-[32px] font-sora">N°{{ serviceValue }}{{ serviceCount }}</p>
        </div>
      </div>
    </div>
    <div
      class="grid lg:grid-cols-3 grid-cols-2 w-[80%] mx-auto gap-5 translate-y-[-30px] max-sm:translate-y-[-25px] -z-10 max-sm:h-[400px] max-sm:overflow-scroll"
    >
      <div
        class="bg-primary text-lightColor h-[150px] max-sm:h-[120px] rounded-lg flex items-center justify-center flex-col text-[24px] max-sm:text-[16px] font-sora shadow-lg shadow-primary/50 hover:border-primary hover:text-primary -z-10"
        v-for="service in services"
        :key="service"
        @click="setService(service.serviceName)"
      >
        <div
          class="w-[60px] h-[60px] rounded-full bg-lightColor/30 flex items-center justify-center max-sm:w-[40px] max-sm:h-[40px]"
        >
          <CreateIcon v-if="service.serviceName === 'Création compte'" />
          <CashMoney v-else-if="service.serviceName === 'Retrait argent'" />
          <CardIcon v-else-if="service.serviceName === 'Retrait cart'" />
          <DepotIcon v-else-if="service.serviceName === 'Depot'" />
          <ComplaintIcon v-else-if="service.serviceName === 'Reclamation'" />
          <!-- <ReportIcon /> -->
          <OtherServiceIcon v-else />
        </div>
        <p class="text-center max-sm:p-1">{{ service.serviceName }}</p>
      </div>
    </div>
  </section>
</template>
