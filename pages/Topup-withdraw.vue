<template>
    <div>
        <Nevbar></Nevbar>
        <div class="main">
            <div class="card-body">
                <div class="card-left">
                    <p class="card-title">ถอนเงิน</p>
                    <p class="card-title-text">จำนวนเงิน
                        <input v-model="amountwithdraw" class="card-input" type="number">
                    </p>
                    <button class="card-button-withdraw" @click="withdraw">ถอนเงิน</button>
                </div>
                <div class="card-right">
                    <p class="card-title">รายการถอน</p>
                    
                    <table class="withdraw-table">
                        <thead>
                            <tr>
                                <th>จำนวนเงิน (บาท)</th>
                                <th>วันที่</th>
                                <th>เวลา</th>
                                <th>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody class="withdraw-table-body">
                            <tr v-for="(row, index) in formList" :key="index">
                                <td>{{ formatNumber(row.amount) }}</td>
                                <td>{{ row.date }}</td>
                                <td>{{ row.time }}</td>
                                <td>{{ row.status === 0 ? 'รอดำเนินการ' : 'สำเร็จ' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import firebase from '~/plugins/firebase.js';
import Nevbar from '../components/Nevbar.vue';

export default {
    components: { Nevbar },
    data() {
        return {
            amountwithdraw: 0,
            uid: null,
            formList: []
        };
    },
    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;
                this.fetchwithdraw();
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
        fetchwithdraw() {
            firebase.database().ref(`withdraw/${this.uid}`).on('value', snapshot => {
                const data = snapshot.val();
                if (data) {
                    this.formList = Object.values(data);
                }
            });
        },
        withdraw() {

            Swal.fire({
                icon: 'warning',
                title: 'ยืนยันการถอนเงิน',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    firebase.database().ref(`users/${this.uid}`).once('value', (snapshot) => {
                        const data = snapshot.val();
                        const amountuser = data.amount;
                        if (this.amountwithdraw > Number(amountuser) || this.amountwithdraw <= 0) {
                            return Swal.fire({ icon: 'error', title: 'เงินไม่เพียงพอ' });
                        } else {
                            const amount = Number(amountuser) - this.amountwithdraw;
                            firebase.database().ref(`users/${this.uid}`).update({ amount: amount });
                            firebase.database().ref(`withdraw/${this.uid}`).push({
                                amount: this.amountwithdraw,
                                date: new Date().toLocaleDateString(),
                                time: new Date().toLocaleTimeString(),
                                status: 0,
                                uid: this.uid
                            });
                            Swal.fire({ icon: 'success', title: 'รอดำเนินการ', showConfirmButton: false, timer: 1500 });
                        }
                    });
                }
            });


        }
    }
};
</script>

<style scoped>

.withdraw-table {
    width: 100%;
    border-collapse: collapse;
}

.withdraw-table th,
.withdraw-table td {
    border: 1px solid #ffffff;
    padding: 8px;
    text-align: center;
}

.withdraw-table th {
    background-color: #0e8f8d;
    color: #ffffff;
    border-radius: 10px;
}
.main {
    background: linear-gradient(to bottom right, rgb(170, 211, 213) 30%, rgb(125, 170, 174) 100%);
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-body {
    width: 100%;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
    margin: 100px;
    border-radius: 20px;
    display: flex;
    gap: 20px;


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
    overflow-y: scroll;
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
    background-color: #00A1B4;
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