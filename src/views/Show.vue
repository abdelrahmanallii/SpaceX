<template>
    <div class="container">
        <div class="row">
            <div class="bigcard" v-if="launches.rocket">
                <div class="card">
                    <div class="img">
                        <img :src="launches.links.mission_patch" alt="">
                    </div>
                    <div class="card-body">
                        <h5>mission_name: {{ launches.rocket.rocket_name }}</h5>
                        <p>rocket type: {{ launches.rocket.rocket_type }}</p>
                        <p>
                            status:
                            <span v-if="launches.launch_success === true">Successful</span>
                            <span v-else-if="launches.launch_success === false">Failed</span>
                            <span v-else>unknown</span>
                        </p>
                        <p v-if="launches.launch_success === false && launches.launch_failure_details">
                            reason: {{ launches.launch_failure_details.reason }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            launches: [],
            flight: [],

        }
    },
    methods: {
        async getproducts() {
            const res = await fetch(`https://api.spacexdata.com/v3/launches/${this.flight}`);
            const data = await res.json();
            this.launches = data;
            console.log(data);

        },

    },
    mounted() {
        this.flight = this.$route.params.flight_number;
        this.getproducts();
    }
}



</script>

<style scoped>
.bigcard {
    display: flex;
    justify-content: center;

}

.card {
    margin-top: 50px;
    border: none;
    display: flex;
    align-items: center;
    font-size: 20px;
}


.container .img {
    width: 25%;
}

.container .img img {
    width: 100%;
}

.card {
    margin-bottom: 10px;
}
</style>
