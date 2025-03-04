<template>
    <div>
        <Nevbar></Nevbar>
        <div class="main">
            <div class="card-body">
                <div class="card-left">
                    <div class="card-item">

                    </div>
                    <div class="card-item">

                    </div>
                    <div class="card-item">

                    </div>
                    <div class="card-item">

                    </div>
                    <div class="card-item">

                    </div>
                </div>
                <div class="card-right">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import firebase from '~/plugins/firebase.js'
import Nevbar from '../components/Nevbar.vue';
export default {
    components: { Nevbar },

}
</script>

<style scoped>
.main {
    background-color: rgb(158, 195, 198);
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-body {
    width: 100%;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
    margin: 100px;
    border-radius: 20px;
    display: flex;
    gap: 20px;

}

.card-left {
    background-color: aquamarine;
    height: 100%;
    width: 50%;
    display: flex;
}

.card-right {
    background-color: aqua;
    height: 100%;
    width: 50%;
}

.card-item {
    width: 25%;
    height: 100px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
    margin: 20px;
    border-radius: 20px;
}
</style>