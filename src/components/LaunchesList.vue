    <template>
        <div class="container">
            <div class="row">
                <div class="col-4" v-for="launche in launches" :key="launche.id">
                    <div class="card">
                        <div class="img">
                            <img :src="launche.flickr_images" alt="">   
                        </div>
                        <div class="card-body">
                            <h3>name: {{ launche.name }}</h3>
                            <p>localized date: {{ launche.first_flight }}</p>
                            <p>description: {{ launche.description }}</p>
                            <span>launchpad: {{ launche.country }}</span>
                            <p><strong>status:
                                    <span v-if="launche.active === true">success</span>
                                    <span v-else-if="launche.active === false">Failed</span>
                                    <span v-else>unknown</span>
                                </strong></p>
                            <p>type: {{ launche.type }}</p>
                            <slot>
                                <favi-con :launche_id="launche.id"></favi-con>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
import router from '@/router';
import FaviCon from './faviCon.vue';

export default {
    components: { FaviCon  },
    data() {
        return {
            launches: [],
        }
    },
    methods: {
        async getproducts() {
            const res = await fetch("https://api.spacexdata.com/v4/rockets");
            const data = await res.json();
            this.launches = data;
        }
    },
    async mounted() {
        await this.getproducts();
        console.log(router);
    }
}
</script>


