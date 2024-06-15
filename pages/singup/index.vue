<template>
    <div class="singup-background">
        <!-- <Nevbar></Nevbar> -->
        <div class="container singup-container">
            <div class="singup-box">
                <div class="singup-logo">
                    <img class="singup-logo-img" src="../../static/login/Group.svg" alt="">
                </div>
                <div class="container singup-box-1">
                    <h2 class="text-center">ยินดีต้อนรับ</h2>
                    <input v-model="name" @input="updateResult" class="singup-input mb-3 pl-4" placeholder="ชื่อ-นามสกุล"
                        type="text">
                    <div class="text-center">
                        <p>เลือกวันเกิด</p>
                    </div>
                    <div class="row">

                        <div class="col">
                            <select class="singup-input mb-3 pl-1" v-model="day">
                                <option v-for="days in range(1, 31)" :value="days">{{ days }}</option>
                              </select>
                            <!-- <input v-model="day" @input="updateResult" class="singup-input mb-3 pl-1" placeholder="วัน" type="text"> -->
                        </div>

                        <div class="col">
                            <select class="singup-input mb-3 pl-1" v-model="month">
                                <option v-for="(months, index) in months" :value="index + 1">{{ months }}</option>
                              </select>
                            <!-- <input v-model="month" @input="updateResult" class="singup-input mb-3 pl-1" placeholder="เดือน" type="number"> -->
                        </div>
                        <div class="col">
                            <select class="singup-input mb-3 pl-1" v-model="year">
                                <option v-for="year in range(2490, 2560)" :value="year">{{ year }}</option>
                              </select>
                            <!-- <input v-model="year" @input="updateResult" class="singup-input mb-3 pl-1" placeholder="ปี" type="text"> -->
                        </div>

                    </div>
                    <input v-model="phone" @input="updateResult" class="singup-input mb-3 pl-4" placeholder="เบอร์โทร"
                        type="text">
                    <!-- <input v-model="email" @input="updateResult" class="singup-input mb-3 pl-4" placeholder="อีเมล"
                        type="text"> -->
                    <input v-model="password" @input="updateResult" class="singup-input mb-3 pl-4"
                        placeholder="รหัสผ่าน" type="password">
                    <input v-model="repassword" @input="updateResult" class="singup-input mb-3 pl-4"
                        placeholder="ยืนยันรหัสผ่าน" type="password">
                    <div class="row">
                        <div class="col-1">
                            <input v-model="check" @input="updateResult" type="checkbox" name="" id="">
                        </div>
                        <div class="col-11">
                            <label for="">ฉันยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว</label>
                        </div>
                    </div>
                    <button @click="register();" class="singup-btn mb-3">มาเริ่มกันเลย</button>
                    <!-- <p class="d-flex justify-content-center mb-3">หรือต่อด้วย</p> -->
                    <!-- <div class="row mb-3">
                        <div class="col d-flex justify-content-center">
                            <div class="singup-logo-google d-flex justify-content-center align-items-center">
                                <img class="singup-logo-google-img" src="../../static/login/flat-color-icons_google.svg"
                                    alt="">
                            </div>
                        </div>
                        <div class="col d-flex justify-content-center">
                            <div class="singup-logo-facebook d-flex justify-content-center align-items-center">
                                <img class="singup-logo-facebook-img" src="../../static/login/bi_facebook.svg" alt="">
                            </div>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="col-7">
                            <p class="ml-3">คุณมีบัญชีอยู่แล้ว?</p>
                        </div>
                        <div class="col-5">
                            <a class="text-decoration-none" href="/login">เข้าสู่ระบบ</a>
                        </div>
                    </div>
                    <!-- {{ resule }} -->
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
            name: '',
            date: '',
            phone: '',
            password: '',
            repassword: '',
            check: false,
            resule: [],
            day: null,
            year: null,
            month: null,
            months: [
                'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
                'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                'กรกฎาคม', 'สิงหาคม', 'กันยายน',
                'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
            ]
        }
    },
    computed: {
    formattedDate() {
      if (!this.day || !this.month || !this.year) return '';
      const formattedDay = this.day.toString().padStart(2, '0');
      const formattedMonth = this.month.toString().padStart(2, '0');
      return `${formattedDay}/${formattedMonth}/${this.year}`;
    }
  },
    methods: {
        range(start, end) {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
 
        updateResult() {
            this.resule = [{
                name: this.name,
                date: this.day + "/" + this.month + "/" + this.year,
                phone: this.phone,
                password: this.password,
                repassword: this.repassword,
                check: this.check
            }]
        },
        set_data_to_user(uid) {

            if (this.day < 10) {
            this.day = '0' + this.day
          }

          if (this.month < 10) {
            this.month = '0' + this.month
          }
          if (this.month == "มกราคม") {
            this.month = "01"
          }
          if (this.month == "กุมภาพันธ์") {
            this.month = "02"
          }
          if (this.month == "มีนาคม") {
            this.month = "03"
          }
          if (this.month == "เมษายน") {
            this.month = "04"
          }
          if (this.month == "พฤษภาคม") {
            this.month = "05"
          }
          if (this.month == "มิถุนายน") {
            this.month = "06"
          }
          if (this.month == "กรกฎาคม") {
            this.month = "07"
          }
          if (this.month == "สิงหาคม") {
            this.month = "08"
          }
          if (this.month == "กันยายน") {
            this.month = "09"
          }
          if (this.month == "ตุลาคม") {
            this.month = "10"
          }
          if (this.month == "พฤศจิกายน") {
            this.month = "11"
          }
          if (this.month == "ธันวาคม") {
            this.month = "12"
          }

            firebase.database().ref('users/' + uid).set({
                name: this.name,
                date: this.day + "/" + this.month + "/" + this.year,
                phone: this.phone,
                password: this.password,
                repassword: this.repassword,
                check: this.check,
                status: "ใช้งานเว็บไซต์ได้ตลอด",
                login_date: new Date().toISOString(), // แปลงเป็น ISO 8601 string
                status_open: 30
            }).then(() => {
                alert("สมัครสมาชิกเรียบร้อย")
                localStorage.setItem('uid', uid)
                this.$router.push('/')
            })
           
        },
        register() {

            if (this.password != this.repassword) {
                alert("รหัสผ่านไม่ตรงกัน");
            }else if (this.check == false) {
                alert("กรุณายอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว");
            }
            else if (this.name == '' || this.phone == '' || this.password == '' || this.repassword == '' || this.days == '' || this.months == '' || this.years == '') {
                alert("กรุณากรอกข้อมูลให้ครบ")
            }else{
                const email = this.phone + '@gmail.com'
                firebase.auth().createUserWithEmailAndPassword(email, this.password).then(user => {
                    const uid = user.user.uid
                    // alert("uid" + uid)
                    this.set_data_to_user(uid);
                }).catch((error) => {
                    alert("มีบางอย่างผิดพลาด : " + error.message)
             });
            }

        }
    }
}
</script>

