<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CloseIcon from './icons/closeIcon.vue'
const router = useRouter()
const isSuccess = ref(false)

const props = defineProps({
  services: Array,
  limiteNumber: String,
})
const ticketNumber = ref()
const serviceName = ref('')
const serviceLetter = ref('F')
if (props.limiteNumber) {
  ticketNumber.value = parseInt(props.limiteNumber)
}
const emits = defineEmits(['closeParam', 'newService', 'removeService', 'restartSystem'])
const closeParam = () => {
  emits('closeParam', true)
  router.go(-1)
}
const addNewService = () => {
  emits('newService', { serviceName: serviceName.value, serviceLetter: serviceLetter.value })
  serviceName.value = ''
}
const updateNumber = () => {
  localStorage.setItem('numberOfitems', ticketNumber.value)
  setTimeout(() => {
    isSuccess.value = false
    clearInterval(interV)
  }, 5000)
  let percent = 0
  const interV = setInterval(() => {
    const scrollBe = document.querySelector('#scrollBe')
    percent = percent + 2.5
    scrollBe.style.left = `-${percent}px`
  }, 50)
  isSuccess.value = true
}
onMounted(() => {
  router.push({ query: { parameter: 'true' } })
})
const removeService = (name) => {
  emits('removeService', name)
}
const restartSystem = () => {
  emits('restartSystem')
}
</script>
<template>
  <div
    class="bg-darkColor/30 fixed top-0 bottom-0 right-0 left-0 w-full z-[55555]"
    @click.self="closeParam"
    v-touch:swipe.left="closeParam"
    v-touch:swipe.right="closeParam"
  >
    <div
      v-if="isSuccess"
      class="bg-primary/10 w-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center"
    >
      <div
        class="w-[250px] h-[150px] bg-lightColor flex items-center justify-center rounded-lg z-[8888888] text-primary font-sora font-semibold relative overflow-hidden shadow-md"
      >
        Mise en jour avec success
        <div class="w-full block h-[10px] bg-primary absolute bottom-0 left-0" id="scrollBe"></div>
      </div>
    </div>
    <button class="absolute right-5 z-[666666] top-5" @click="closeParam"><CloseIcon /></button>
    <div
      class="bg-lightColor flex w-[400px] max-sm:w-[300px] h-full z-50 absolute right-0 p-5 flex-col"
    >
      <h1 class="text-[32px] max-sm:text-[24px] font-sora">Parametre</h1>
      <div class="mt-[50px] max-sm:mt-[20px] border-2 border-dashed border-primary rounded-lg p-2">
        <h2 class="font-sora">Ajout et Suppression de service</h2>
        <div class="flex flex-wrap gap-3 py-5">
          <div
            v-for="service in services"
            :key="service"
            class="border-2 rounded-full border-primary/50 px-2 border-dashed relative"
          >
            {{ service.serviceName }}
            <button
              class="font-sora bg-primary text-lightColor w-[20px] h-[20px] text-[12px] rounded-full absolute -top-2"
              @click="removeService(service.serviceName)"
            >
              x
            </button>
          </div>
        </div>
        <div>
          <h2 class="font-sora">Ajouter un service</h2>
          <div class="flex gap-5">
            <input
              type="text"
              placeholder="Nouveau service"
              v-model="serviceName"
              class="placeholder:text-primary/50 border border-primary/30 w-full rounded-lg px-3 h-[40px]"
            />
            <input
              type="text"
              v-model="serviceLetter"
              class="border border-primary/30 w-[50px] rounded-lg px-3"
            />
          </div>
          <button
            class="bg-primary/70 py-1 px-2 mt-2 text-lightColor rounded-lg"
            @click="addNewService"
          >
            Mettre en jour
          </button>
        </div>
      </div>

      <div class="mt-[50px] max-sm:mt-[20px] border-2 border-dashed border-primary rounded-lg p-2">
        <div>
          <h2>Nombre de geston par service</h2>
          <div class="flex items-center gap-2 mt-2">
            <button
              class="font-sora bg-primary/70 text-lightColor w-[20px] h-[20px] text-[15px] rounded-full"
              @click="ticketNumber++"
            >
              +
            </button>
            <input type="number" v-model="ticketNumber" class="w-[30px]" max="500" />
            <button
              class="font-sora bg-primary/70 text-lightColor w-[20px] h-[20px] text-[15px] rounded-full"
              @click="ticketNumber--"
            >
              -
            </button>
          </div>
          <button
            class="bg-primary/90 text-lightColor px-3 py-1 rounded-lg mt-4"
            @click="updateNumber"
          >
            Modifier
          </button>
        </div>
      </div>
      <button
        class="flex absolute bottom-5 max-sm:bottom-1 bg-red-700 text-lightColor px-3 py-3 rounded-lg"
        @click="restartSystem"
      >
        Recommencer le service
      </button>
    </div>
  </div>
</template>
