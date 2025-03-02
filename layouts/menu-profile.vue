<template>
    <div class="menu-main">
        <div class="menu-left">
            <button @click="goto('/Standard-T-VER')">แบบฟอร์มขอรับรองคาร์บอนเครดิต</button>
            <button @click="goto('/Standard-T-VER-status')">สถานะคำขอรับรองคาร์บอนเครดิต</button>
            <button @click="goto('/profile-credit-order-sell')">รายการเสนอขายคาร์บอนเครดิต</button>
            <button @click="goto('/profile-credit-order-buy')">รายการเสนอชื้อคาร์บอนเครดิต</button>
            <button @click="goto('/profile-info')">ข้อมูลส่วนตัว</button>
            <button @click="goto('/profile-bank')">ข้อมูลบัญชี</button>
            <button @click="goto('/profile-history')">ประวัติการชื้อขาย</button>
            <button @click="goto('/')">ย้อนกลับ</button>
            <button @click="logout">ออกจากระบบ</button>
        </div>
        <div class="menu-right">
            <nuxt />
        </div>
    </div>
</template>

<style scoped>
.menu-main {
    display: flex;
    width: 100%;
}

.menu-left {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 20%;
    height: 100vh;
    background-color: #3c623e;
    padding: 20px;
    margin-right: 20px;
}

.menu-left button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    text-align: left;
    background-color: #e3e3e3;
    color: #053a13;
    cursor: pointer;
}

.menu-right {
    width: 80%;
    height: 100vh;
    overflow-y: scroll;
    padding: 20px;
}
</style>

<script>
import Swal from 'sweetalert2'
import firebase from '~/plugins/firebase.js'
export default {
    methods: {
        goto(path) {
            this.$router.push(path)
        },

        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push('/')
                Swal.fire({
                    icon: 'success',
                    title: 'ออกจากระบบสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
    }
}
</script>