<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavComponent from './components/icons/navComponent.vue'
import ToggleNavComponent from './components/icons/toggleNavComponent.vue'
import ParameterComponent from './components/parameterComponent.vue'
import { allServices } from '../composable/service'
import { provide, ref, watch } from 'vue'
const services = ref([])
// const emits=defineEmits(['pushService'])
// services.value = [...allServices]
const servicesA = ref([])
const fetchService = async () => {
  const response = await fetch('https://popbanking.onrender.com/api/guichet')
  const json = await response.json()
  for (const element of json.data) {
    element.current = 0
    element.max = 100
    element.defultV = 0
    console.log(element)
  }
  servicesA.value = json.data
  console.log(servicesA.value)
  localStorage.setItem('services', JSON.stringify([...servicesA.value]))
}
if (!localStorage.getItem('services')) {
  fetchService()
  // console.log(servicesA)
  // if (servicesA.value > 0) {
  //   console.log(servicesA.value)
  // }
  // localStorage.setItem('services', JSON.stringify([...allServices]))
}
services.value = JSON.parse(localStorage.getItem('services'))
const paramState = ref(false)
const closeParam = (d) => {
  if (d) {
    paramState.value = false
  }
}
const OpenParam = (d) => {
  if (d) {
    paramState.value = true
  }
}
if (!localStorage.getItem('numberOfitems')) {
  localStorage.setItem('numberOfitems', 100)
}
const numberOfitems = ref()
numberOfitems.value = localStorage.getItem('numberOfitems')
const newService = async (data) => {
  services.value.push({ ...data, current: 0, max: 100 })
  localStorage.setItem('services', JSON.stringify(services.value))
  try {
    const fetchData = await fetch('https://popbanking.onrender.com/api/addGuichet', {
      method: 'POST',
      body: JSON.stringify({ serviceName: data.serviceName, serviceLetter: data.serviceLetter }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await fetchData.json()
    // console.log(response)
    if (response.success) {
      console.log('service added')
    }
  } catch (err) {
    console.log(`Erreur: ${err}`)
  }
  // emits('pushService',services.value)
}
const removeService = async (name) => {
  const ii = services.value.indexOf(name)
  services.value.splice(ii, 1)
  localStorage.setItem('services', JSON.stringify(services.value))
  try {
    const fetchData = await fetch(`https://popbanking.onrender.com/api/removeGuichet/${name}`)
    const response = await fetchData.json()
    // console.log(response)
    if (response.success) {
      console.log('service removed')
    }
  } catch (err) {
    console.log(`Erreur: ${err}`)
  }
}
const restartSystem = () => {
  // console.log(localStorage.getItem('services'))
  services.value = JSON.parse(localStorage.getItem('services'))
  paramState.value = false
}
provide('pushService', services.value)
const mobileOnly = ref(true)
const route = useRoute()
console.log(route.path)
if (route.path === '/queuecall') {
  mobileOnly.value = false
}
watch(
  () => route.path,
  (newRoute) => {
    if (newRoute === '/queuecall') {
      mobileOnly.value = false
    }
  },
)
</script>

<template>
  <!-- parameter -->
  <transition name="fadeLeft">
    <ParameterComponent
      :services="services"
      :limiteNumber="numberOfitems"
      @close-param="closeParam"
      @new-service="newService"
      @remove-service="removeService"
      @restart-system="restartSystem"
      v-if="paramState"
    />
  </transition>
  <header v-if="mobileOnly">
    <NavComponent />
  </header>

  <RouterView />
  <ToggleNavComponent @open-param="OpenParam" v-if="mobileOnly" />
</template>

<style scoped>
.fadeLeft-enter-active,
.fadeLeft-leave-active {
  transition: all 0.3s ease-out;
}
.fadeLeft-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.fadeLeft-leave-from {
  transform: translateX(0px);
  opacity: 1;
}
</style>
