<template>
    <div class="backgroundhome">
        <Nevbar />
        <div class="signup-background">
            <img class="img1" src="../static/home/image 5.svg" alt="">

            <div class="container signup-container">
                <div class="signup-box">
                    <div class="menu">
                        <div @click="tab = 1" class="submenu">
                            <img src="../static/menu1.png" alt="">
                            <p>ข้อมูลส่วนตัว</p>
                        </div>
                        <div @click="tab = 2" class="submenu">
                            <img src="../static/menu2.png" alt="">
                            <p>ข้อมูลคาร์บอน</p>
                        </div>
                        <div @click="tab = 3" class="submenu">
                            <img src="../static/menu3.png" alt="">
                            <p>ข้อมูลบัญชี</p>
                        </div>
                        <div @click="tab = 4" class="submenu">
                            <img src="../static/menu4.png" alt="">
                            <p>ประวัติการชื้อขาย</p>
                        </div>
                    </div>
                </div>

                <div class="signup-box2">
                    <div v-if="tab == 1">
                        <div class="form-edit">
                            <h1>ข้อมูลส่วนตัว </h1>
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData.firstname" type="text" placeholder="ชื่อจริง">
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData.lastname" type="text" placeholder="นามสกุล">
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData.phone" type="text" placeholder="เบอร์โทรศัพท์">
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData.birth" type="date" placeholder="วันเกิด">
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData.idcard" type="text" placeholder="เลขบัตรประชาชน">
                            <p><input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit"  v-model="FormData.agree" type="checkbox"> ฉันยินยอมตามนโยบายและข้อกำหนด</p>
                            <button v-if="edit" @click="setData">บันทึกข้อมูล</button>
                            <h1 v-if="!edit">แก้ไข <img @click="edit = !edit" src="../static/pencil2.png" alt=""></h1>
                        </div>
                    </div>
                    <div v-if="tab == 2">
                        <p>ข้อมูลคาร์บอน</p>
                    </div>
                    <div v-if="tab == 3">
                        <div class="form-edit">
                            <h1>ข้อมูลบัญชี</h1>
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData2.bank" type="text" placeholder="ธนาคาร">
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData2.branch" type="text" placeholder="สาขา">
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData2.name" type="text" placeholder="ชื่อบัญชี">
                            <input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData2.number" type="text" placeholder="เลขบัญชี">
                            <p><input :class="{'no-border': !edit, 'editable': edit}" :disabled="!edit" v-model="FormData2.agree" type="checkbox"> ฉันยินยอมตามนโยบายและข้อกำหนด</p>
                            <button v-if="edit" @click="setData_bank">บันทึกข้อมูล</button>
                            <h1 v-if="!edit">แก้ไข <img @click="edit = !edit" src="../static/pencil2.png" alt=""></h1>
                        </div>
                    </div>
                    <div v-if="tab == 4">
                        <p>ประวัติการชื้อขาย</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nevbar from '~/components/Nevbar.vue'
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2'

