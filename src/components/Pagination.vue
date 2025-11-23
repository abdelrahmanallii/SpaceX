<template>
    <div class="pagination text-center my-3">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>

        <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
            :class="{ 'font-bold': page === currentPage, 'mx-1': true }">
            {{ page }}
        </button>

        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<script>
export default {
    props: {
        totalItems: {
            type: Number,
            required: true
        },
        limit: {
            type: Number,
            default: 15
        },
        modelValue: {
            type: Number,
            default: 1
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.limit);
        },
        currentPage: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
                this.$emit('page-changed', value);
            }
        }
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        goToPage(page) {
            this.currentPage = page;
        }
    }
};
</script>

<style scoped>
button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.font-bold {
    font-weight: bold;
}

.mx-1 {
    margin: 0 5px;
}
</style>
