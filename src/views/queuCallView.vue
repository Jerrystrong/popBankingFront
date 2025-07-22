<script setup>
import { reactive, ref } from 'vue'
import speakerIcon from '../components/icons/speakerIcon.vue'
import locationIcon from '../components/icons/locationIcon.vue'
import localisationIcon from '../components/icons/localisationIcon.vue'
import { io } from 'socket.io-client'
// import { watch } from 'vue'
;(async () => {
  // console.log('are you there')
  const regexReplace = /\//g
  let date = new Date().toLocaleDateString()
  const curentDate = date.replace(regexReplace, '-')
  const fetchData = await fetch(`https://popbanking.onrender.com/api/token/process/${curentDate}`)
  const response = await fetchData.json()
  listAttentes.value = response.result.reverse()
  console.log(listAttentes.value)
})()
const socket = io('https://popbanking.onrender.com')
socket.on('getConnectedClient', (value) => {
  if (value) {
    console.log('Client connected')
  }
})
const currentToken = ref()
const listAttente = reactive([
  {
    guichet: 'A',
    ticket: 'A31',
  },
  {
    guichet: 'B',
    ticket: 'B80',
  },
  {
    guichet: 'C',
    ticket: 'C80',
  },
  {
    guichet: 'D',
    ticket: 'D80',
  },
])
const listAttentes = ref()
listAttentes.value = {}

const setVidState = ref(1)
setInterval(() => {
  setVidState.value = setVidState.value === 1 ? 2 : 1
}, 60000)
const speakText = (text) => {
  console.log(text)
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    window.speechSynthesis.speak(utterance)
  } else {
    alert('La synthèse vocale n’est pas supportée par ce navigateur.')
  }
}
socket.on('newToken', async (token) => {
  currentToken.value = token
  console.log('****************************')
  const regexReplace = /\//g
  let date = new Date().toLocaleDateString()
  const curentDate = date.replace(regexReplace, '-')
  console.log(curentDate)
  const fetchData = await fetch(`https://popbanking.onrender.com/api/token/process/${curentDate}`)
  const response = await fetchData.json()
  listAttentes.value = response.result.reverse()
  console.log(`mise en cours `)
  console.log(listAttentes.value)
  for (const element of listAttentes.value) {
    if (element.ticket === currentToken.value) {
      element.guichet = token.guichet
      element.serviceName = token.serviceName
    }
  }

  speakText(`ticket numero ${token.ticket} veuillez vous diriger au guichet ${token.guichet}`)
})
socket.on('deliverService', async (tokenId) => {
  const currentTokenId = tokenId
  console.log(`deliver ${currentTokenId}`)
  if (currentTokenId) {
    const regexReplace = /\//g
    let date = new Date().toLocaleDateString()
    const curentDate = date.replace(regexReplace, '-')
    const fetchData = await fetch(`https://popbanking.onrender.com/api/token/process/${curentDate}`)
    const response = await fetchData.json()
    listAttentes.value = response.result.reverse()
    console.log(`Donnees mise en jour ${currentTokenId}`)
  }
})

