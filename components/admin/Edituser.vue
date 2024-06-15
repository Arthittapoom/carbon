<template>
    <div>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="transparent">
          
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav >
                  <h2>Welcome</h2>
                </b-navbar-nav>
          
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <h4>Admin</h4>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
        </div>
        <div class="row container-fluid mt-5">
            <div class="col">
                <div class="user-box-1 container p-2">
                    <!-- 01 -->
              
                     
                            <button @click="checkslip(true)" class="btn btn-success">เช็คสลิป</button>

                            <hr>
                     
                            <button @click="checkslip(false)" class="btn btn-success">เช็คสถานะ</button>

                            <hr>

                    <div v-if="checkslip_status == true">
                            <div  v-for="(itemdata,index) in data1" :key="index">
                                                    <div class="row">
                                                        <div class="col">
                                                            <p>0{{ index+1 }}</p>
                                                        </div>
                                                        <div class="col">
                                                            <p>{{ itemdata.name }}</p>
                                                        </div>
                                                        <div class="col">
                                                            <p>{{ itemdata.phone }}</p>
                                                        </div>
                                                        <div class="col">
                                                            <p>{{ itemdata.email }}</p>
                                                        </div>
                                                        <div class="col">
                                                            <button @click="edit(itemdata,index)" class="btn btn-primary">เช็คสลิป</button>
                                                        </div>
                                                    </div>
                                                    <div v-if="index == indexclick">
                                                        <div class="row">
                                                            <div v-for="(itempayment,index) in datapayment" :key="index" class="col-4">
                                                                <div v-if="itempayment.status != 'ชำระเงินแล้ว'">

                                                                    <a :href="itempayment.img" target="_blank"><img class="img" :src="itempayment.img" alt=""></a>

                                                                    <button @click="payment(itempayment,itemdata)" class="btn btn-primary">ยืนยันการชำระเงิน</button>
                                                                </div>
                                                                <div v-if="itempayment.status == 'ชำระเงินแล้ว'">
                                                                    <a :href="itempayment.img" target="_blank"><img class="img" :src="itempayment.img" alt=""></a>
                                                                    ยืนยันการชำระเงินเรียบร้อย
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                             </div>
                    </div>
                    
                    <div v-if="checkslip_status == false">
                        <div v-for="(itemdata,index) in data" :key="index">
                            <div class="row">
                                <div class="col">
                                    <p>0{{ index+1 }}</p>
                                </div>
                                <div class="col">
                                    <p>{{ itemdata.name }}</p>
                                </div>
                                <div class="col">
                                    <p>{{ itemdata.phone }}</p>
                                </div>
                                <div class="col">
                                    <p>{{ itemdata.email }}</p>
                                </div>
                                <!-- <div class="col">
                                    <button @click="edit(itemdata,index)" class="btn btn-primary">เช็คสลิป</button>
                                </div> -->
                                <div class="col">
                                    <button @click="check(itemdata,index)" class="btn btn-primary">เช็คสถานะ</button>
                                </div>
                            </div>
                            <!-- <div v-if="index == indexclick">
                                <div class="row">
                                    <div v-for="(itempayment,index) in datapayment" :key="index" class="col-4">
                                        <div v-if="itempayment.status != 'ชำระเงินแล้ว'">

                                            <a :href="itempayment.img" target="_blank"><img class="img" :src="itempayment.img" alt=""></a>

                                            <button @click="payment(itempayment,itemdata)" class="btn btn-primary">ยืนยันการชำระเงิน</button>
                                        </div>
                                        <div v-if="itempayment.status == 'ชำระเงินแล้ว'">
                                            <a :href="itempayment.img" target="_blank"><img class="img" :src="itempayment.img" alt=""></a>
                                            ยืนยันการชำระเงินเรียบร้อย
                                        </div>
                                    </div>
                                </div>
                                </div> -->

                                <div v-if="index == index_status">
                                    <p>สถานะ : {{ itemdata.status }}</p>
                                    <p>วันที่เข้าสู่ระบบ : {{ itemdata.login_date}}</p>
                                    <p>เข้าสู่ระบบมาแล้ว {{ daysSinceLogin(itemdata.login_date) }} วัน</p>
                                    <p>วันที่ใช้งานเว็บได้ {{ daysSinceLogin(itemdata.login_date) }}/{{ itemdata.status_open }} วัน</p>
                                    <p>แก้ไข วันที่ใช้งานเว็บได้ {{ daysSinceLogin(itemdata.login_date) }}/ <input style="width: 50px" v-model="itemdata.status_open" type="text"> วัน </p>
                                    <button @click="updatestatus_open(itemdata.id,itemdata.status_open)" class="btn btn-primary">บันทึก</button>

                                </div>

                        </div>
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
    data(){
        return {
            uid : "",
            data: [],
            data1: [],
            datapayment: [],
            indexclick: null,
            index_status: null,
            checkslip_status: null,
            }
        },
        mounted(){
        try{
            this.getdatauser()
        
        }catch{}
        },
        methods:{
            checkslip(status){
                if(status == true){
                   
                                     const userRef = firebase.database().ref('users/');
                                    userRef.on('value', (snapshot) => {
                                    this.data1 = [];

                                    snapshot.forEach(userSnapshot => {
                                        const user = userSnapshot.val();
                                        
            
                                        const userRefs = firebase.database().ref('payment/' + userSnapshot.key);
                                        userRefs.on('value', (snapshots) => {
                                            
                                            snapshots.forEach(paymentSnapshot => {
                                                
                                                if(userSnapshot.key == snapshots.key){
                                                    
                                                    const userData = {
                                                        id: userSnapshot.key,
                                                        name: user.name,
                                                        phone: user.phone,
                                                        email: user.email,
                                                        date: user.date,
                                                        status: user.status,
                                                        login_date: user.login_date,
                                                        status_open: user.status_open
                                                    };


                                                    let nameExists = this.data1.some(snapshot => snapshot.name === userData.name);
                                                    if (!nameExists) {
                                                        this.data1.push(userData);
                                                    }

                                                    
                                                    // this.data1.push(userData);


                                                }

 
                                            });
                                        });
    
                                   
                                        
                                    });
                                });


                               
                    this.checkslip_status = true
                }
                if(status == false){
                    this.checkslip_status = false
                }


                
            },

            updatestatus_open(id,updatestatus){
                // alert( id + " " + updatestatus)
                const intUpdateStatus = parseInt(updatestatus);
                const userRef = firebase.database().ref('users/' + id);
                userRef.update({
                    status_open: intUpdateStatus
                }).then(() => {
                    alert("บันทึกเรียบร้อย")
                })

            }
            ,

            daysSinceLogin(loginDate) {

            const loginDateTime = new Date(loginDate); // สร้างวัตถุ Date จาก login_date
            const currentTime = new Date(); // สร้างวัตถุ Date ปัจจุบัน
            const timeDifference = currentTime.getTime() - loginDateTime.getTime(); // คำนวณความแตกต่างของเวลา
            const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // แปลงเป็นจำนวนวัน
            return daysDifference+1;
            },
            getdatauser(){
                const userRef = firebase.database().ref('users/');
                userRef.on('value', (snapshot) => {
                    this.data = [];
                    snapshot.forEach(userSnapshot => {
                        const user = userSnapshot.val();
                        const userData = {
                            id: userSnapshot.key,
                            name: user.name,
                            phone: user.phone,
                            email: user.email,
                            date: user.date,
                            status: user.status,
                            login_date: user.login_date,
                            status_open: user.status_open
                        };
                        this.data.push(userData);
                    });
                });
            },
            edit(item,index){
                this.index_status = null;
                this.indexclick = index
                const userRef = firebase.database().ref('payment/' + item.id);
                userRef.on('value', (snapshot) => {
                    this.datapayment = [];
                    snapshot.forEach(paymentSnapshot => {
                        const userData = {
                            uid: snapshot.key,
                            id: paymentSnapshot.key,
                            img: paymentSnapshot.val().imgURL1,
                            status: paymentSnapshot.val().status

                        };
                        this.datapayment.push(userData);

                        // console.log(this.datapayment);
                        // console.log(paymentSnapshot.val());
                    });
                });

            },
            payment(item,itemdata){
                // console.log(item.id,"//",item.uid);
                // update status payment
                firebase.database().ref('payment/' + item.uid + '/' + item.id).update({
                    status: "ชำระเงินแล้ว",
                }).then(() => {
                    alert("ชำระเงินแล้ว")
                })

                // console.log(itemdata.status_open + 30)

                firebase.database().ref('users/' + item.uid).update({
                    status_open: itemdata.status_open + 30
                }).then(() => {
                    
                })
            },
            check(item,index){
                this.index_status = index
                this.indexclick = null


                

            }

        }
    }
</script>


<style>
.user-box-1{
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
}
.img{
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 5px;
}
</style>