<template>
    <div :style="{ backgroundImage: 'url(' + data.imgURL2 + ')' }" class="imgnum1">
      <div class="container">
          <div class="row pt-5">
              <div class="col">
                  <h2 class="text-white h2 text">เลขนำโชคประวัน</h2>
                  <!-- <p class="text-green">คำแนะนำ</p>-->
                  <div class="text-white1">
                      <p>{{ datanum.text }}</p>
                  </div> 
              </div>
              <div class="col pt-2 pb-2">

                <p class="text-white">เลือกวันเดือนปี</p>

                    
                  <div class="row">  
                      <div class="col-lg-4 col-sm-12">
                        <select class="rounded1 text-center pt-1 pb-1 form-control" v-model="day">
                            <option  v-for="days in range(1, 31)" :value="days">{{ days }}</option>
                          </select>
                          <!-- <input class="rounded1 text-center pt-2 pb-2 form-control" placeholder="วัน" type="text"> -->
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <select class="rounded1 text-center pt-1 pb-1 form-control" v-model="month">
                            <option  v-for="(months, index) in months" :value="months">{{ months }}</option>
                          </select>
                          <!-- <input class="rounded1 text-center pt-2 pb-2 form-control" placeholder="เดือน" type="text"> -->
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <select class="rounded1 text-center pt-1 pb-1 form-control" v-model="year">
                            <option v-for="year in range(2567, 2568)" :value="year">{{ year }}</option>
                          </select>
                          <!-- <input class="rounded1 text-center pt-2 pb-2 form-control" placeholder="ปี" type="text"> -->
                      </div>
                  </div>
                  <div class="pt-3 pb-3 d-flex justify-content-end">
                    <button @click="search()" class="rounded1 text-center pt-1 pb-1 form-control1">ค้นหา</button>
                  </div>
                  <div class="row pt-2">
                      <div class="col">
                          <!-- <div class="row">
                              <div class="col-11">
                                  <input class="rounded1 pt-2 pb-2 form-control img-num-2" placeholder="ค้นหาเลขเด็ด....." type="text"> 
                              </div>
                              <div class="col-1">
                                  <a href="#">
                                      <img class="img-num-1" src="../../static/number/Component.svg" alt="">
                                  </a>
                                  
                              </div>
                          </div> -->
                      </div>
                  </div>
              </div>
              
          </div>
          <div class="box-num-1 container-fluid pl-5">
              <div class="container-fluid pt-5">
                  <h2 class="text-white-num-1 font-weight-bold">เลขมงคลเด่น</h2>
              </div>
              <div class="row">
                  <div class="col-3">
                    <p v-if="requiredData.number1 >= 0 && requiredData.number1 <= 9" class="text-white-num-2-3">{{ requiredData.number1 }}</p>
                      <p v-if="requiredData.number1 >= 10 && requiredData.number1 <= 99" class="text-white-num-2">{{ requiredData.number1 }}</p>
                      <p v-if="requiredData.number1 >= 100" class="text-white-num-2-1">{{ requiredData.number1 }}</p>
                  </div>
                  <div class="col-9 pt-5">
                      <div v-if="requiredData.number1 != null" class="box-num-1-1 text-center">
                              <!-- <p class="text-white text-num-1-1">รอง</p> -->
                              <div class="row">
                                  <!-- <div class="col">
                                    <p class="text-white text-num-1-1">{{  }}</p>
                                  </div> -->
                                  <div class="col">
                                      <p class="text-white text-num-1-1">{{ requiredData.number2}}</p>
                                  </div>
                                  
                              </div>
                              <!-- <div class="row">
                                <div class="col">
                                      <p class="text-white text-num-1-1">{{ requiredData.number2}}</p>
                                  </div>
                                  <div class="col">
                                      <p class="text-white text-num-1-1">{{ requiredData.number2}}</p>
                                  </div>
                              </div> -->
                              <div>
                                <div class="hr2"></div>
                              </div>
                              <div class="row">
                                      <div class="col">
                                          <p class="text-white text-num-1-1">{{ requiredData.number3 }}</p>
                                      </div>
                                      <!-- <div class="col">
                                          <p class="text-white text-num-1-1">{{ data.number1_6 }}</p>
                                      </div> -->
                                      
                                </div>
                                <!-- <div class="row">
                                    <div class="col">
                                          <p class="text-white text-num-1-1">{{ data.number1_7 }}</p>
                                      </div>
                                      <div class="col">
                                            <p class="text-white text-num-1-1">{{ data.number1_8 }}</p>
                                        </div>
                                </div> -->
                                        
                                        
                      </div>
                      
                    <p v-if="requiredData.number1 == null" class="text-white"> วันนี้ไม่มีเลขนำโชค </p>   
                      
                  </div>
  
              </div>
          </div> 
      </div>
    </div>
  </template>
  
  <script>
  import firebase from '~/plugins/firebase.js'
  export default {
    components: {
    },
    data() {
      return {
        data : [],
        datanum: [],
        day: null,
      year: null,
      month: null,
      months: [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
        'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน',
        'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ],
      sheetData: [],
      requiredData: [],
      }
    },
    methods: {
        range(start, end) {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
     //ฟังชั้นค้นหา
    search() {
        const userRef = firebase.database().ref('sheetDataNumber');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
           for (let i = 0; i < this.data.length; i++) {
                const date1 = this.day + " " + this.month + " " + this.year
               if (date1 == this.data[i].day) {
                   this.requiredData = this.data[i];
                //    console.log("ddddd",this.requiredData);
               }
           }
              

        });
    }

    },
    mounted() {

        const date = new Date();
        this.day = date.getDate();
        this.month = this.months[date.getMonth()];
        this.year = date.getFullYear();
        this.year = (this.year + 543);
        // console.log(this.day, this.month, this.year);


        const date1 = this.day + " " + this.month + " " + this.year
        // const date2 = "5 เมษายน 2567"
        console.log(date1);
        const userRef = firebase.database().ref('sheetDataNumber');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
           for (let i = 0; i < this.data.length; i++) {
                
               if (date1 == this.data[i].day) {
                   this.requiredData = this.data[i];
                //    console.log("mmmmm",this.requiredData);
               }
           }
              

        });


        const userRefnum = firebase.database().ref('number');
        userRefnum.on('value', (snapshot) => {
          this.datanum = snapshot.val();
        });


    //  Fetch Google Sheets data
    //     fetch("https://sheet.best/api/sheets/3154fd63-688c-415e-adda-f3a8418126f1?_raw=1")
    //         .then((response) => response.json())
    //         .then((data) => {
    //         this.sheetData = data;

    //         console.log(this.sheetData);
                
    //           firebase.database().ref('sheetDataNumber').set(
    //             this.sheetData
    //           ).then(() => {
    //                 alert("บันทึกเรียบร้อย")
    //             })

    //         }).catch((error) => {
    //         console.error(error);
    //         });
    
    }
   
  }
  </script>
  
  <style>
  .form-control1{
        height: 40px;
        border-radius: 15px;
      background: #FDBE1C;
  }
  :hover.form-control1{
      background: #825f09;
  }
  .imgnum1{
    padding-top: 50px;
      height: 1000px;
      width: 100%;
  }
  .text-green{
      color: #0E6053;
  }
  .rounded1{
      border-radius: 15px; /* แก้จาก 3cap เป็น 3px */
  }
  .img-num-1{
      position:absolute;
      right: 40%;
      top: 15%;
      height: 70%;
  }
  .img-num-2{
      width: 110%;
  }
  .box-num-1 {
      width: 100%;
      height: 400px;
      padding-bottom: 100px;
      border-radius: 15px;
      border: 3px solid #FDBE1C;
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(10, 77, 65, 0.6));
      padding-right: 6%;
  }
  
  .text-white-num-1 {
      color: #FFFFFF;
      font-weight: bold;
  }
  .text-white-num-2{
    color: #FDBE1C;
    font-size: 200px;
    font-weight: bold;
    position: relative;
    top: 20px;
    right: 20px;
}
.text-white-num-2-1{
    color: #FDBE1C;
    font-size: 100px;
    font-weight: bold;
    position: relative;
    top: 100px;
    right: 0px;
}
.text-white-num-2-3{
    color: #FDBE1C;
    font-size: 300px;
    font-weight: bold;
    position: relative;
    top: -100px;
    right: 10px;
}
  .box-num-1-1{
      width: 100%;
      height: auto;
      border-radius: 15px;
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.0), rgba(10, 77, 65, 0.0));
      border: 3px solid #FDBE1C;
     
  }
  .text-num-1-1{
      font-size: 45px;
      font-weight: bold;
  
  }
  .hr2 {    
      margin-top: 1rem;
      margin-bottom: 1rem;
      border-top: 3px solid rgba(222, 161, 6, 1);
      margin-right: 5%;
      margin-left: 5%;
  }

  .text-white1{
    font-size: 15px;
    color: #ffffff;
    }
    @media (max-width: 992px) {
        .text-white-num-2{
            color: #FDBE1C;
            font-size: 180px;
            font-weight: bold;
            position: relative;
            top: 20px;
            right: 50px;
        }
        .text-white-num-2-1{
            color: #FDBE1C;
            font-size: 100px;
            font-weight: bold;
            position: relative;
            top: 100px;
            right: 40px;
        }
        .text-white-num-2-3{
            color: #FDBE1C;
            font-size: 300px;
            font-weight: bold;
            position: relative;
            top: -100px;
            right: 20px;
        }
        .text-num-1-1{
            font-size: 40px;
            font-weight: bold;
        }
    }
    @media (max-width: 768px) {
        .text-num-1-1{
            font-size: 30px;
            font-weight: bold;
        }
        .text-white-num-2-3{
            color: #FDBE1C;
            font-size: 280px;
            font-weight: bold;
            position: relative;
            top: -100px;
            right: 50px;
        }
    }
    @media (max-width: 524px) {
        .text-num-1-1{
            font-size: 25px;
            font-weight: bold;
        }
        .text-white-num-2-3{
            color: #FDBE1C;
            font-size: 280px;
            font-weight: bold;
            position: relative;
            top: -100px;
            right: 50px;
        }
    }
    @media (max-width: 454px) {
        .text-num-1-1{
            font-size: 20px;
            font-weight: bold;
        }
        .text-white-num-2-3{
            color: #FDBE1C;
            font-size: 200px;
            font-weight: bold;
            position: relative;
            top: -40px;
            right: 30px;
        }
    }
  @media (max-width: 415px) 
  {

    .text-num-1-1{
        font-size: 20px;
        font-weight: bold;
    }
    .text-white-num-2-3{
        color: #FDBE1C;
        font-size: 200px;
        font-weight: bold;
        position: relative;
        top: -50px;
        right: 40px;
    }

    .text-white{
        font-size: 20px;
    }
    .text-white1{
        font-size: 15px;
        color: #ffffff;
    }
    .text-white-num-2{
        color: #FDBE1C;
        font-size: 100px;
        font-weight: bold;
        position: relative;
        top: 20px;
        right: 40px;
    }
    .text-white-num-2-1{
        color: #FDBE1C;
        font-size: 70px;
        font-weight: bold;
        position: relative;
        top: 100px;
        right: 45px;
    }
    .box-num-1 {
        height: 400px;
    }

    @media (max-width: 350px) {
        .text-num-1-1{
            font-size: 17px;
            font-weight: bold;
        }
        .text-white-num-2-3{
            color: #FDBE1C;
            font-size: 170px;
            font-weight: bold;
            position: relative;
            top: -40px;
            right: 30px;
        }
        .box-num-1 {
            height: 400px;
        }

    }

    
  }
  
  
  </style>
  