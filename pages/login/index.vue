<template>
    <div class="login-background">
        <!-- <Nevbar></Nevbar> -->
        <div class="container login-container">
            <div class="login-box">
                <div class="login-logo">
                    <img class="login-logo-img" src="../../static/login/Group.svg" alt="">
                </div>
                <div class="container login-box-1">
                    <h2 class="text-center">ยินดีต้อนรับ</h2>
                    <p>เบอร์โทร</p>
                    <input v-model="email" class="login-input mb-3 pl-4" placeholder="เบอร์โทร" type="text">
                    <p>รหัสผ่าน</p>
                    <input v-model="password" class="login-input mb-3 pl-4" placeholder="รหัสผ่าน" type="password">
                    <div class="row">
                        <div class="col-9">
                            <div class="row">
                                <div class="col-2">
                                    <input v-model="check" type="checkbox" name="" id="">
                                </div>
                                <div class="col-10">
                                    <label for="">ฉันยอมรับนโยบายความเป็นส่วนตัว</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 d-flex justify-content-end mb-3">
                            <a href="#" @click="forgotPassword()">ลืมรหัส</a>
                        </div>
                    </div>
                    <button @click="login();" class="login-btn mb-3">เข้าสู่ระบบ</button>
                    <!-- <p class="d-flex justify-content-center mb-3">or continue with</p> -->
                    <!-- <div class="row mb-3">
                        <div class="col d-flex justify-content-center">
                            <div class="login-logo-google d-flex justify-content-center align-items-center">
                                <img class="login-logo-google-img" src="../../static/login/flat-color-icons_google.svg"
                                    alt="">
                            </div>
                        </div>
                        <div class="col d-flex justify-content-center">
                            <div class="login-logo-facebook d-flex justify-content-center align-items-center">
                                <img class="login-logo-facebook-img" src="../../static/login/bi_facebook.svg" alt="">
                            </div>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="col-7">
                            <p class="ml-3">ยังไม่มีบัญชี?</p>
                        </div>
                        <div class="col-5">
                            <a class="text-decoration-none" href="/singup">สร้างบัญชี</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Nevbar from '~/components/Nevbar.vue'
export default {
    components: {
        Nevbar
    },
    data() {
        return {
            email: '',
            password: '',
            check: false,
            data : [],
            uid : "",
        }
    },
    mounted() {
        
    },
    methods: {
        login() {
            if (!this.email || !this.password) {
                alert('กรุณากรอกข้อมูลให้ครบ')
            } else if (this.check == false) {
                alert('กรุณาตรวจสอบการจำกัดความยาวของข้อมูล')
            } else {
                const email = this.email + '@gmail.com'
                // alert(email)
                firebase.auth().signInWithEmailAndPassword(email, this.password)
                    .then((user) => {
                        
                        localStorage.setItem('uid', user.user.uid)
                        alert('Login Success' )

                        this.getdatauser(user.user.uid)

                    })
                    .catch((error) => {
                        alert("มีบางอย่างผิดพลาด : " + error.message)
                })
            }
        },
        getdatauser(uid){
        const userRef = firebase.database().ref('users/' + uid);
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();

          if (this.data.admin == true) {
            this.$router.push('/adminW')
          }else{
            this.$router.push('/')
          }
        //   console.log(this.data);
        });
      },

        forgotPassword() {
            firebase.auth().sendPasswordResetEmail(this.email)
                .then(() => {
                    alert('Check your email')
                })
                .catch((error) => {
                    alert(error.message)
                })
        }

    }
}
</script>

<style>

.login-background {
    background-image: url('../../static/login/Rectangle.svg');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 850px;
}

.login-logo {
    text-align: center;
}

.login-logo-img {
    width: 200px;
    height: 200px;
    position: relative;
    top: 0px;
}

.login-box {
    width: 500px;
    height: auto;
    background-color: #fff;
    border-radius: 50px;
    box-shadow: 0px 0px 10px 0px #909090;
    margin-top: 10%;
}

.login-container {
    display: flex;
    justify-content: center;
}

.login-box-1 {
    position: relative;
    top: 0px;
    padding-right: 50px;
    padding-left: 50px;
}

.login-input {
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
}

.login-btn {
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #909090;
    background-color: #014339;
    color: #ffffff;
    font-weight: bold;
}

.login-btn:hover {
    background-color: #ffffff;
    color: #014339;
    border: 3px solid #014339;
}

.login-logo-google {
    width: 80%;
    height: 50px;
    background: #F2F2F2;
    border-radius: 50px;
}

.login-logo-facebook {
    width: 80%;
    height: 50px;
    background: #F2F2F2;
    border-radius: 50px;
}

.login-logo-facebook-img {
    width: 70%;
    height: 70%;
}

.login-logo-google-img {
    width: 70%;
    height: 70%;
}

@media (max-width: 415px) {
    .login-box-1 {
        position: relative;
        top: 0px;
        padding-right: 50px;
        padding-left: 50px;
    }

    .login-logo-img {
        width: 200px;
        height: 200px;
        position: relative;
        top: 0px;
    }

}
</style>