export default {
    components: { Nevbar },

    data() {
        return {
            tab: 1,
            edit: false,
            user: null, // เก็บข้อมูลผู้ใช้ปัจจุบัน
            FormData: {
                firstname: '',
                lastname: '',
                phone: '',
                birth: '',
                idcard: '',
                agree: false
            },

            FormData2: {
                bank: '',
                branch: '',
                name: '',
                number: '',
                agree: false
            },
            originalData: {}, // ข้อมูลต้นฉบับฟอร์มแรก
            originalData2: {} // ข้อมูลต้นฉบับฟอร์มบัญชีธนาคาร
        };
    },

    mounted() {
        // ติดตามสถานะการล็อกอินแบบเรียลไทม์
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            if (user) {
                this.getUserData(); // ดึงข้อมูลผู้ใช้เมื่อเข้าสู่ระบบ
                this.getData_bank();
            } else {
                console.log("User is logged out");
            }
        });
    },

    methods: {
        validateForm() {
            const { firstname, lastname, phone, birth, idcard, agree } = this.FormData;

            if (!firstname || !lastname || !birth) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                Swal.fire({
                    icon: 'error',
                    title: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!/^[0-9]{13}$/.test(idcard)) {
                Swal.fire({
                    icon: 'error',
                    title: 'เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!agree) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณายอมรับข้อตกลงก่อนบันทึกข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            return true;
        },

        async setData() {
            if (!this.user) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณาเข้าสู่ระบบก่อน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            // ตรวจสอบฟอร์มก่อนบันทึกข้อมูล
            if (!this.validateForm()) {
                return;
            }

            // ตรวจสอบว่าข้อมูลเปลี่ยนแปลงหรือไม่
            if (JSON.stringify(this.FormData) === JSON.stringify(this.originalData)) {
                Swal.fire({
                    icon: 'info',
                    title: 'ไม่มีการเปลี่ยนแปลงข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            try {
                const uid = this.user.uid; // ดึง UID ของผู้ใช้
                const payload = {
                    ...this.FormData,
                    uid: uid,
                    updateAt: new Date().toISOString()
                };

                // บันทึกข้อมูล
                await firebase.database().ref('users/' + uid).set(payload);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });

                this.edit = false;

                // อัปเดตข้อมูลต้นฉบับหลังจากบันทึกสำเร็จ
                this.originalData = { ...this.FormData };

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด: ' + error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },


        // ตรวจสอบข้อมูลฟอร์มบัญชีธนาคาร
        validateForm_bank() {
            const { bank, branch, name, number, agree } = this.FormData2;

            if (!bank || !branch || !name) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!/^[0-9]{10}$/.test(number)) {
                Swal.fire({
                    icon: 'error',
                    title: 'เลขบัญชีต้องเป็นตัวเลข 10 หลัก',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!agree) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณายอมรับข้อตกลงก่อนบันทึกข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            return true;
        },

        // บันทึกข้อมูลบัญชีธนาคาร
        async setData_bank() {
            if (!this.user) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณาเข้าสู่ระบบก่อน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            if (!this.validateForm_bank()) {
                return;
            }

            if (JSON.stringify(this.FormData2) === JSON.stringify(this.originalData2)) {
                Swal.fire({
                    icon: 'info',
                    title: 'ไม่มีการเปลี่ยนแปลงข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            try {
                const uid = this.user.uid;
                const payload = {
                    ...this.FormData2,
                    uid: uid,
                    updateAt: new Date().toISOString()
                };

                await firebase.database().ref('users/' + uid + '/bank/').set(payload);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลบัญชีธนาคารสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });

                this.edit = false;


                this.originalData2 = { ...this.FormData2 };

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด: ' + error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },

        // ดึงข้อมูลบัญชีธนาคาร
        async getData_bank() {
            try {
                if (!this.user) return;

                const uid = this.user.uid;
                const snapshot = await firebase.database().ref('users/' + uid + '/bank/').once('value');
                const data = snapshot.val();

                if (data) {
                    this.FormData2 = data;
                    this.originalData2 = { ...data };
                } else {
                    console.log("No bank data available");
                }

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบัญชีธนาคาร:", error.message);
            }
        },

        async getUserData() {
            try {
                if (!this.user) return;

                const uid = this.user.uid;
                const snapshot = await firebase.database().ref('users/' + uid).once('value');
                const data = snapshot.val();

                if (data) {
                    this.FormData = data; // กำหนดข้อมูลที่ดึงมา
                    this.originalData = { ...data }; // เก็บข้อมูลต้นฉบับ
                } else {
                    console.log("No data available");
                }

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error.message);
            }
        }
    }
}
</script>


<style scoped>
.img1 {
    position: absolute;
    top: 0;
    width: 200px;
    height: 200px;
    z-index: 1;
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

.backgroundhome {
    background: linear-gradient(to bottom right, #0BC599 30%, #F1E92E 100%);
}

.signup-background {

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
    flex-wrap: wrap;
}

.signup-box,
.signup-box2 {
    height: 450px;
    width: 100%;
    max-width: 400px;
    background-color: #ffffff;
    border-radius: 50px;
    box-shadow: 0px 5px 1px 0px #ffffff;
    border: 5px solid #ffffff;
    padding: 20px;
    margin: 10px;
}

.signup-box {
    background-color: #ffffff;
}

.signup-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.signup-input,
.input-field {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;
}

.signup-btn,
.btn-primary {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.signup-google-btn {
    width: 100%;
    height: 40px;
    border-radius: 5px;
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

.menu {
    width: 100%;
    height: 100%;
    /* background-color: #00A1B4; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    box-sizing: border-box;
}

.submenu {
    width: calc(50% - 10px);
    background-color: white;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.submenu:hover {
    /* background-color: #00BBD4; */
    transform: scale(1.05);
}

.submenu img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
}

.submenu p {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: #2EBBF1;
}

.small-text {
    font-size: 10px;
}

.form-edit {
    width: 100%;
    height: 100%;
    /* background-color: rgb(248, 108, 108); */
}

.form-edit input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #ffffff;
    padding-left: 10px;
    margin-bottom: 10px;
}

.form-edit input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}


.form-edit h1 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #2EBBF1;
    padding-bottom: 10px;
}

.form-edit h1 img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    cursor: pointer;
}

.form-edit button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.form-edit button:hover {
    transform: scale(1.05);
}

/* ลบเส้นกรอบเมื่อไม่ได้แก้ไข */
.no-border {
  border: none !important;
  outline: none;
  background-color: transparent; /* ทำให้พื้นหลังโปร่งใส */
  cursor: default; /* เปลี่ยนเคอร์เซอร์เป็นค่าเริ่มต้น */
}

/* เพิ่มกรอบเมื่ออยู่ในโหมดแก้ไข */
.editable {
  border: 1px solid #ccc;
  outline: none;
  padding: 5px;
  cursor: text;
}

@media (max-width: 768px) {

    .signup-box,
    .signup-box2 {
        width: 100%;
        max-width: 100%;
    }
}

@media (max-width: 576px) {

    .signup-box,
    .signup-box2 {
        height: auto;
        padding: 10px;
    }

    .card-body,
    .graph {
        height: auto;
        padding: 10px;
        margin-right: 0;
    }
}
</style>