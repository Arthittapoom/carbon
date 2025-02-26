<template>
    <div>
        <h1>จัดการผู้ใช้</h1>
        <table>
            <thead>
                <tr>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>โทรศัพท์</th>
                    <th>บทบาท</th>
                    <th>การจัดการ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in userdatelist" :key="user.id">
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <button @click="viewUser(user)">ดูข้อมูล</button>
                        <button @click="editUser(user)">แก้ไข</button>
                        <button @click="deleteUser(user.id)">ลบ</button>
                        <button @click="viewBank(user)">ดูข้อมูลบัญชี</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js';
import Swal from 'sweetalert2';

export default {
    layout: 'menu',
    data() {
        return {
            userdatelist: [],
        };
    },
    mounted() {
        this.getuser();
    },
    methods: {
        getuser() {
            const userRef = firebase.database().ref('users');
            userRef.on('value', (snapshot) => {
                const data = snapshot.val();
                this.userdatelist = Object.entries(data || {}).map(([id, userData]) => ({ id, ...userData }));
            }, (error) => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            });
        },
        viewUser(user) {
            Swal.fire({
                title: 'รายละเอียดผู้ใช้',
                html: `
            <p><strong>ชื่อ:</strong> ${user.firstname} ${user.lastname}</p>
            <p><strong>โทรศัพท์:</strong> ${user.phone}</p>
            <p><strong>บทบาท:</strong> ${user.role}</p>
            <p><strong>เลขบัตรประชาชน:</strong> ${user.idcard}</p>
            <p><strong>วันเกิด:</strong> ${user.birth}</p>
          `,
                showConfirmButton: true
            });
        },
        viewBank(user) {
            Swal.fire({
                title: 'รายละเอียดบัญชีธนาคาร',
                html: `
            <p><strong>ชื่อบัญชี:</strong> ${user.bank.name}</p>
            <p><strong>ธนาคาร:</strong> ${user.bank.bank}</p>
            <p><strong>สาขา:</strong> ${user.bank.branch}</p>
            <p><strong>หมายเลขบัญชี:</strong> ${user.bank.number}</p>
          `,
                showConfirmButton: true
            });
        },
        editUser(user) {
            Swal.fire({
                title: 'แก้ไขข้อมูลผู้ใช้',
                html: `
            <input id="swal-firstname" class="swal2-input" placeholder="ชื่อ" value="${user.firstname}">
            <input id="swal-lastname" class="swal2-input" placeholder="นามสกุล" value="${user.lastname}">
            <input id="swal-phone" class="swal2-input" placeholder="โทรศัพท์" value="${user.phone}">
            <select id="swal-role" class="swal2-input">
              <option value="user" ${user.role === 'user' ? 'selected' : ''}>ผู้ใช้</option>
              <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>ผู้ดูแลระบบ</option>
            </select>
          `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    return {
                        firstname: document.getElementById('swal-firstname').value,
                        lastname: document.getElementById('swal-lastname').value,
                        phone: document.getElementById('swal-phone').value,
                        role: document.getElementById('swal-role').value,
                    };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    firebase.database().ref(`users/${user.id}`).update(result.value)
                        .then(() => {
                            Swal.fire('อัปเดตสำเร็จ!', '', 'success');
                            this.getuser();
                        })
                        .catch((error) => {
                            Swal.fire('เกิดข้อผิดพลาด!', error.message, 'error');
                        });
                }
            });
        },
        deleteUser(id) {
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: 'การลบนี้ไม่สามารถย้อนกลับได้!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ใช่, ลบเลย!',
                cancelButtonText: 'ยกเลิก',
            }).then((result) => {
                if (result.isConfirmed) {
                    firebase.database().ref(`users/${id}`).remove()
                        .then(() => {
                            Swal.fire('ลบสำเร็จ!', 'ข้อมูลผู้ใช้ถูกลบแล้ว', 'success');
                            this.getuser();
                        })
                        .catch((error) => {
                            Swal.fire('เกิดข้อผิดพลาด!', error.message, 'error');
                        });
                }
            });
        }
    }
};
</script>


<style>
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

button {
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #ddd;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}
</style>