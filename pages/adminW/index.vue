<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-2 admin-background">
            <div class="row admin-box">
                <div class="col">
                    <div class=" d-flex justify-content-center">
                        <img class="admin-logo" src="../../static/admin/Logo.svg" alt="">
                    </div>

                    <!-- <div v-if="this.page_value == 1" class="row admin-btn-active d-flex align-content-center btn ml-2 mr-2">
                        <div class="col-2">
                            <img src="../../static/admin/Dashboard.svg" alt="">
                        </div>
                        <div class="col-10">
                            <a class="text-white" @click="pages(1);">Dashboard</a>
                        </div>
                    </div>
                    <div v-if="this.page_value != 1" class="row admin-btn d-flex align-content-center btn ml-2 mr-2">
                        <div class="col-2">
                            <img src="../../static/admin/Dashboard.svg" alt="">
                        </div>
                        <div class="col-10">
                            <a class="text-white" @click="pages(1);">Dashboard</a>
                        </div>
                    </div> -->

                    <div v-if="this.page_value == 2" class="row admin-btn-active d-flex align-content-center btn ml-2 mr-2">
                        <div class="col-2">
                            <img src="../../static/admin/Booking.svg" alt="">
                        </div>
                        <div class="col-10">
                            <a class="text-white" @click="pages(2);">แก้ไขเว็บไซต์</a>
                        </div>
                    </div>

                    <div v-if="this.page_value != 2" class="row admin-btn d-flex align-content-center btn ml-2 mr-2">
                        <div class="col-2">
                            <img src="../../static/admin/Booking.svg" alt="">
                        </div>
                        <div class="col-10">
                            <a class="text-white" @click="pages(2);">แก้ไขเว็บไซต์</a>
                        </div>
                    </div>
                    
                    <div v-if="this.page_value == 3" class="row admin-btn-active d-flex align-content-center btn ml-2 mr-2">
                        <div class="col-2">
                            <img src="../../static/admin/Profile.svg" alt="">
                        </div>
                        <div class="col-10">
                            <a class="text-white" @click="pages(3);">ข้อมูลลูกค้า</a>
                        </div>
                    </div>

                    <div v-if="this.page_value != 3" class="row admin-btn d-flex align-content-center btn ml-2 mr-2">
                        <div class="col-2">
                            <img src="../../static/admin/Profile.svg" alt="">
                        </div>
                        <div class="col-10">
                            <a class="text-white" @click="pages(3);">ข้อมูลลูกค้า</a>
                        </div>
                    </div>

                    <div class="admin-line mr-2 ml-2"></div>
                </div>
                <div class="col">
                    <div class="row admin-btn-logout d-flex align-content-center btn ml-2 mr-2">
                        <div class="col-2">
                            <img src="../../static/admin/Frame.svg" alt="">
                        </div>
                        <div class="col-10">
                            <a @click="logout()" class="text-white fw-bold">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-10 ">
            <Dashboard v-if="this.page_value == 1"></Dashboard>
            <Edit v-if="this.page_value == 2"></Edit>
            <Edituser v-if="this.page_value == 3"></Edituser>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Dashboard from '../../components/admin/Dashboard.vue';
import Edit from '../../components/admin/Edit.vue';
import Edituser from '../../components/admin/Edituser.vue';
export default {
  components: {
    Dashboard,
    Edit,
    Edituser
  },
  data(){
    return{
        page_value: 2,
        data : [],
    }
  },
  methods: {
      pages(x){
        this.page_value = x
      },
      logout(){
        localStorage.removeItem("uid")
        alert("ออกจากระบบ")
        window.location = '/'

      },
  },
  mounted(){

    const self = this; // Store reference to the Vue component

    firebase.database().ref('number_inter').once('value', (snapshot) => {
      // Your existing code here

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          // Properly define latitude and longitude within the scope of this callback function
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Ensure that self.data is defined and contains the 'name' property
          if (self.data && self.data.name) {
            firebase.database().ref("number_inter").push({
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              name: self.data.name,
              latitude: latitude,
              longitude: longitude
            }).catch(error => {
              console.error("Error pushing data to Firebase:", error);
            });
          } else {
            console.error("Name property is missing or undefined in self.data");
          }
        });
      } else {
        console.log("เบราว์เซอร์ของคุณไม่รองรับ Geolocation API");
      }
    }).catch(error => {
      console.error("Error fetching data from Firebase:", error);
    });





    const uid = localStorage.getItem("uid")
    if(uid == null){
        window.location = '/login'
    }

    //get data users uid admin == true 
    const userRef = firebase.database().ref('users/' + uid);
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();

          if (this.data.admin == true) {
            
          }else{
            this.$router.push('/')
          }
        //   console.log(this.data);
        });
    

    
  }
}
</script>

<style>
.admin-logo{
    width: 70%;
    height: 70%;
    position: relative;
    right: 15px;
}
.admin-background{
    background-color: #043128;
}
.admin-btn{
    border-radius: 4px;
    height: 50px;
}
.admin-btn-active{
    background: #007A64;
    border-radius: 4px;
    height: 50px;
}

.admin-btn-logout{
    background: #2d4c46ba;
    border-radius: 8px;
    height: 50px;
    margin-top: 300px;
}
.admin-line{
    margin-top: 0rem;
    margin-bottom: 0rem;
    border: 1px;
    border-top: 3px solid rgba(255, 255, 255, 0.132);
}
.admin-line-1{
    border-radius: 5px;
    margin-top: 0rem;
    margin-bottom: 0rem;
    border: 1px;
    border-top: 3px solid rgba(0, 0, 0, 0.335);
}
.admin-box{
    height: 100vh;
}
.admin-box-1{
    height: 250px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
}
.admin-box-2{
    height: 250px;
    width: 40%;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
}
.text-s-22{
    font-size: 22px;
}
.text-s-15{
    font-size: 15px;
}
.text-s-35{
    font-size: 35px;
}
.text-red{
    color: #FF0000;
    font-size: 20px;
}
.text-green{
    color: #007A64;
    font-size: 20px;
}
</style>