<template>
    <div class="container-fluid">
        <div class="row">
          <div class="col-4 admin-background">
            <div class="row admin-box">
              <div class="col">
                <div class=" d-flex justify-content-center">
                  <img class="admin-logo" src="@/static/admin/Logo.svg" alt="">
                </div>
                <!-- ปุ่มแก้ไขเว็บ -->
                <div v-bind:class="{ 'row admin-btn-active d-flex align-content-center btn ml-2 mr-2': page_value === 2, 'row admin-btn d-flex align-content-center btn ml-2 mr-2': page_value !== 2 }">
                  <div class="col">
                    <img src="@/static/admin/Booking.svg" alt="">
                  </div>
                  <div class="col">
                    <a class="text-white" @click="pages(2);">แก้ไขเว็บไซต์</a>
                  </div>
                </div>
                <!-- ปุ่มข้อมูลลูกค้า -->
                <div v-bind:class="{ 'row admin-btn-active d-flex align-content-center btn ml-2 mr-2': page_value === 3, 'row admin-btn d-flex align-content-center btn ml-2 mr-2': page_value !== 3 }">
                  <div class="col">
                    <img src="@/static/admin/Profile.svg" alt="">
                  </div>
                  <div class="col">
                    <a class="text-white" @click="pages(3);">ข้อมูลลูกค้า</a>
                  </div>
                </div>
                <!-- ปุ่มออกจากระบบ -->
                <div class="row admin-btn-logout d-flex align-content-center btn ml-2 mr-2">
                  <div class="col">
                    <img src="@/static/admin/Frame.svg" alt="">
                  </div>
                  <div class="col">
                    <a @click="logout()" class="text-white fw-bold">Logout</a>
                  </div>
                </div>
                <!-- <div class="admin-line mr-2 ml-2"></div> -->
              </div>
            </div>
          </div>
          <div class="col-8 ">
            <Dashboard v-if="page_value === 1"></Dashboard>
            <Edit v-if="page_value === 2"></Edit>
            <Edituser v-if="page_value === 3"></Edituser>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  import firebase from '~/plugins/firebase.js'
  import Dashboard from '../../components/admin/Dashboard.vue';
  import Edit from '../../components/admin/EditM.vue';
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
      max-width: 200px;
      height: 100%;
      position: relative;
      right: 15px;
  }
  .admin-background{
      background-color: #043128;
  }
  .admin-btn{
      border-radius: 4px;
      height: 100px;
      margin-top: 100px;
  }
  .admin-btn-active{
      background: #007A64;
      border-radius: 4px;
      height: 100px;
      margin-top: 100px;
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
  @media (max-width: 414px) {
    .text-white{
        font-size: 15px;
    }
    
  }
  </style>
  