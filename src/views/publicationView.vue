<script setup>
import { ref } from 'vue'
import imageUpload from '../components/icons/imageUpload.vue'
import videoUpload from '../components/icons/videoUpload.vue'
import locationDark from '../components/icons/locationDark.vue'
import axios from 'axios'
const bannerFile = ref('')
const image = ref()
const titrePublication = ref('')
const lienPublication = ref('')
const adressePublication = ref('')
const getImageName = () => {
  const uploadBanner = document.querySelector('#uploadBanner')
  image.value = uploadBanner.files[0]
  bannerFile.value = image.value.name
}
const videoFile = ref('')
const video = ref()
const getVideoName = () => {
  const uploadVideo = document.querySelector('#uploadVideo')
  video.value = uploadVideo.files[0]
  videoFile.value = video.value.name
}
const isError = ref(false)
const newPub = async () => {
  if (image.value) {
    if (video.value) {
      if (lienPublication.value && adressePublication.value) {
        console.log('newPub')
        const formData = new FormData()
        formData.append('pubTitle', titrePublication.value)
        formData.append('pubImage', image.value) // doit être un File (ex: input type="file")
        formData.append('lienSite', lienPublication.value)
        formData.append('adresse', adressePublication.value)
        formData.append('video', video.value) // idem, doit être un File si c’est un fichier

        try {
          const response = await axios.post(
            'https://popbanking.onrender.com/api/uploadPub/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data', // ✅ Bonne valeur ici
              },
            },
          )
          console.log(response)
        } catch (err) {
          console.error(err)
        }
      } else {
        isError.value = true
      }
    } else {
      isError.value = true
    }
  } else {
    isError.value = true
  }
}
</script>
<template>
  <div class="w-[90%] mx-auto py-5 h-[600px] overflow-y-scroll">
    <h1 class="text-[24px] font-sora">Mise en jour de la bande d'annonce</h1>
    <div class="grid gap-3">
      <div class="title flex text-primary items-center gap-5 my-2">
        <div
          class="w-[30px] h-[30px] rounded-full flex items-center justify-center border border-dashed"
        >
          1
        </div>
        Metre en jour la première bande
      </div>
      <div class="p-3rounded-lg">
        <p class="font-semibold">Titre de la publication</p>
        <input
          type="text"
          placeholder="Ecrivez le titre ici"
          class="w-full text-[24px] text-darkColor/70 border-0 outline-0 focus:border-0 focus:outline-0"
          v-model="titrePublication"
        />
        <div class="flex gap-5 mt-5">
          <div class="flex items-center rounded-lg gap-2 border border-primary/30 px-2 py-1">
            <locationDark />
            <input
              type="text"
              placeholder="Lien de l'entreprise"
              class="text-[16px] text-darkColor/70 border-0 outline-0 focus:border-0 focus:outline-0"
              v-model="lienPublication"
            />
          </div>
          <div class="flex items-center rounded-lg gap-2 border border-primary/30 px-2 py-1">
            <input
              type="text"
              placeholder="Adress de l'entreprise"
              class="text-[16px] text-darkColor/70 border-0 outline-0 focus:border-0 focus:outline-0"
              v-model="adressePublication"
            />
          </div>
        </div>
      </div>
      <label
        for="uploadBanner"
        class="border p-3 border-primary/30 rounded-lg flex items-center justify-center flex-col-reverse text-primary"
      >
        <p v-if="bannerFile">{{ bannerFile }}</p>
        <p v-else>Upload image d'illustrage ou affiche</p>
        <imageUpload />
        <input
          type="file"
          name="uploadBanner"
          id="uploadBanner"
          class="hidden"
          @change="getImageName"
        />
      </label>
    </div>
    <!-- ================= -->
    <div class="grid gap-3 mt-5 mb-2">
      <div class="title flex text-primary items-center gap-5 my-2">
        <div
          class="w-[30px] h-[30px] rounded-full flex items-center justify-center border border-dashed"
        >
          2
        </div>
        Metre en jour la deuxième bande
      </div>
      <label
        for="uploadVideo"
        class="border p-3 border-primary/30 rounded-lg flex items-center justify-center flex-col-reverse text-primary"
      >
        <p v-if="videoFile">{{ videoFile }}</p>
        <p v-else>Upload image d'illustrage ou affiche</p>
        <videoUpload />
        <input
          type="file"
          name="uploadVideo"
          id="uploadVideo"
          class="hidden"
          @change="getVideoName"
        />
      </label>
    </div>
    <div class="flex justify-between flex-col">
      <p v-if="isError" class="text-red-500">Vous devez remplir tout les champs</p>
      <button class="px-3 py-1 bg-darkColor text-lightColor rounded-md w-fit" @click="newPub">
        Mettre en jour
      </button>
      <!-- <button class="px-3 py-1 bg-darkColor text-lightColor rounded-md"></button> -->
    </div>
  </div>
</template>
