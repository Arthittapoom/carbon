<template>
    <div class="profile-info">
        <div class="form-edit">
            <h1>ข้อมูลส่วนตัว</h1>
            <h1 class="edit" v-if="!edit">แก้ไข <img class="pencil" @click="edit = !edit" src="../static/pencil2.png" alt=""></h1>
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.firstname"
                type="text" placeholder="ชื่อจริง">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.lastname"
                type="text" placeholder="นามสกุล">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.phone"
                type="text" placeholder="เบอร์โทรศัพท์">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.birth"
                type="date" placeholder="วันเกิด">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.idcard"
                type="text" placeholder="เลขบัตรประชาชน">
            <p class="agree">
                <input :disabled="!edit" v-model="FormData.agree" type="checkbox"> ฉันยินยอมตามนโยบายและข้อกำหนด
            </p>
            <button v-if="edit" @click="setData">บันทึกข้อมูล</button>
        </div>
        <div class="form-edit">
            <h1>ข้อมูลบัญชี</h1>
            <h1 class="edit" v-if="!editv2">แก้ไข <img class="pencil" @click="editv2 = !editv2" src="../static/pencil2.png" alt="">
            </h1>
            <input :class="{ 'no-border': !editv2, 'editable': editv2 }" :disabled="!editv2" v-model="FormData2.bank"
                type="text" placeholder="ธนาคาร">
            <input :class="{ 'no-border': !editv2, 'editable': editv2 }" :disabled="!editv2" v-model="FormData2.branch"
                type="text" placeholder="สาขา">
            <input :class="{ 'no-border': !editv2, 'editable': editv2 }" :disabled="!editv2" v-model="FormData2.name"
                type="text" placeholder="ชื่อบัญชี">
            <input :class="{ 'no-border': !editv2, 'editable': editv2 }" :disabled="!editv2" v-model="FormData2.number"
                type="text" placeholder="เลขบัญชี">
            <p class="agree"><input :class="{ 'no-border': !editv2, 'editable': editv2 }" :disabled="!editv2"
                    v-model="FormData2.agree" type="checkbox"> ฉันยินยอมตามนโยบายและข้อกำหนด</p>
            <button v-if="editv2" @click="setData_bank">บันทึกข้อมูล</button>
        </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js';
import Swal from 'sweetalert2';

export default {
    layout: 'menu-profile',
    data() {
        return {
            edit: false,
            editv2: false,
            user: null,
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

                this.edit = false;
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

                this.editv2 = false;
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

                this.editv2 = false;


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
        },
    }
};
</script>

<style scoped>
.form-edit {
    max-width: 400px;
    padding: 20px;
}

.profile-info {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 50px;
}

.edit {
    cursor: pointer;
    font-size: 14px;
    color: #ffffff;
    background-color: #0d5a76;
    padding: 5px 10px;
    border-radius: 5px;
    width: 80px;
}

.agree {
    display: flex;
}

.agree input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.pencil {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

input {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.no-border {
    border: none;
    background: transparent;
}

.editable {
    background: #fff;
    border: 1px solid #007bff;
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background: #0056b3;
}
</style>
