<template>
    <div>
        <h1>ราการคำขอถอนเงิน</h1>
        <table class="withdraw-table">
            <thead>
                <tr>
                    <th>วันที่</th>
                    <th>เวลา</th>
                    <th>จำนวนเงิน</th>
                    <th>สถานะ</th>
                    <th>บัญชีธนาคาร</th>
                    <th>ดำเนินการ</th>
                </tr>
            </thead>
            <tbody class="withdraw-table-body">
                <tr v-for="(row, index) in formList" :key="index">
                    <td>{{ row.date }}</td>
                    <td>{{ row.time }}</td>
                    <td>{{ formatNumber(row.amount) }} ฿</td>
                    <td>
                        <span :class="{ 'status-pending': row.status === 0, 'status-success': row.status === 1 }">
                            {{ row.status === 0 ? 'รอดำเนินการ' : 'สำเร็จ' }}
                        </span>
                    </td>
                    <td>
                        <div class="bank-info" v-if="row.userData?.bank">
                            <p><strong>ธนาคาร:</strong> {{ row.userData.bank?.bank }}</p>
                            <p><strong>สาขา:</strong> {{ row.userData.bank?.branch }}</p>
                            <p><strong>ชื่อบัญชี:</strong> {{ row.userData.bank?.name }}</p>
                            <p><strong>เลขบัญชี:</strong> {{ row.userData.bank?.number }}</p>
                        </div>
                        <div v-else>-</div>
                    </td>
                    <td>
                        <button class="confirm-btn">ยืนยัน</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js';
export default {
    layout: 'menu',
    data() {
        return {
            uid: '',
            formList: [],
        }
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
            firebase.database().ref(`withdraw/${this.uid}`).on('value', async (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.formList = Object.entries(data).map(([key, value]) => ({
                        ...value,
                        key, // เก็บ key ไว้ใช้ต่อ
                        userData: null, // เพิ่ม field สำหรับเก็บข้อมูล user
                    }));

                    // ดึงข้อมูล users ด้วย uid ที่อยู่ใน formList
                    await Promise.all(this.formList.map(async (item, index) => {
                        if (item.uid) {
                            const userSnapshot = await firebase.database().ref(`users/${item.uid}`).once('value');
                            this.formList[index].userData = userSnapshot.val();
                        }
                    }));

                    // console.log("ข้อมูลที่ได้", this.formList);
                }
            });
        },

    }
}
</script>

<style scoped>
.withdraw-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 16px;
}

.withdraw-table th, 
.withdraw-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.withdraw-table th {
    background: #f4f4f4;
    font-weight: bold;
    text-align: center;
}

.withdraw-table-body tr:nth-child(even) {
    background: #f9f9f9;
}

.status-pending {
    color: #ff9800;
    font-weight: bold;
}

.status-success {
    color: #4caf50;
    font-weight: bold;
}

.bank-info p {
    margin: 4px 0;
}

.confirm-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.confirm-btn:hover {
    background: #0056b3;
}

</style>