<style>
.singup-background {
    background-image: url('../../static/login/Rectangle.svg');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 1000px;
}

.singup-logo {
    text-align: center;
}

.singup-logo-img {
    width: 200px;
    height: 200px;
    position: relative;
    top: 0px;
}

.singup-box {
    width: 500px;
    height: auto;
    background-color: #fff;
    border-radius: 50px;
    box-shadow: 0px 0px 10px 0px #909090;
    margin-top: 10%;
}

.singup-container {
    display: flex;
    justify-content: center;
}

.singup-box-1 {
    position: relative;
    top: 0px;
    padding-right: 50px;
    padding-left: 50px;
}

.singup-input {
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
}

.singup-btn {
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #909090;
    background-color: #014339;
    color: #ffffff;
    font-weight: bold;
}

.singup-btn:hover {
    background-color: #ffffff;
    color: #014339;
    border: 3px solid #014339;
}

.singup-logo-google {
    width: 80%;
    height: 50px;
    background: #F2F2F2;
    border-radius: 50px;
}

.singup-logo-facebook {
    width: 80%;
    height: 50px;
    background: #F2F2F2;
    border-radius: 50px;
}

.singup-logo-facebook-img {
    width: 70%;
    height: 70%;
}

.singup-logo-google-img {
    width: 70%;
    height: 70%;
}
</style>