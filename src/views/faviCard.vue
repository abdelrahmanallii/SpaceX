<template>
    <div class="container">
                    <h2>My Favorites</h2>
        
        <div v-if="isLoading">
            <p>Loading favorites...</p>
        </div>
        
        <div v-else-if="favoriteLaunches.length === 0">
            <p>No favorites here</p>
        </div>
        
        <div v-else class="row">
                <RocketCard v-for="launche in favoriteLaunches" :key="launche.id" :launche="launche" />
            <div style="margin-top: 16px;">
                {{ favoriteLaunches.length }} favorites found.
            </div>
        </div>
        
        <div v-if="store.showToast" class="toast">
            {{ store.toastMessage }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RocketCard from '../components/RocketCard.vue';
import { useLocalStore } from '../stores/local.js';

const store = useLocalStore();
const favoriteLaunches = ref([]);
const isLoading = ref(false);

async function loadFavorites() {
    isLoading.value = true;

    store.loadFromLocalStorage();

    if (!store.favorites || store.favorites.length === 0) {
        favoriteLaunches.value = [];
        isLoading.value = false;
        return;
    }

    const res = await fetch('https://api.spacexdata.com/v4/rockets');
    const data = await res.json();

    favoriteLaunches.value = data.filter(launche =>
        store.favorites.includes(launche.id)
    );

    isLoading.value = false;
}

onMounted(() => {
    loadFavorites();
});
</script>

