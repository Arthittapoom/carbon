<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="transparent">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <img class="img-logo" src="Group 24.png" alt="">
          <b-nav-item class="ml-5" to="/">หน้าแรก</b-nav-item>
          <b-nav-item v-if="role == 'admin'" class="ml-5" to="/manage-users">จัดการร้าน</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item v-if="islogin == true" id="show-btn" @click="$bvModal.show('bv-modal-example')"
            class="mr-5">แจ้งเตือน</b-nav-item> -->

          <b-nav-item v-if="islogin == false" class="mr-5" href="/login">เข้าสู่ระบบ</b-nav-item>
          <b-nav-item v-if="islogin == true">{{ formatNumber(amount) }} บาท</b-nav-item>
          <b-nav-item v-if="islogin == true" to="/Topup" class="btn-goto-pay">เติมเงิน</b-nav-item>
          <b-dropdown v-if="islogin == true" right class="mr-5">
            <template #button-content>
              <img class="icon-user"
                src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png" alt="">
            </template>
            <b-dropdown-item disabled>{{ userEmail }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="profile">โปรไฟล์</b-dropdown-item>
            <b-dropdown-item @click="logout">ออกจากระบบ</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        แจ้งเตือน
      </template>
      <div class="d-block text-center">
        <!-- <b-alert show variant="success">ระบบยังไม่มีการแจ้งเตือน</b-alert> -->
        <b-alert v-if="item.status === 'รอการตรวจสอบ'" v-for="item in noitify" show variant="warning">
          <p>{{ item.status }} {{ item.tree.totalCarbon }} C {{ item.tree.carbonPrice }} บาท</p>
        </b-alert>

        <b-alert v-if="item.status === 'ตรวจสอบแล้ว'" v-for="item in noitify" show variant="success">
          <p>{{ item.status }} {{ item.tree.totalCarbon }} C {{ item.tree.carbonPrice }} บาท</p>
          <button class="btn btn-success">โหลดเอกสาร</button>
        </b-alert>

      </div>
      <b-button class="mt-3 btn-danger" block @click="$bvModal.hide('bv-modal-example')">ปิด</b-button>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import firebase from '~/plugins/firebase.js'
export default {
  data() {
    return {
      islogin: false,
      userEmail: '',
      role: '',
      noitify: null,
      amount: ''
    }
  },
  mounted() {
    this.Checkislogin()

  },
  methods: {
    formatNumber(num) {
      return new Intl.NumberFormat('th-TH').format(num);
    },


    getbuyCorbon(uid) {
      // ตรวจสอบว่า `this.noitify` ถูกตั้งค่าเริ่มต้นหรือไม่
      if (!this.noitify) {
        this.noitify = [];
      }

      // ลบข้อมูลใน `this.noitify` ทิ้ง


      firebase.database().ref('buyCorbon').on('value', (snapshot) => {
        const data = snapshot.val();

        this.noitify = [];

        // console.log(data);

        // แปลง data ให้เป็น Array เพื่อให้ใช้ forEach ได้
        if (data) {
          Object.values(data).forEach((element) => {
            if (element.uid == uid) {
              this.noitify.push(element);
            }
          });
        }

        // console.log(this.noitify);
      });
    },


    getuser(uid) {
      firebase.database().ref('users/' + uid).on('value', (snapshot) => {
        const data = snapshot.val();
        this.role = data.role
        this.amount = data.amount
        // console.log(data);
      })
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'ออกจากระบบสําเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },

    Checkislogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.islogin = true;
          this.userEmail = user.email;
          this.getbuyCorbon(user.uid)
          this.getuser(user.uid)
        } else {
          this.islogin = false;
        }
      });
    },

    profile() {
      this.$router.push('/profile-info')
    }

  }
}
</script>

<style scoped>
.btn-goto-pay {
  background-color: #bdec3c !important;
  border-radius: 5px !important;
  margin-right: 20px !important;
  font-weight: bold;
  /* เงา */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.icon-user {
  width: 30px;
  height: 30px;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgb(44, 44, 44);
  font-weight: bold;
  font-size: large;
  font-family: "Prompt", sans-serif;
}

.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link:focus {
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.navbar-toggler {
  background-color: #a7a7a7;
}

.bg-transparent {
  background-color: #f6f6f6 !important;
}

@media (max-width: 575px) {
  .ml-5 {
    margin-left: 0px !important;
  }
}

.btn-secondary {
  color: #fff;
  background-color: #0088ff00;
  border-color: #0088ff00;
}

.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show>.btn-secondary.dropdown-toggle {
  color: #000000;
  background-color: #0088ff00;
  border-color: #0088ff00;
}

.btn-secondary:focus,
.btn-secondary.focus {
  color: #000000;
  background-color: #0088ff00;
  border-color: #0088ff00;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0);
}

.img-logo {
  width: auto;
  height: 53px;
}
</style>
