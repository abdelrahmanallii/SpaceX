<template>
    <nav class="nav">
        <div class="logo">
            <img src="../assets/pics/space-x-logo.png" alt="" />
        </div>
        <div class="list">
            <ul>
                <li>
                    <RouterLink to="/">launches</RouterLink>
                </li>
                <li>
                    <RouterLink to="/about">about</RouterLink>
                </li>
                <li>
                    <RouterLink to="/details">Details</RouterLink>
                </li>
                <li>
                    <RouterLink to="/favcard">favcard</RouterLink>
                </li>

            </ul>
        </div>

        <div class="search">
            <input type="search" name="" id="" placeholder="sreach" v-model="searchQuery" @input="debouncedSearch"
                @keyup.enter="applyFilterSort()">
        </div>

        <div class="filrt d-flex gap-3">
            <select id="" v-model="selectedFilter">
                <option value=''>all</option>
                <option value="true">success</option>
                <option value="false">failure</option>
                <option value="null">upcoming</option>
            </select>
            <select class="form-select" v-model="selectedSort">
                <option value="asc">Date ↑</option>
                <option value="desc">Date ↓</option>
            </select>
            <button @click="applyFilterSort()">search</button>
            <button @click="resetFilterSort">Reset</button>

        </div>


    </nav>
</template>

<script>
export default {
    data() {
        return {
            selectedFilter: '',
            selectedSort: '',
            launches: [],
            query: "",
            searchQuery: "",
            debouncedSearch: null,
        }
    },
    methods: {
        async applyFilterSort() {
            let filterQuery = '';
            if (this.selectedFilter === 'true') filterQuery = 'launch_success=true';
            else if (this.selectedFilter === 'false') filterQuery = 'launch_success=false';
            else if (this.selectedFilter === 'null') filterQuery = 'launch_success=null';

            console.log('this.query', this.query);
            const res = await fetch(`https://api.spacexdata.com/v3/launches?${this.query}`);
            const data = await res.json();
            if (this.selectedSort === 'asc') {
                data.sort((a, b) => new Date(a.launch_date_utc) - new Date(b.launch_date_utc));
            }
            else {
                data.sort((a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc));
            }
            this.launches = data;
            this.$router.push({ path: "/details", query: { filter: filterQuery, sort: this.selectedSort, search: this.searchQuery } });
            console.log(this.$route.query);
        },
        resetFilterSort() {
            this.selectedFilter = '';
            this.selectedSort = 'asc';
            this.$router.push({ path: '/details', query: {} });
        },
        debounce(fn, delay) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fn.apply(this, args);
                }, delay);
            };
        },
    }
}



</script>




<style>
.nav {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: antiquewhite;
    padding: 0px 20px;
    column-gap: 24px;
    margin-bottom: 10px;
}

.logo {
    width: 10%;

}

.logo img {
    width: 100%;
}

.list ul {
    padding-left: 10px;
    padding-top: 20px;
    display: flex;
    gap: 30px;
    list-style: none;
}

.list ul a {
    color: rgb(0, 0, 0);
    font-size: 13px;
    font-family: Verdana, arial, sans-serif;
    font-weight: 700;
}
</style>
