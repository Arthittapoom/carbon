<template>
    <div>
        <h1>สรุปรายงาน</h1>
        <div class="button-group">
            <button @click="Export(1)">ดาวน์โหลดรายงานผู้ใช้</button>
            <button @click="Export(2)">เอกสารการซื้อขาย</button>
            <button @click="Export(3)">รายงานต้นไม้</button>
            <button @click="Export(4)">ข้อมูลธนาคาร</button>
        </div>
    </div>
</template>

<script>
import * as XLSX from "xlsx";
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2'
export default {
    layout: 'menu',
    data() {
        return {}
    },

    methods: {
        Export(e) {
            if (e == 1) {
                firebase.database().ref("users").once("value").then((snapshot) => {
                    const data = snapshot.val();
                    if (!data) {
                        Swal.fire('ไม่มีข้อมูล!', 'ไม่มีข้อมูลผู้ใช้ในระบบ', 'warning');
                        return;
                    }
                    const formattedData = Object.keys(data).map((key) => ({
                        UID: key,
                        Agree: data[key].agree,
                        Birth: data[key].birth,
                        Firstname: data[key].firstname,
                        Lastname: data[key].lastname,
                        IDCard: data[key].idcard,
                        Phone: data[key].phone,
                        Role: data[key].role,
                        UpdateAt: data[key].updateAt,
                    }));
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(formattedData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
                    XLSX.writeFile(workbook, "users.xlsx");
                }).catch(error => Swal.fire('เกิดข้อผิดพลาด!', error.message, 'error'));
            }
            if (e == 3) {
                firebase.database().ref("trees").once("value").then((snapshot) => {
                    const data = snapshot.val();
                    if (!data) {
                        Swal.fire('ไม่มีข้อมูล!', 'ไม่มีข้อมูลต้นไม้ในระบบ', 'warning');
                        return;
                    }
                    const formattedData = [];
                    Object.keys(data).forEach((key) => {
                        const user = data[key];
                        user.trees.forEach((tree, index) => {
                            formattedData.push({
                                UID: key,
                                AcceptPolicy: user.acceptPolicy,
                                Area: user.area,
                                CarbonPrice: user.carbonPrice,
                                Status: user.status,
                                TotalCarbon: user.totalCarbon,
                                TreeIndex: index + 1,
                                TreeCount: tree.count,
                                TreeHeight: tree.height,
                                TreeType: tree.type,
                                TreeWidth: tree.width,
                            });
                        });
                    });
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(formattedData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Trees");
                    XLSX.writeFile(workbook, "trees.xlsx");
                }).catch(error => Swal.fire('เกิดข้อผิดพลาด!', error.message, 'error'));
            }
            if (e == 4) {
                firebase.database().ref("users").once("value").then((snapshot) => {
                    const data = snapshot.val();
                    if (!data) {
                        Swal.fire('ไม่มีข้อมูล!', 'ไม่มีข้อมูลธนาคารในระบบ', 'warning');
                        return;
                    }
                    const formattedData = Object.keys(data).map((key) => {
                        const bank = data[key]?.bank || {};
                        return {
                            UID: key,
                            BankAgree: bank.agree || false,
                            BankName: bank.bank || "-",
                            BankBranch: bank.branch || "-",
                            AccountName: bank.name || "-",
                            AccountNumber: bank.number || "-",
                            UpdatedAt: bank.updateAt || "-",
                        };
                    });
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(formattedData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Bank");
                    XLSX.writeFile(workbook, "bank.xlsx");
                }).catch(error => Swal.fire('เกิดข้อผิดพลาด!', error.message, 'error'));
            }
        },
    }
}
</script>

<style scoped>
h1 {
    text-align: start;
    margin-bottom: 20px;
}
.button-group {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 20px;
}
button {
    padding: 10px 15px;
    background-color: #797767;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}
button:hover {
    background-color: #464646;
}
</style>
