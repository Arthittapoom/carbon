<template>
    <div >
        <b-navbar toggleable="sm" type="dark" variant="transparent">
      
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav >
              <b-nav-item class="ml-5" href="/">กลับสู่หน้าหลัก</b-nav-item>
              <b-nav-item class="ml-5" href="/packgage">บริการรายเดือน</b-nav-item>
            </b-navbar-nav>
      
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item v-if="!uid" class="mr-5" href="/singup">สมัครสมาชิก</b-nav-item>
                <b-nav-item v-if="!uid"  class="mr-5" href="/login">เข้าสู่ระบบ</b-nav-item>
                <!-- {{ data.name }}  -->
                <b-nav-item id="show-btn" @click="$bvModal.show('bv-modal-example')" v-if="uid" class="mr-5" >ข้อมูลส่วนตัว</b-nav-item>

                <b-nav-item v-if="uid" @click="logout();" class="mr-5" >ออกจากระบบ</b-nav-item>
                
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

        <b-modal id="bv-modal-example" hide-footer>
          <template #modal-title>
            ข้อมูลส่วนตัว
          </template>
          <div class="d-block text-center">
            <h6>ชื่อ-นามสกุล</h6>
            <input v-model="data.name" placeholder="แก้ไขชื่อ" type="text">
            <div class="mt-3"> วันเกิด : {{ formattedDate }}</div>
            <select v-model="day">
              <option v-for="days in range(1, 31)" :value="days">{{ days }}</option>
            </select>
            <select v-model="month">
              <option v-for="(months, index) in months" :value="index + 1">{{ months }}</option>
            </select>
            <select v-model="year">
              <option v-for="year in range(2490, 2560)" :value="year">{{ year }}</option>
            </select>
            <hr>
            <h6>เบอร์โทร : {{ data.phone }}</h6>
            <h6>วันที่ใช้งานเว็บได้ {{ daysSinceLogin(data.login_date) }}/{{ data.status_open }} วัน</h6>
          </div>
          <b-button class="mt-3 btn-success" block @click="saveedit()">บันทึก</b-button>
          <b-button class="mt-3 btn-danger" block @click="$bvModal.hide('bv-modal-example')">ปิด</b-button>
        </b-modal>
      </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
  components: {},
  data() {
    return {
      uid: "",
      data: [],
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
  mounted() {
    try {
      const uid = this.uid = localStorage.getItem("uid");
      this.getdatauser(uid);
    } catch (error) {
      console.error(error);
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
    saveedit() {

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

      const formattedDate = `${this.day}/${this.month}/${this.year}`;
      this.data.date = formattedDate;
      
      firebase.database().ref('users/' + this.uid).update({
        name: this.data.name,
        date: formattedDate
      });

      alert("บันทึกเรียบร้อย");
      this.getdatauser(this.uid);
      this.$bvModal.hide('bv-modal-example');
    },
    daysSinceLogin(loginDate) {
      const loginDateTime = new Date(loginDate);
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - loginDateTime.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      return daysDifference + 1;
    },
    logout() {
      localStorage.removeItem("uid");
      alert("ออกจากระบบ");
      window.location.reload();
    },
    getdatauser(uid) {
     
      const userRef = firebase.database().ref('users/' + uid);
      userRef.on('value', (snapshot) => {
        this.data = snapshot.val();

        if (this.data == null) {
          window.location = '/login'
        }

        if (this.data.date) {
          const dateParts = this.data.date.split('/');
          this.day = parseInt(dateParts[0]);
          this.month = parseInt(dateParts[1]);
          this.year = parseInt(dateParts[2]);
        }
      });
    }
  }
}
</script>


<style>
.navbar-dark .navbar-nav .nav-link {
    color: rgb(255, 255, 255);
}
.navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {
    color: rgb(124 124 124);
}
.navbar-toggler {
    background-color: #a7a7a7;
}
.bg-transparent {
  background-color: #fefef100 !important;
}

@media (max-width: 575px) {
  .ml-5{
    margin-left: 0px !important;
  }
}

</style>