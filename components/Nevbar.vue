<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="transparent">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="ml-5" href="/">หน้าแรก</b-nav-item>
          <b-nav-item class="ml-5" href="#">จัดการร้าน</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item id="show-btn" @click="$bvModal.show('bv-modal-example')" class="mr-5">แจ้งเตือน</b-nav-item>
          <b-nav-item v-if="!uid" class="mr-5" href="/login">เข้าสู่ระบบ</b-nav-item>
          <b-dropdown v-if="uid" right class="mr-5">
            <template #button-content>
              <img class="icon-user" src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png" alt="">
            </template>
            <b-dropdown-item disabled>{{ data.email }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
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
        <b-alert show variant="success">ระบบยังไม่มีการแจ้งเตือน</b-alert>
      </div>
      <b-button class="mt-3 btn-danger" block @click="$bvModal.hide('bv-modal-example')">ปิด</b-button>
    </b-modal>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
export default {
  data() {
    return {
      uid: '',
      userEmail: '',
      data: [],
    }
  },
  mounted() {
    const uid = localStorage.getItem("uid");
    const userEmail = localStorage.getItem("userEmail"); // Assume the email is stored in localStorage
    this.uid = uid;
    this.userEmail = userEmail;

    this.getdatauser(uid);
  },
  methods: {
    logout() {
      // Clear user data and redirect to login page
      localStorage.removeItem("uid");
      localStorage.removeItem("userEmail");
      this.uid = '';
      this.userEmail = '';
      this.$router.push('/');
    },

    getdatauser(uid) {
      const userRef = firebase.database().ref('users/' + uid);
      userRef.on('value', (snapshot) => {
        this.data = snapshot.val();
        //   console.log(this.data);
      });
    },

  }
}
</script>

<style>
.icon-user {
  width: 30px;
  height: 30px;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgb(0, 0, 0);
}

.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link:focus {
  color: rgb(255, 255, 255);
}

.navbar-toggler {
  background-color: #a7a7a7;
}

.bg-transparent {
  background-color: #fefef100 !important;
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
.btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active, .show > .btn-secondary.dropdown-toggle {
    color: #fff;
    background-color: #0088ff00;
    border-color: #0088ff00;
}
.btn-secondary:focus, .btn-secondary.focus {
    color: #fff;
    background-color: #0088ff00;
    border-color: #0088ff00;
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0);
}
</style>
