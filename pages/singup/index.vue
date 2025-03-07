<template>
  <div class="signin-background">
    <div class="container signup-container">
      <transition name="fade">
        <div class="signup-box" v-if="show">
          <h2 class="text text-1">สมัครสมาชิก</h2>
          <input v-model="from_signup.email" class="signup-input mb-3 pl-4" placeholder="อีเมล" type="email">
          <input v-model="from_signup.password" class="signup-input mb-3 pl-4" placeholder="รหัสผ่าน" type="password">
          <input v-model="from_signup.confirmPassword" class="signup-input mb-3 pl-4" placeholder="ยืนยันรหัสผ่าน"
            type="password">
          <button v-if="!loading" @click="signup" class="signup-btn mb-3">ยืนยัน</button>
          <div v-if="loading" class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="text-center">
            <!-- <p>หรือ</p>
            <button @click="signUpWithGoogle" class="signup-google-btn">
              <img src="https://th.bing.com/th/id/OIP.D6P-BO32wCApcPIIjt6p5wAAAA?rs=1&pid=ImgDetMain" alt="Google Logo">
              สมัครสมาชิก ด้วย Google
            </button> -->
          </div>
        </div>
      </transition>
      <transition name="fade" @after-enter="loadNext">
        <div class="signup-box2" v-if="showImage">
          <img class="img1" src="../../static/singin/image 6.svg" alt="">
        </div>
      </transition>
      <div class="signup-image"></div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      loading: false,
      show: false,
      showImage: false,

      // แก้ชื่อจาก from_singup เป็น from_signup
      from_signup: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  mounted() {
    this.show = true;
  },
  methods: {
    loadNext() {
      this.showImage = true;
    },
    async signup() {
      try {
        // ตรวจสอบว่ากรอกข้อมูลครบถ้วน
        if (!this.from_signup.email || !this.from_signup.password || !this.from_signup.confirmPassword) {
          throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        // ตรวจสอบรหัสผ่านและยืนยันรหัสผ่านตรงกันหรือไม่
        if (this.from_signup.password !== this.from_signup.confirmPassword) {
          throw new Error("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
        }

        // ลงทะเบียนผู้ใช้ใหม่
        const res = await firebase.auth().createUserWithEmailAndPassword(
          this.from_signup.email,
          this.from_signup.password
        );

        // ส่งอีเมลยืนยันตัวตน
        if (res.user) {
          await res.user.sendEmailVerification();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "อีเมลยืนยันตัวตนถูกส่งเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          // console.log("อีเมลยืนยันตัวตนถูกส่งเรียบร้อย");
        }

        // console.log("ลงทะเบียนสำเร็จ", res);

        this.$router.push('/');

      } catch (error) {
        let errorMessage = "เกิดข้อผิดพลาดในการลงทะเบียน: ";
        if (error.code === 'auth/email-already-in-use') {
          errorMessage += "อีเมลนี้ถูกใช้งานแล้ว";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage += "รูปแบบอีเมลไม่ถูกต้อง";
        } else if (error.code === 'auth/weak-password') {
          errorMessage += "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        } else {
          errorMessage += error.message;
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
        console.error("เกิดข้อผิดพลาดในการลงทะเบียน", error.message);
      }
    },

    signUpWithGoogle() {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "กําลังพัฒนา",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
</script>


<style scoped>
.text-1 {
  color: #0BC598;
  font-weight: bold;
}

.img1 {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50px;
}

.signin-background {
  background: linear-gradient(to bottom right, #0BC599 30%, #F1E92E 100%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-box,
.signup-box2 {
  height: 450px;
  width: 400px;
  background-color: #ffffff;
  border-radius: 50px;
  box-shadow: 0px 5px 1px 0px #8787875a;
  border: 5px solid #ffffff;
  text-align: center;
  padding: 20px;
}

.signup-input {
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: 1px solid #909090;
  background-color: #F2F2F2;
  padding-left: 10px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.signup-input:focus {
  border-color: #0BC598;
  box-shadow: 0 0 10px rgba(11, 197, 152, 0.5);
}

.signup-btn,
.signup-google-btn {
  width: 100%;
  height: 40px;
  border-radius: 30px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.signup-btn {
  background: linear-gradient(to bottom right, #0BC599 20%, #F1E92E 100%);
  color: #ffffff;
}

.signup-google-btn {
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

.signup-btn:hover,
.signup-google-btn:hover {
  transform: scale(1.05);
}

@keyframes backgroundAnimation {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0 0;
  }
}

.signin-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 20%, transparent 20%);
  background-size: 50px 50px;
  animation: backgroundAnimation 1000s linear infinite;
  z-index: 0;
  opacity: 0.8;
}

.signup-box,
.signup-box2,
.signup-image,
.container {
  position: relative;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
