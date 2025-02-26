<template>
    <div class="menu-main">
        <div class="menu-left">
            <button @click="goto('/manage-users')">จัดการผู้ใช้</button>
            <button @click="goto('/manage-tree')">จัดการคาร์บอน</button>
            <button @click="goto('/manage-report')">สรุปรายงาน</button>
            <button @click="goto('/manage-payment')">จัดการค่าตอบแทน</button>
            <button @click="goto('/')">ย้อนกลับ</button>
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
    background-color: #3FCFC8;
    padding: 20px;
    margin-right: 20px;
}

.menu-left button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    text-align: left;
    background-color: #007b75;
    color: #fff;
    cursor: pointer;
}

.menu-right {
    width: 80%;
    height: auto;
    background-color: #fff;
    padding: 20px;
}
</style>

<script>
export default {
    methods: {
        goto(path) {
            this.$router.push(path)
        }
    }
}
</script>