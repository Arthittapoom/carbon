<template>
    <div class="signup-background">

        <img class="img1" src="../static/home/image 5.svg" alt="">

        <div class="container signup-container">
            <div class="signup-box">
                <div class="row">
                    <div class="col">
                        <p>ราคาคาร์บอน</p>
                        <p style="font-size: 10px;">เดือน สิงหาคม 2567</p>
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
                        <p>จำนวนคาร์บอนที่มีจำหน่อย</p>
                        <p>มูลค่าเฉลีย 198.15B</p>
                    </div>
                    <div class="col-3">
                        <P>98.15C</P>
                    </div>

                </div>


            </div>
            <div class="signup-box2">
                <p>คาร์บอนราคากลอง</p>
                <div class="card-body">
                    <p>จำนวนคาร์บอนที่มีจำหน่อย</p>
                    <p>มูลค่าเฉลีย 198.15B</p>
                </div>

                <input style="width: 100%;"  class="mt-3 mb-3" type="text" placeholder="จำนวนคาร์บอน" name="" id="">

                <button class="btn btn-primary">ชื้อ</button>

                <p>คาร์บอทราคาในตลาด</p>

                <div class="card-body">
                    คุณ อาทิตภูมิ ลงคาร์บอนในร้านค้า
                    จำนวนคาร์บอนที่มีจำหน่อย 49.15C
                    มูลค่าเฉลีย 198.15B
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
export default {
    components: {

    },
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

<style>
.img1 {
    position: absolute;
    left: auto;
    top: 0;
    
    width: 200px;
    height: 200px;
    z-index: 1;
}
.card-body {
    width: 100%;
    height: 100px;
    background-color: #3FCFC8;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #909090;
    padding: 20px;
    margin-right: 20px;
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
}

.signup-box {
    height: 450px;
    width: 400px;
    background-color: #ffffff00;
    border-radius: 50px;
    box-shadow: 0px 5px 1px 0px #8787875a;
    border: 5px solid #ffffff;
    padding: 20px;
    /* margin-right: 20px; */


}
.signup-box2 {
    height: 450px;
    width: 400px;
    background-color: #ffffff;
    border-radius: 50px;
    box-shadow: 0px 5px 1px 0px #8787875a;
    border: 5px solid #ffffff;
    padding: 20px;
    /* margin-right: 20px; */


}

.signup-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.signup-input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;
}

.signup-btn {
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
</style>