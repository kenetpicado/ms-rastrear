<script setup>
import ReloadSvg from '@/components/icons/ReloadSvg.vue'
import PackageDetails from '@/components/PackageDetails.vue'
import SearchInput from '@/components/SearchInput.vue'
import useTrack from '@/composables/useTrack'
import { useHistoryStore } from '@/stores/history'
import { toast } from '@/utils/toast'
import { storeToRefs } from 'pinia'

const { search, result, searching, track, resetValues } = useTrack()
const { history } = storeToRefs(useHistoryStore())
const { clear } = useHistoryStore()

function showThis(tracking) {
  resetValues()
  track.value = tracking

  if (!track.value) {
    toast.error('Ingresa un número de rastreo')
    return
  }

  if (track.value.includes(' ')) {
    toast.error('No se permiten espacios en blanco')
    return
  }

  if (track.value.length < 5) {
    toast.error('Número de rastreo inválido')
    return
  }

  search()
}
</script>

<template>
  <section
    class="text-white rounded-b-3xl shadow-xl"
    style="background: linear-gradient(20deg, #3a6cb2, #004995)"
  >
    <div class="w-full flex flex-col items-center justify-center mb-[2.5rem]">
      <form @submit.prevent="search" class="text-center py-6 px-4 max-w-xl mt-8">
        <div class="flex items-center justify-center mb-2">
          <a href="https://megashopni.com">
            <img src="/icon.png" alt="Logo" class="w-[5rem] h-auto" />
          </a>
        </div>
        <h5 class="text-2xl lg:text-4xl font-bold mb-8 tracking-wider">¡Rastrea tu paquete!</h5>
        <div class="text-base font-light mb-10 leading-relaxed tracking-wide">
          Ingresa tu número de rastreo y monitorea el progreso de tu paquete al instante 🕒
        </div>
        <SearchInput v-model="track" :loading="searching" />
      </form>
    </div>
  </section>
  <section class="bg-white text-gray-600 h-full mb-4">
    <div class="max-w-xl mx-auto flex flex-col items-center justify-center mb-4 px-4">
      <div
        v-if="!result.details.length && history.length"
        class="w-full flex flex-col gap-4 cursor-pointer"
      >
        <div
          v-for="item in history"
          :key="item.date"
          class="border w-full rounded-xl p-3"
          @click="showThis(item.tracking)"
        >
          <div class="flex justify-between items-center">
            <div>
              <div class="text-xs mb-2 text-gray-300">
                {{ new Date(item.date).toLocaleString('es-NI', { timeZone: 'America/Managua' }) }}
              </div>
              <div class="mb-1 text-sm">
                {{ item.tracking.slice(0, 20) }}
              </div>
            </div>
            <div>
              <ReloadSvg class="w-7 h-7 text-gray-300" />
            </div>
          </div>
        </div>
        <div class="mx-auto text-sm text-gray-400">
          <button type="button" @click="clear">Borrar historial</button>
        </div>
      </div>
      <div v-if="!result.details.length && !history.length" class="text-gray-400 mt-4">
        No hay historial de búsquedas
      </div>
      <PackageDetails :result="result" />
    </div>
  </section>
</template>
