<template>
    <div class="success">
        <div class="success-card">
            <h1>ชำระสำเร็จ</h1>
            <p>จำนวนเงินที่ชำระเงิน {{ formatNumber(amount) }} บาท</p>
            <button @click="back">ย้อนกลับ</button>
        </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            amount: 0,
            uid: ''
        }
    },

    mounted() {
        // http://localhost:3000/success?amount=50000&uid=FrNnAaQCsJMeTJWzaDpIBkgppaJ3
        this.amount = this.$route.query.amount;
        this.uid = this.$route.query.uid;
        this.updateamount();
    },

    methods: {

        formatNumber(num) {
            return new Intl.NumberFormat('th-TH').format(num);
        },

        back() {
            this.$router.push('/');
        },

        updateamount() {
            // เช็ค plyment ว่า balance ตรงกับ this.amount ไหม ถ้าตรงให้เพิ่มค่า amount
            firebase.database().ref('plyment/' + this.uid).on('value', (snapshot) => {
                const data = snapshot.val();
                this.amount = Number(this.amount); // แปลง this.amount ให้เป็นตัวเลข

                if (data.balance === this.amount) {
                    if (data.status === 0) {
                        // ใช้ transaction เพื่ออัปเดตค่า amount ให้เพิ่มขึ้นจากค่าปัจจุบัน
                        firebase.database().ref('users/' + this.uid + '/amount').transaction((currentAmount) => {
                            return (currentAmount || 0) + this.amount; // บวกค่าลงไป
                        });

                        // อัปเดตสถานะเป็น 1
                        firebase.database().ref('plyment/' + this.uid).update({ status: 1 });
                    }
                }
            });
        },


    },



}
</script>

<style scoped>
.success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #9ec3c6;
    font-family: 'Prompt', sans-serif;
}

.success-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    width: 500px;
    height: 300px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
}

.success-card h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
}

.success-card p {
    font-size: 24px;
    margin-bottom: 20px;
}

.success-card button {
    background-color: #00A1B4;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
</style>