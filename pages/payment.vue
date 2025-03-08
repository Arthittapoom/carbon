<template>
    <div>
        <Nevbar></Nevbar>
        <div class="main">
            <div class="card-body">
                <div class="card-left" v-if="form">
                    <h3>รายละเอียดฟอร์ม</h3>
                    <p><strong>ชื่อโครงการ (ภาษาอังกฤษ):</strong> {{ form.projectNameEn }}</p>
                    <p><strong>ชื่อโครงการ (ภาษาไทย):</strong> {{ form.projectNameTh }}</p>
                    <p><strong>ประเภทโครงการ:</strong></p>
                    <ul>
                        <li v-for="(type, index) in form.projectTypes" :key="index">{{ type }}</li>
                    </ul>
                    <p><strong>ราคา:</strong> {{ formatNumber(form.price) }} บาท</p>
                    <p><strong>เบอร์โทร:</strong> {{ form.phone }}</p>
                    <p><strong>อีเมล์:</strong> {{ form.email }}</p>
                    <p><strong>ชื่อผู้ติดต่อ:</strong> {{ form.contactName }}</p>
                    <p><strong>ที่อยู่:</strong> {{ form.address }}</p>
                    <p><strong>วันที่ส่งฟอร์ม:</strong> {{ new Date(form.date_submitForm).toLocaleString() }}</p>
                    <p><strong>หมายเลขแฟกซ์:</strong> {{ form.fax }}</p>

                    <h4>ไฟล์รับรอง</h4>
                    <ul>
                        <li v-for="(file, key) in form.files" :key="key">
                            <a :href="file.fileData" target="_blank">{{ file.fileName }}</a> (อัพโหลดเมื่อ: {{ new
                                Date(file.uploadDate).toLocaleString() }})
                        </li>
                    </ul>

                    <!-- <h4>ไฟล์การตรวจสอบ</h4>
                    <ul>
                        <li v-for="(file, index) in form.verificationFiles1" :key="index">
                            <a :href="file" target="_blank">ไฟล์ตรวจสอบที่ {{ index + 1 }}</a>
                        </li>
                    </ul> -->
                </div>
                <div class="card-left" v-else>
                    <p>กำลังโหลดข้อมูล...</p>
                </div>

                <div v-if="form" class="card-right">
                    <!-- ข้อมูลเพิ่มเติม หรือ ฟังก์ชันที่ต้องการ -->
                     
                    <p class="card-title">ชําระเงิน</p>
                    <p class="card-title-text">จํานวนเงิน {{ formatNumber(form.price) }} บาท</p>
                    <!-- ย้อนกลับ -->
                    <button class="card-button-back" @click="goBack">ย้อนกลับ</button>
                    <button class="card-button" @click="pay(form.price)">ชําระเงิน</button>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import Swal from 'sweetalert2';
import firebase from '~/plugins/firebase.js';
import Nevbar from '../components/Nevbar.vue';
import { loadStripe } from "@stripe/stripe-js";

export default {
    components: { Nevbar },
    data() {
        return {
            uid: null,
            formId: null,
            form: null
        };
    },

    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;

                this.formId = this.$route.query.formId;

                firebase.database().ref('T-VER-Form').child(this.formId).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        const form = snapshot.val();

                        if (form.status === 3) {
                            this.form = form;
                        }
                    }
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'กรุณาเข้าสู่ระบบ',
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#007BFF'
                }).then(() => {
                    this.$router.push('/login');
                })
            }
        });
    },

    methods: {
        formatNumber(num) {
            return new Intl.NumberFormat('th-TH').format(num);
        },

        goBack() {
            this.$router.go(-1);   
        },

        pay(amountwithdraw) {
            Swal.fire({
                icon: 'warning',
                title: 'ยืนยันการชําระเงิน',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    firebase.database().ref(`users/${this.uid}`).once('value', (snapshot) => {
                        const data = snapshot.val();
                        const amountuser = data.amount;
                        if (amountwithdraw > Number(amountuser) || amountwithdraw <= 0) {
                            return Swal.fire({ icon: 'error', title: 'เงินไม่เพียงพอ' });
                        } else {
                            const amount = Number(amountuser) - amountwithdraw;
                            firebase.database().ref(`users/${this.uid}`).update({ amount: amount});
                            firebase.database().ref(`T-VER-Form/${this.formId}/status`).set(4);
                            firebase.database().ref(`T-VER-Form/${this.formId}/payment`).set(this.uid);
                            Swal.fire({ icon: 'success', title: 'ชําระเงินเรียบร้อย', showConfirmButton: false, timer: 1500 });
                            this.$router.push('/profile-credit-order-buy');
                        }
                    });
                }
            });
        },
    }
};
</script>


<style scoped>
.main {
    background: linear-gradient(to bottom right, rgb(170, 211, 213) 30%, rgb(125, 170, 174) 100%);
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-button-back {
    background-color: #00A1B4;
    color: #ffffff;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin-left: 50px;
    cursor: pointer;
}
.card-body {
    width: 100%;
    height: 80%;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
    margin: 100px;

    border-radius: 20px;
    display: flex;
    gap: 20px;
    overflow-y: scroll;
    scrollbar-width: none;
}

.card-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.card-button-withdraw {
    background-color: #00A1B4;
    color: #ffffff;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin-left: 50px;
    cursor: pointer;
}

.card-left {
    /* background-color: aquamarine; */
    height: 100%;
    width: 50%;
}

.card-right {
    /* background-color: aqua; */
    height: 100%;
    width: 50%;
}

.card-item-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.card-title {
    font-size: 25px;
    font-weight: bold;
    padding-left: 50px;
    color: #00A1B4;
}

.card-title-text {
    font-size: 25px;
    font-weight: bold;
    padding-left: 50px;
    color: #717171;
}

.card-button {
    background-color: #00b478;
    color: #ffffff;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin: 50px;
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
}

.card-item {
    width: 21%;
    height: 100px;
    background-color: #00A1B4;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
    margin: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font: 1em sans-serif;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #ffffff;
}

.card-item:hover {
    background-color: #adf7ff;
    color: #000000;
}

.card-item>p {
    margin: 0;
}
</style>