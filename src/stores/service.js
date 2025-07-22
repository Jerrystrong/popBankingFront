import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('services', () => {
  const services = ref([])
  const setService = (data) => {
    services.value = data
  }
  return { services, setService }
})
