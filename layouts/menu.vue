<template>
    <div>
        <Nevbar />
        <div class="menu-main">
            <div class="menu-left">
                <button @click="goto('/Standard-T-VER-status-admin')">ราการคำขอรับรองคาร์บอนเครดิต</button>
                <!-- <button @click="goto('/Standard-T-VER-status-admin-approve')">คำขอที่อนุมัติแล้ว</button> -->
                <button @click="goto('/manage-payment')">ราการคำขอถอนเงิน</button>
                <button @click="goto('/manage-users')">จัดการผู้ใช้</button>
                <button @click="goto('/manage-report')">สรุปรายงาน</button>
                <button @click="goto('/')">ย้อนกลับ</button>
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
    background-color: #fff;
    padding: 20px;
}


</style>

<script>
import Nevbar from '~/components/Nevbar.vue'
export default {
    components: { Nevbar },
    methods: {
        goto(path) {
            this.$router.push(path)
        }
    }
}
</script>