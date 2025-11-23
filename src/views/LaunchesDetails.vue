<template>
    <div class="container">
        <div v-if="loadingStores.loading">
            <GlobalSkeleton />
        </div>
        <div>
            <div class="p-4 row">
                <div class="col-3" v-for="launche in launches" :key="launche.mission_id">
                    <!-- @click="toShow('show', launche.flight_number, launche.mission_name, launche.rocket.rocket_name, launche.launch_year)" -->
                    <RouterLink :to="'/show/' + launche.flight_number + '/' + launche.mission_name">
                        <div class="card">
                            <div class="img">
                                <img :src="launche.links.mission_patch" alt="">
                            </div>
                            <div class="card-body">
                                <h5>mission_name: {{ launche.mission_name }}</h5>
                                <p>launchpad: {{ launche.launch_site.site_name }}</p>
                                <p><strong>status:
                                        <span v-if="launche.launch_success === true">success</span>
                                        <span v-else-if="launche.launch_success === false">Failed</span>
                                        <span v-else>unknown</span>
                                    </strong></p>
                                <p>rocket_name: {{ launche.rocket.rocket_name }}</p>
                                <p>launche year: {{ launche.launch_year }}</p>
                                <p>date: {{ launche.launch_date_utc }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <Pagination :total-items="totalLaunches" :limit="limit" v-model="page"
                    @page-changed="fetchLaunchesWithFilterSort" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { loadingStores } from '@/stores/loadingStore.js'
</script>
<script>
import Pagination from '@/components/Pagination.vue';
import GlobalSkeleton from '@/components/GlobalSkeleton.vue';
import { ref } from 'vue'
const launche = ref({})
export default {
    components: {
        Pagination, GlobalSkeleton,
    },
    data() {
        return {
            launches: [],
            page: 1,
            limit: 8,
            totalLaunches: 0,
        }
    },
    async created() {
        await this.fetchLaunchesWithFilterSort();
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                this.page = Number(this.$route.query.page) || 1;
                this.fetchLaunchesWithFilterSort();
            }
        },
        page(newPage, oldPage) {
            if (newPage !== oldPage) {
                this.$router.replace({
                    query: { ...this.$route.query, page: newPage }
                });
                this.fetchLaunchesWithFilterSort();
            }
        }
    },
    methods: {
        async fetchLaunchesWithFilterSort() {
            loadingStores.start();

            try {
                const filter = this.$route.query.filter || "";
                const sort = this.$route.query.sort || "asc";
                const search = this.$route.query.search || "";
                const page = this.page || 1;
                const limit = this.limit || 8;

                let url = `https://api.spacexdata.com/v3/launches`;
                if (filter) url += `?${filter}`;

                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch launches from API');
                let data = await res.json();

                if (search) {
                    const q = search.toLowerCase();
                    data = data.filter(launche =>
                        launche.mission_name && launche.mission_name.toLowerCase().includes(q)
                    );
                }

                if (sort === 'asc') {
                    data.sort((a, b) => new Date(a.launch_date_utc) - new Date(b.launch_date_utc));
                } else {
                    data.sort((a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc));
                }

                this.totalLaunches = data.length;
                const start = (page - 1) * limit;
                const end = start + limit;
                this.launches = data.slice(start, end);

            } catch (err) {
                console.error('fetchLaunchesWithFilterSort error ->', err);
            } finally {
                loadingStores.stop();
            }
        },

        toShow(view, flight_number, mission_name, rocket_name, launch_year) {
            this.$router.push({
                name: view,
                params: { flight_number, mname: mission_name },
                query: { rocket_name, launch_year }
            });
        }
    }
}

</script>
<style>
.col-4 {
    display: flex;
    align-items: stretch;
    gap: 20px;
}

.card {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.container .img {
    width: 100%;
}

.container .img img {
    width: 100%;
}

.card {
    margin-bottom: 10px;
}
</style>