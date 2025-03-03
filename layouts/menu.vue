<template>
    <div>
        <Nevbar />
        <div class="menu-main">
            <div class="menu-left">
                <button @click="goto('/Standard-T-VER-status-admin')">คำขอรับรองคาร์บอนเครดิต</button>
                <button @click="goto('/Standard-T-VER-status-admin-approve')">คำขอที่อนุมัติแล้ว</button>
                <button @click="goto('/manage-users')">จัดการผู้ใช้</button>
                <button @click="goto('/manage-report')">สรุปรายงาน</button>
                <button @click="goto('/manage-payment')">จัดการค่าตอบแทน</button>
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
    width: 20%;
    height: 90vh;
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