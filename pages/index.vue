<template>
    <div class="backgroundhome">
        <Nevbar />
        <Home />
    </div>
</template>

<script>
import Nevbar from '~/components/Nevbar.vue'
import Home from '~/components/Home.vue'
import firebase from '~/plugins/firebase.js'

export default {
    components: {
        Nevbar,
        Home
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style>
.backgroundhome {
    background: linear-gradient(to bottom right, #0BC599 30%, #F1E92E 100%);
    height: 100vh;
    width: 100vw;
}
</style>