// watch(
//   () => currentToken.value,
//   (token) => {
//     speakText(`ticket numero ${token.ticket} veuillez vous diriger au guichet ${token.guichet}`)
//   },
// )
</script>
<template>
  <section class="text-lightColor w-screen h-screen blankDeg px-[50px] py-[40px] overflow-x-hidden">
    <div class="flex gap-5 h-[300px]">
      <transition-group name="fadeOut">
        <div
          class="w-[70%] bg-primary/30 rounded-md gap-2 flex items-center justify-between pl-[32px] overflow-hidden relative"
          :class="{ hidden: setVidState !== 1 }"
          v-if="setVidState === 1"
        >
          <div
            class="self-start mt-[28px] bg-lightColor/10 h-[200px] backdrop-blur-2xl rounded-lg text-lightColor p-5 w-[80%]"
          >
            <h1 class="font-sora text-[24px]">
              Service cloud et developpement application web et mobile
            </h1>
            <div class="flex items-center my-3 gap-2">
              <locationIcon />
              <h3>dscrdc.com</h3>
            </div>
            <div class="flex items-center my-3 gap-2">
              <localisationIcon />
              <h3>Avenue sodiko, Quartier Sokas, Commune Gombe</h3>
            </div>
          </div>
          <div class="w-[350px] h-[100%]">
            <img
              src="/afficheDscV5final.jpg"
              alt=""
              class="w-[350px] h-[100%] object-cover rounded-lg"
            />
          </div>
          <div class="absolute bottom-3 flex items-center gap-5">
            <button
              class="w-[30px] h-[30px] bg-lightColor text-primary rounded-full flex items-center justify-center font-bold"
              @click="setVidState++"
            >
              +
            </button>
            <div class="slideAnnounce flex gap-1">
              <div class="w-[10px] h-[10px] rounded-full bg-primary"></div>
              <div class="w-[10px] h-[10px] rounded-full bg-lightColor"></div>
            </div>
            <!-- <button
              class="w-[30px] h-[30px] bg-lightColor text-primary rounded-full flex items-center justify-center font-bold"
              @click="setVidState--"
            >
              -
            </button> -->
          </div>
        </div>
        <!-- video set -->
        <div
          class="w-[70%] bg-primary/30 rounded-md gap-2 flex items-center justify-between pl-[32px] overflow-hidden relative"
          v-if="setVidState === 2"
          :class="{ hidden: setVidState !== 2 }"
        >
          <video class="w-[95%] h-[200px]" autoplay controls muted>
            <source src="/dsc.mp4" type="video/mp4" />
            Vidéo non supportée.
          </video>
          <div class="absolute bottom-3 flex items-center gap-5">
            <!-- <button
              class="w-[30px] h-[30px] bg-lightColor text-primary rounded-full flex items-center justify-center font-bold"
              @click="setVidState++"
            >
              +
            </button> -->
            <div class="slideAnnounce flex gap-1">
              <div class="w-[10px] h-[10px] rounded-full bg-lightColor"></div>
              <div class="w-[10px] h-[10px] rounded-full bg-primary"></div>
            </div>
            <button
              class="w-[30px] h-[30px] bg-lightColor text-primary rounded-full flex items-center justify-center font-bold"
              @click="setVidState--"
            >
              -
            </button>
          </div>
        </div>
      </transition-group>
      <div class="w-[30%] bg-lightColor block rounded-md shadow relative overflow-hidden">
        <div class="h-[70%] p-5 flex items-center relative" v-if="currentToken">
          <div class="flex justify-between absolute top-4 left-4 right-4">
            <small class="text-primary bg-primary/30 border border-primary px-2 py-1 rounded-full"
              >Ticket en cours
            </small>
            <speakerIcon
              @click="
                speakText(
                  `ticket numero ${currentToken.ticket} veuillez vous diriger au guichet ${currentToken.guichet}`,
                )
              "
            />
          </div>
          <div>
            <h1 class="text-darkColor text-[32px]">Guichet {{ currentToken.guichet }}</h1>
          </div>
        </div>
        <div class="h-[70%] p-5 flex items-center relative" v-else>
          <div class="flex justify-between absolute top-4 left-4 right-4">
            <small class="text-primary bg-primary/30 border border-primary px-2 py-1 rounded-full"
              >Prochaine ticket
            </small>
            <speakerIcon
              @click="
                speakText(
                  `ticket numero ${listAttentes[0].ticketId} veuillez vous diriger au guichet ${listAttente[0].guichetId}`,
                )
              "
            />
          </div>
          <div>
            <h1 class="text-darkColor text-[32px]" v-if="listAttentes.length > 0">
              Guichet {{ listAttentes[0].guichetId }}
            </h1>
            <h1 v-else>Aucune activité courante</h1>
          </div>
        </div>
        <!-- active geton -->
        <div
          class="h-[30%] flex items-center justify-center border-t-2 border-dashed border-primary flex-col"
        >
          <div class="absolute blankDeg w-[30px] h-[30px] rounded-full -left-5 bottom-[25%]"></div>
          <div class="absolute blankDeg w-[30px] h-[30px] rounded-full -right-5 bottom-[25%]"></div>
          <small class="text-darkColor font-semibold">Geton</small>
          <div class="font-sora text-primary text-[32px]" v-if="currentToken">
            N° {{ currentToken.ticket }}
          </div>
          <div class="font-sora text-primary text-[32px]" v-else>
            <span v-if="listAttentes.length > 0">N° {{ listAttentes[0].codeTicket }}</span>
            <span v-else>Aucune activité</span>
          </div>
        </div>
      </div>
    </div>
    <!-- liste d'attente -->
    <div class="grid grid-cols-4 gap-2 h-[200px] mt-4" v-if="listAttentes.length > 0">
      <div v-for="(attent, index) in listAttentes" :key="index">
        <div
          class="bg-lightColor flex flex-col justify-center rounded-md text-darkColor p-5 relative overflow-hidden h-[170px]"
        >
          <div class="flex justify-between absolute top-4 left-5 right-5">
            <small class="text-primary bg-primary/30 border rounded-full border-primary px-3 py-1"
              >Geton</small
            >
            <small class="text-primary animate-pulse">En attente...</small>
          </div>
          <div>
            <h1 class="text-primary text-[32px] font-sora m-3 text-center">
              {{ attent.codeTicket }}
            </h1>
            <h2 class="text-darkColor text-[24px] font-semibold" v-if="attent.guichet">
              => Guichet {{ attent.guichet }}
            </h2>
          </div>
          <div
            class="w-[40px] h-[40px] blankDeg absolute rounded-full top-[40%] right-[-25px]"
          ></div>
          <!-- <div
            class="w-[0px] border border-darkColor border-dashed h-full blankDeg absolute top-0 right-[25px]"
          ></div> -->
        </div>
      </div>
    </div>
    <div class="text-[42px] text-center pt-[50px]" v-else>Aucun client en attente</div>
  </section>
</template>
<style>
.blankDeg {
  background: radial-gradient(circle at center, #0f282e, #0a1b20, #040a0c);
}
.fadeOut-enter-active,
.fadeOut-leave-active {
  transition: all 700ms ease-out;
}
.fadeOut-enter-from {
  opacity: 0;
  top: 0;
  width: 70%;
  transform: translateX(50%);
}
.fadeOut-enter-to {
  opacity: 1;
  transform: translateX(-10%);
}
.fadeOut-leave-from {
  transform: translateX(200%);
  opacity: 0;
}
.fadeOut-leave-to {
  transform: translateX(-200%);
  opacity: 0;
}
</style>
