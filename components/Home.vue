<template>
   <div>
     <div class="body-main">
        <div class="box-left">
            <p>สรุปภาพรวมตลาด</p>
        </div>
        <div class="box-right">

        </div>
     </div>
   </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
           
        }
    },
    methods: {


    },
    mounted() {
      
    }
}
</script>

<style scoped>
 .body-main {
     display: flex;
 }

 .box-left {
     width: 50%;
     height: 500px;
     background-color: aquamarine;
 }

 .box-right {
     width: 50%;
     height: 500px;
     background-color: blue;
 }
</style>
