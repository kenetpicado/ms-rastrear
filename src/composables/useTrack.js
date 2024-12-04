import { useHistoryStore } from '@/stores/history'
import { toast } from '@/utils/toast.js'
import axios from 'axios'
import { ref } from 'vue'

export function useTrack() {
  const BASE_URL = 'https://ft-backend-production.up.railway.app'
  //const BASE_URL = 'http://localhost:3001'
  const searching = ref(false)
  const track = ref('')
  const history = useHistoryStore()

  const result = ref({
    details: [],
    logs: []
  })

  const search = async () => {
    searching.value = true

    await axios
      .get(`${BASE_URL}/search`, {
        params: { track: track.value }
      })
      .then(({ data }) => {
        if (data.details.length > 1) {
          result.value = data
          history.setTracking(track.value)
        }
      })
      .catch(() => {
        toast.error('Error al buscar el paquete')
      })
      .finally(() => {
        searching.value = false
      })
  }

  function resetValues() {
    result.value = { details: [], logs: [] }
  }

  return { search, result, searching, track, resetValues }
}

export default useTrack
