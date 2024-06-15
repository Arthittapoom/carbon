<template>
<div class="container-fluid c-b-1 mt-5">
    <!-- <div class="row pl-5 pt-5 pr-5">
        <div class="col pl-6 text-h1-p">
            <h2  class="text-white fw-bold text-h1">สิ่งที่เหมาะกับคุณ</h2>
        </div>
        <div class="col">
            <div class="row">
                <div class="col-4">
                    <img class="box-c-1-1-img-1" src="../../static/color/Component.svg" alt="">
                </div>
                <div class="col-8">
                    <div class="text-white pt-3">
                    <p class="text-s-p">วันนี้เหมาะกับสีฟ้า</p>
                    <p class="text-s-p">ควรมีเครื่องประดับ</p>
                    <p class="text-s-p">ที่เป็นสีฟ้า</p>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <h3  class="text-center pt-5 text-white fw-bold text-h1" >สีมงคลประจำวัน</h3>
    <h6 class="text-center text-white" >{{ data.text_color }}</h6>
    <div class="container box-c-1">
            <div class="row text-center box-c-1-1">
                <!-- <div class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/Red.svg" alt="">
                    <p class="text-center box-c-t-1">Red</p>
                </div>
                <div class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/Green.svg" alt="">
                    <p class="text-center box-c-t-1">Green</p>
                </div>
                <div class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/Blue.svg" alt="">
                    <p class="text-center box-c-t-1">Blue</p>
                </div>
                <div class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/Orange.svg" alt="">
                    <p class="text-center box-c-t-1">Orange</p>
                </div>
                <div class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/Yellow.svg" alt="">
                    <p class="text-center box-c-t-1">Yellow</p>
                </div>
                <div class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/Teal.svg" alt="">
                    <p class="text-center box-c-t-1">Teal</p>
                </div> -->
                <div v-if="color == 1" class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/cc/j1.svg" alt="">
                    <p class="text-center box-c-t-1">น้ำตาล/ส้ม</p>
                </div> 
                <div v-if="color == 2" class="col ">
                    <img class="box-c-1-1-img2" src="../../static/color/cc/a1.svg" alt="">
                    <p class="text-center box-c-t-1">แดง/ดำ/เทา</p>
                </div>
                <div v-if="color == 3" class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/cc/p1.svg" alt="">
                    <p class="text-center box-c-t-1">ฟ้า/ชมพู</p>
                </div>
                <div v-if="color == 4" class="col ">
                    <img class="box-c-1-1-img2" src="../../static/color/cc/pr1.svg" alt="">
                    <p class="text-center box-c-t-1">ครีม/เหลือง/ส้ม</p>
                </div>
                <div v-if="color == 5" class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/cc/s1.svg" alt="">
                    <p class="text-center box-c-t-1">เขียว/เทา</p>
                </div>
                <div v-if="color == 6" class="col ">
                    <img class="box-c-1-1-img" src="../../static/color/cc/ss1.svg" alt="">
                    <p class="text-center box-c-t-1">แดง/น้ำเงิน</p>
                </div>
                <div v-if="color == 7" class="col ">
                    <img class="box-c-1-1-img2" src="../../static/color/cc/at1.svg" alt="">
                    <p class="text-center box-c-t-1">เทา/ดำ/น้ำเงิน</p>
                </div> 
            </div>
    </div>
    
</div>  
</template>

<script>
import firebase from '~/plugins/firebase.js'
export default {
    data() {
        return {
            color: 3,
            data : []
        }
    },
    methods: {
        getcolor(){
            const today = new Date();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayIndex = today.getDay();
            const dayName = daysOfWeek[dayIndex];

            if(dayName == "Sunday"){
                this.color = 7
            }else if(dayName == "Monday"){
                this.color = 1
            }else if(dayName == "Tuesday"){
                this.color = 2
            }else if(dayName == "Wednesday"){
                this.color = 3
            }else if(dayName == "Thursday"){
                this.color = 4
            }else if(dayName == "Friday"){
                this.color = 5
            }else if(dayName == "Saturday"){
                this.color = 6
            }
        }
    },
    mounted() {
        this.getcolor()
        const userRef = firebase.database().ref('number');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
          // console.log(this.data);
        });
    }
}
</script>

<style>
.c-b-1{
    background-color: #043128;
    width: 100%;
    height: 500px;
    padding-top: 60px;
}
.pl-6{
    margin-left: 200px;
    margin-top: 50px;
}
.box-c-1{
    margin-top: 120px;
    background-color: #FDBE1C;
    height: 100px;
    width: 500px;
    border-radius: 50px;
}
.box-c-1-1{
    position: relative;
    top: -50px;
}
.box-c-t-1{
    position: relative;
    top: -20px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 15px;
}


@media (max-width: 1000px) {
    .box-c-t-1{
        position: relative;
        top: -10px;
        color: rgb(0, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }
    .box-c-1-1-img{
        width: 70%;
    }
    .box-c-1-1-img2{
        width: 100%;
    }
    .box-c-1{
        margin-top: 120px;
        background-color: #FDBE1C;
        height: 70px;
        width: 300px;
        border-radius: 50px;
    }
    .box-c-1-1-img-1{
        width: 200%;
        position: relative;
        right: 60px;
        top: 10px;
    }
    .text-h1{
        font-size: 30px;
    }
    .text-h1-p{
        position: relative; 
        right: 100px;
        top: -30px;
    }
    .text-s-p{
        font-size: 15px;
        position: relative;
        right: 20px;
    }
}
</style>