<template>
    <div>
        <Nevbar />
        <div class="menu-main">
            <div class="menu-left">
                <button @click="goto('/profile-info')">ข้อมูลส่วนตัว / ข้อมูลบัญชี</button>
                <button @click="goto('/Standard-T-VER')">แบบฟอร์มขอรับรองคาร์บอนเครดิต</button>
                <button @click="goto('/Standard-T-VER-status')">คำขอรับรองคาร์บอนเครดิต</button>
                <!-- <button @click="goto('/profile-credit-order-sell')">รายการเสนอขายคาร์บอนเครดิต</button> -->
                <button @click="goto('/profile-credit-order-buy')">รายการชื้อคาร์บอนเครดิต</button>
                <!-- <button @click="goto('/profile-bank')">ข้อมูลบัญชี</button> -->
                <!-- <button @click="goto('/profile-history')">ประวัติการทำรายการ</button> -->
                <button @click="goto('/')">ย้อนกลับ</button>
                <button @click="logout">ออกจากระบบ</button>
            </div>
            <div class="menu-right">
                <nuxt />
            </div>
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
    width: 25%;
    height: 90vh;
    background: linear-gradient(to bottom right, rgb(170, 211, 213) 30%, rgb(125, 170, 174) 100%);
    padding: 20px;
    margin-right: 20px;
}

.menu-left button {
    font-family: 'Prompt', sans-serif;
    padding: 10px;
    border: none;
    border-radius: 5px;
    text-align: left;
    background-color: #ffffff;
    font-weight: bold;
    color: #053a13;
    cursor: pointer;
}

.menu-left button:hover {
    background-color: #00A1B4;
    color: #ffffff;
}

.menu-right {
    width: 80%;
    height: 90vh;
    overflow-y: scroll;
    padding: 20px;
}
</style>

<script>
import Swal from 'sweetalert2'
import firebase from '~/plugins/firebase.js'
import Nevbar from '~/components/Nevbar.vue'
export default {
    components: { Nevbar },
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