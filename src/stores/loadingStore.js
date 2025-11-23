import { reactive } from 'vue'
export const loadingStores = reactive({
  loading: false,
  start() {
    this.loading = true
  },
  stop() {
    this.loading = false
  },
})
