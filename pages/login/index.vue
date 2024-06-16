<template>
  <div class="signin-background">
    <div class="container signup-container">
      <div class="signup-box">
        <h2 class="text text-1">เข้าสู่ระบบ</h2>
        <input v-model="email" class="signup-input mb-3 pl-4" placeholder="อีเมล" type="email">
        <input v-model="password" class="signup-input mb-3 pl-4" placeholder="รหัสผ่าน" type="password">
        <button @click="register" class="signup-btn mb-3">เข้าสู่ระบบ</button>
        <div class="text-center">
          <p>หรือ</p>
          <button @click="signUpWithGoogle" class="signup-google-btn">
            <img src="https://th.bing.com/th/id/OIP.D6P-BO32wCApcPIIjt6p5wAAAA?rs=1&pid=ImgDetMain" alt="Google Logo">
            เข้าสู่ระบบ ด้วย Google
          </button>
          <div style="text-align: start;">
            <p class="mt-3">ยังไม่มีบัญชี? <a href="/singup">สมัครสมาชิก</a></p>
            <p>ลืมรหัสผ่าน? <a href="#">คริก</a></p>
          </div>


        </div>
      </div>
      <div class="signup-box2">
        <img class="img1" src="../../static/singin/image 6.svg" alt="">
      </div>
      <div class="signup-image">
        <!-- <img src="../../static/login/your-image.png" alt="Signup Image"> -->
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import firebase from '~/plugins/firebase.js'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      if (!this.email || !this.password) {

        Swal.fire({
          position: "center",
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบ",
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {

            localStorage.setItem('uid', user.user.uid)

            Swal.fire({
              position: "center",
              icon: "success",
              title: "เข้าสู่ระบบสำเร็จ",
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.getdatauser(user.user.uid)
            })

            

          })
          .catch((error) => {

            Swal.fire({
              position: "center",
              icon: "error",
              title: "มีบางอย่างผิดพลาด : " + error.message,
              showConfirmButton: false,
              timer: 1500
            });
            
          })
      }
    },
    getdatauser(uid) {

      this.$router.push('/')

      // const userRef = firebase.database().ref('users/' + uid);
      // userRef.on('value', (snapshot) => {
      //   this.data = snapshot.val();
      // });

    },
    signUpWithGoogle() {
      // Perform the Google signup process
      
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

<style>
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

.signin-background {
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

  text-align: center;
  height: 450px;
  width: 400px;
  background-color: #ffffff;
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
  /* padding: 20px; */
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
  border-radius: 15px;
  border: 1px solid #909090;
  background-color: #F2F2F2;
  padding-left: 10px;
}

.signup-btn {
  width: 100%;
  height: 40px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(to bottom right, #0BC599 20%, #F1E92E 100%);
  color: #ffffff;
  font-weight: bold;
}

.signup-google-btn {
  width: 100%;
  height: 40px;
  border-radius: 30px;
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
