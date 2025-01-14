<template>
    <div class="signup-background">
        <img class="img1" src="../static/home/image 5.svg" alt="">

        <div class="container signup-container">
            <div class="signup-box">
                <div class="row">
                    <div class="col">
                        <p>ราคาคาร์บอน</p>
                        <p class="small-text">เดือน สิงหาคม 2567</p>
                    </div>
                    <div class="col">
                        <img src="" alt="">
                    </div>
                    <div class="col">
                        75.15B
                    </div>
                </div>

                <div class="graph">
                    กราฟ
                </div>

                <div class="row mt-3">
                    <div class="col-9">
                        <p>จำนวนคาร์บอนที่มี</p>
                        <p>มูลค่าเฉลี่ย 198.15B</p>
                    </div>
                    <div class="col-3">
                        <p>98.15C</p>
                    </div>
                </div>
            </div>

            <div v-if="page === 1" class="signup-box2">
                <p>คาร์บอน</p>

                <div class="card">


                    <div class="card-body2">
                        <p>จำนวนคาร์บอน 0 C</p>
                        <p>ราคา 0 บาท</p>
                        <button>ชื้อ</button>
                    </div>

                    <div class="card-body2">
                        <p>จำนวนคาร์บอน 0 C</p>
                        <p>ราคา 0 บาท</p>
                        <button>ชื้อ</button>
                    </div>

                    <div class="card-body2">
                        <p>จำนวนคาร์บอน 0 C</p>
                        <p>ราคา 0 บาท</p>
                        <button>ชื้อ</button>
                    </div>

                    <div class="card-body2">
                        <p>จำนวนคาร์บอน 0 C</p>
                        <p>ราคา 0 บาท</p>
                        <button>ชื้อ</button>
                    </div>

                    <div class="card-body2">
                        <p>จำนวนคาร์บอน 0 C</p>
                        <p>ราคา 0 บาท</p>
                        <button>ชื้อ</button>
                    </div>
                    
                    

                </div>




            </div>

            <div v-if="page === 2" class="signup-box2">
                <p>คาร์บอนราคากลอง</p>
                <div class="card-body">
                    <p>จำนวนคาร์บอนที่มี</p>
                    <p>มูลค่าเฉลี่ย 198.15B</p>
                </div>


                <p>qr code</p>


                <button @click="page = 1" class="btn btn-primary">กลับ</button>
                <button @click="page = 3" class="btn btn-primary">ชื้อ</button>

            </div>

            <div v-if="page === 3" class="signup-box2">
                <p>คาร์บอนราคากลอง</p>
                <div class="card-body">
                    <p>จำนวนคาร์บอนที่มี</p>
                    <p>มูลค่าเฉลี่ย 198.15B</p>
                </div>

                <p>ใบยืนยัน</p>


                <button @click="page = 1" class="btn btn-primary">กลับ</button>

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
            page: 1,
        }
    },
    methods: {},
    mounted() { }
}
</script>

<style scoped>
.img1 {
    position: absolute;
    top: 0;
    width: 200px;
    height: 200px;
    z-index: 1;
}

@media screen and (max-width: 768px) {
    .img1 {
        display: none;
    }

}

.card {
    overflow-y: scroll;
    height: 350px;
    width: 100%;
    border: none;
}

.card-body2{
    background-color: #00A1B4;
    color: #ffffff;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    font-size: large;
    flex-direction: column;
    margin-bottom: 10px;
}

.card-body2>button{
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #c4f1f7;
    color: #000000;
    font-weight: bold;
}

.graph {
    width: 100%;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #909090;
    padding: 20px;
    margin-right: 20px;
}

.signup-background {
    background: linear-gradient(to bottom right, #0BC599 30%, #F1E92E 100%);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.signup-box,
.signup-box2 {
    height: 450px;
    width: 100%;
    max-width: 400px;
    background-color: #ffffff;
    border-radius: 50px;
    box-shadow: 0px 5px 1px 0px #8787875a;
    border: 5px solid #ffffff;
    padding: 20px;
    margin: 10px;
}

.signup-box {
    background-color: #ffffff00;
}

.signup-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.signup-input,
.input-field {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;
}

.signup-btn,
.btn-primary {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.signup-google-btn {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-google-btn img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.small-text {
    font-size: 10px;
}

@media (max-width: 768px) {

    .signup-box,
    .signup-box2 {
        width: 100%;
        max-width: 100%;
    }
}

</style>
