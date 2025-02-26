<template>
    <div>
        <div class="form-edit">
            <h1>ข้อมูลส่วนตัว</h1>
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.firstname" type="text" placeholder="ชื่อจริง">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.lastname" type="text" placeholder="นามสกุล">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.phone" type="text" placeholder="เบอร์โทรศัพท์">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.birth" type="date" placeholder="วันเกิด">
            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit" v-model="FormData.idcard" type="text" placeholder="เลขบัตรประชาชน">
            <p>
                <input :disabled="!edit" v-model="FormData.agree" type="checkbox"> ฉันยินยอมตามนโยบายและข้อกำหนด
            </p>
            <button v-if="edit" @click="setData">บันทึกข้อมูล</button>
            <h1 v-if="!edit">แก้ไข <img class="pencil" @click="edit = !edit" src="../static/pencil2.png" alt=""></h1>
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
            user: null,
            FormData: {
                firstname: '',
                lastname: '',
                phone: '',
                birth: '',
                idcard: '',
                agree: false
            }
        };
    },
    created() {
        this.loadUserData();
    },
    methods: {
        async loadUserData() {
            const userId = firebase.auth().currentUser.uid;
            const snapshot = await firebase.database().ref(`users/${userId}`).once("value");
            if (snapshot.exists()) {
                this.FormData = snapshot.val();
            }
        },
        async setData() {
            const userId = firebase.auth().currentUser.uid;
            await firebase.database().ref(`users/${userId}`).set(this.FormData);
            Swal.fire('สำเร็จ!', 'ข้อมูลถูกบันทึกแล้ว', 'success');
            this.edit = false;
        }
    }
};
</script>

<style scoped>
.form-edit {
    max-width: 400px;
    padding: 20px;
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
