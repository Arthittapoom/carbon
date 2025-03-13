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

        async confirmWithdraw(id) {
            try {
                const snapshot = await firebase.database().ref(`withdraw`).once('value');
                const withdrawData = snapshot.val();

                if (!withdrawData) {
                    console.warn("ไม่มีข้อมูล withdraw");
                    return;
                }

                // วนลูปทุก uid แล้วหา id ที่ตรงกัน
                const updates = {};
                Object.entries(withdrawData).forEach(([uid, withdraws]) => {
                    if (withdraws[id]) {
                        updates[`withdraw/${uid}/${id}/status`] = 1;
                    }
                });

                // อัปเดต status เป็น 1 สำหรับทุก uid ที่มี id ตรงกัน
                if (Object.keys(updates).length > 0) {
                    await firebase.database().ref().update(updates);
                    console.log("อัปเดตสถานะสำเร็จ");
                } else {
                    console.warn("ไม่พบรายการที่ต้องอัปเดต");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการอัปเดต:", error);
            }
        },

        async fetchwithdraw() {
            try {
                const withdrawRef = firebase.database().ref(`withdraw`);

                // ตั้งค่า listener
                withdrawRef.on('value', async (snapshot) => {
                    const data = snapshot.val();

                    if (data) {
                        this.formList = Object.entries(data).flatMap(([uid, withdraws]) =>
                            Object.entries(withdraws).map(([key, value]) => ({
                                ...value,
                                key,  // เก็บ key ของรายการถอน
                                uid,  // เก็บ uid ของเจ้าของรายการถอน
                                userData: null, // เพิ่มข้อมูล user ไว้
                            }))
                        );

                        // ดึงข้อมูล users ของแต่ละ uid
                        const uniqueUids = [...new Set(this.formList.map(item => item.uid))]; // ดึง uid ที่ไม่ซ้ำกัน
                        const userPromises = uniqueUids.map(async (uid) => {
                            const userSnapshot = await firebase.database().ref(`users/${uid}`).once('value');
                            return { uid, userData: userSnapshot.val() };
                        });

                        const userResults = await Promise.all(userPromises);

                        // อัปเดตข้อมูล userData ใน formList
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

                // เก็บ reference ไว้ใช้ยกเลิกการฟังภายหลัง
                this.withdrawRef = withdrawRef;

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            }
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