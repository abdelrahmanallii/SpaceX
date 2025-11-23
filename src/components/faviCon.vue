<template>
    <div @click="activeToggle">
        <span class="icon">
            <i class="pi-heart" :class="{ active: isFavorite }"></i>
        </span>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useLocalStore } from '../stores/local.js';
import { useToast } from "vue-toastification";

const store = useLocalStore();
const toast = useToast();

const props = defineProps({
    launche_id: {
        type: String,
        required: true
    }
});

const isFavorite = computed(() => store.favorites.includes(props.launche_id));

function activeToggle() {
    if (store.favorites.includes(props.launche_id)) {
        store.favorites = store.favorites.filter(f => f !== props.launche_id)
        store.saveToLocalStorage();
        toast.info("Removed from favorites!")
    } else {
        store.favorites.unshift(props.launche_id)
        store.saveToLocalStorage();
        toast.success("Added to favorites!")
    }
}

onMounted(() => {
    store.loadFromLocalStorage();
});
</script>

<style>
.icon {
    background-color: aliceblue;
    padding: 10px;
    font-size: 24px;
    display: inline-block;
    text-align: center;
    width: 40px;
    height: 40px;
}

.icon i {
    color: red;
    transition: 0.2s;
}

.icon i:hover {
    cursor: pointer;
}

/* لما يكون Favorite */
.icon i.active {
    color: green;
}
</style>
