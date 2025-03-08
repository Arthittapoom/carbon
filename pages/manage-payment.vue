<template>
    <div>
        <h1>รายการคำขอถอนเงิน</h1>
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
                <tr  v-for="(row, index) in formList" :key="index">
                    <td>{{ row.date }}</td>
                    <td>{{ row.time }}</td>
                    <td>{{ formatNumber(row.amount) }} ฿</td>
                    <td>
                        <span :class="{
                            'status-pending': row.status === 0,
                            'status-success': row.status === 1
                        }">
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
                        <button @click="confirmWithdraw(row.key)" class="confirm-btn">ยืนยัน</button>
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
        this.fetchwithdraw();
    },

    methods: {
        formatNumber(num) {
            return new Intl.NumberFormat('th-TH').format(num);
        },

        confirmWithdraw(id) {
            // ดึงข้อมูลทั้งหมดใน withdraw
            firebase.database().ref('withdraw').once('value').then(snapshot => {
                const data = snapshot.val();
                if (data) {
                    // ลูปผ่านทุกๆ uid และอัปเดตข้อมูลในแต่ละ uid
                    Object.keys(data).forEach(uid => {
                        // ตรวจสอบว่ามีรายการถอนที่ตรงกับ id หรือไม่
                        const withdraw = data[uid];
                        Object.keys(withdraw).forEach(withdrawKey => {
                            if (withdrawKey === id) {
                                // อัปเดตสถานะเป็นสำเร็จ (1)
                                firebase.database().ref(`withdraw/${uid}/${withdrawKey}`).update({ status: 1 });
                            }
                        });
                    });
                }
            }).then(() => {
            }).catch(error => {
                console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            });
        },


        async fetchwithdraw() {
            try {

                this.formList = [];
                // ใช้ .on('value') เพื่อดึงข้อมูลแบบ real-time
                firebase.database().ref('withdraw').on('value', async (snapshot) => {
                    const data = snapshot.val();

                    if (data) {
                        // แปลงข้อมูล withdraw ทั้งหมดเป็น array
                        this.formList = Object.entries(data).flatMap(([uid, withdraws]) =>
                            Object.entries(withdraws).map(([key, value]) => ({
                                ...value,
                                key,  // เก็บ key ของแต่ละรายการ
                                uid,  // เก็บ uid ของเจ้าของรายการ
                                userData: null,  // เพิ่มข้อมูลผู้ใช้
                            }))
                        );

                        // ดึงข้อมูล user สำหรับทุก uid ที่พบใน formList
                        const uniqueUids = [...new Set(this.formList.map(item => item.uid))]; // ดึง uid ที่ไม่ซ้ำกัน
                        const userPromises = uniqueUids.map(async (uid) => {
                            const userSnapshot = await firebase.database().ref(`users/${uid}`).once('value');
                            return { uid, userData: userSnapshot.val() };
                        });

                        // รอให้ Promise ทั้งหมดเสร็จสิ้น
                        const userResults = await Promise.all(userPromises);

                        // อัปเดตข้อมูล userData ให้กับแต่ละรายการใน formList
                        userResults.forEach(({ uid, userData }) => {
                            this.formList.forEach(item => {
                                if (item.uid === uid) {
                                    this.$set(item, 'userData', userData);
                                }
                            });
                        });
                    } else {
                        this.formList = []; // ถ้าไม่มีข้อมูล ให้เป็น array ว่าง
                    }
                });
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            }
        }

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