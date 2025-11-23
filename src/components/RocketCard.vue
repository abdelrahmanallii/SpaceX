<template>

        <div class="col-4">
        <div class="card">
            <div class="img">
                <img :src="launche.flickr_images" alt="">
            </div>
            <div class="card-body">
                <h3>name: {{ launche.name }}</h3>
                <p>localized date: {{ launche.first_flight }}</p>
                <p>description: {{ launche.description }}</p>
                <span>launchpad: {{ launche.country }}</span>
                <p>
                    <strong>
                        status:
                        <span v-if="launche.active === true">success</span>
                        <span v-else-if="launche.active === false">Failed</span>
                        <span v-else>unknown</span>
                    </strong>
                </p>
                <p>type: {{ launche.type }}</p>

                <FaviCon :launche_id="launche.id" />
            </div>
        </div>
    </div>


</template>

<script setup>
import FaviCon from './faviCon.vue';

const props = defineProps({
    launche: {
        type: Object,
        required: true
    }
});
</script>




