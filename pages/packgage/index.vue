<template>
    <div class="pack-background">
        <Nevbar ></Nevbar>
        <div class="container pack-container">
            <div class="pack-box">
                <div class="pack-logo">
                    <img class="pack-logo-img" src="../../static/login/Group.svg" alt=""> 
                </div>
                <div class="container pack-box-1">
                    <h2 class="text-center">สมัครเเพ็คเกจ</h2>
                    <div class="d-flex justify-content-center pt-4">
                        <div class="pack-box-2">
                            <div class="container pt-3 pl-4">
                                <div class="row">
                                    <div class="col">
                                        <h2 class="fw-bold text-white pack-text">99</h2>
                                        <p class="fw-bold text-white pack-text-1">บาท</p>
                                    </div>
                                    <div class="col">
                                        <img class="pack-vec-img" src="../../static/packgage/Vector.svg" alt="">
                                    </div>
                                </div>
                                <h2 class="pack-text-2">ต่อเดือน</h2>
                                <p class="pack-text-p-1 mt-4"></p>
                                <div class="hr-pack mt-4"></div>
                                <div class="row mt-4">
                                    <div class="col-2">
                                        <img class="pack-tick" src="../../static/packgage/tick.svg" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p class="pack-text-p-2">ทำนายฝัน</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <img class="pack-tick" src="../../static/packgage/tick.svg" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p class="pack-text-p-2">คำนวณราศี</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <img class="pack-tick" src="../../static/packgage/tick.svg" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p class="pack-text-p-2">สีมงคล</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <img class="pack-tick" src="../../static/packgage/tick.svg" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p class="pack-text-p-2">เลขมงคล</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center">
                                    
                                    <b-button onclick="window.location.href='/payment'" class="btn-pack mt-4">สมัคร</b-button>
                                </div>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import Nevbar from '~/components/Nevbar.vue'
export default {
    components: {
    Nevbar
  },
  data(){
    return{
    }
  },
  mounted(){
    const uid = localStorage.getItem("uid")
    if (uid) {}else {this.$router.push('/login')}
}
}
</script>

<style>
.pack-background {
    background-image: url('../../static/login/Rectangle.svg');
        background-size: cover;
        background-position: center;
        width: auto;
        height: auto;
}
.pack-logo{
    text-align: center;
}
.pack-logo-img{
    width: 200px;
    height: 200px;
    position: relative;
    top: -130px;
}
.pack-box{
    width: auto;
    height: auto;
    background-color: #fff;
    border-radius: 50px;
    box-shadow: 0px 0px 10px 0px #909090;
    margin-top: 10%;
}
.pack-container{
    display: flex;
    justify-content: center;
}
.pack-box-1{
    position: relative;
    top: -160px;
    padding-right: 20px;
    padding-left: 20px;
    
}
.pack-box-2{
    width: 360px;
    height: 600px;
    border-radius: 20px;
    background-color: #1E1E1E;

}
.pack-vec-img{
    position: relative;
    top: -22px;
    left: 40px;
}
.pack-text{
    font-size: 50px;
}
.pack-text-1{
    font-size: 40px;
}
.pack-text-2{
    color: #D5B451;
}
.pack-text-p-1{
    color: #fff;
    width: 80%;
}
.pack-text-p-2{
    color: #fff;
    position: relative;
    right: 20px;
}
.pack-tick{
    
}
.hr-pack{
    margin-top: 1rem;
      margin-bottom: 1rem;
      border-top: 3px solid rgb(255, 255, 255);
}
.btn-pack{
    background-color: #D5B451;
    border-radius: 32px;
    width: 157px;
    height: 50px;
    color: #000;
    font-weight: bold;
}
</style>