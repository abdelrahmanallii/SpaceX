import { defineStore } from 'pinia'

export const useLocalStore = defineStore('local', {
  state: () => ({
    favorites: []
  }),
  actions: {
    toggleFavorite(id) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter(f => f !== id)
      } else {
        this.favorites.unshift(id)
      }

      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('favorites')
      this.favorites = saved ? JSON.parse(saved) : []
    }
  }
})
