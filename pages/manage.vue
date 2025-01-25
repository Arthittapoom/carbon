<template>
    <div class="backgroundhome">
        <Nevbar />
        <div class="signup-background">
            <img class="img1" src="../static/home/image 5.svg" alt="">

            <div class="container signup-container">

                <div class="signup-box">
                    <div class="menu">
                        <div @click="tab = 1" class="submenu">
                            <img src="../static/menu1.png" alt="">
                            <p>จัดการผู้ใช้</p>
                        </div>
                        <div @click="tab = 2" class="submenu">
                            <img src="../static/menu2.png" alt="">
                            <p>จัดการคาร์บอน</p>
                        </div>
                        <div @click="tab = 3" class="submenu">
                            <img src="../static/menu3.png" alt="">
                            <p>สรุปรายงาน</p>
                        </div>
                        <div @click="tab = 4" class="submenu">
                            <img src="../static/menu4.png" alt="">
                            <p>จัดการค่าตอบแทน</p>
                        </div>
                    </div>
                </div>

                <div class="signup-box2">
                    <div v-if="tab == 1">
                        <div class="form-manage">
                            <h1>จัดการผู้ใช้ </h1>
                            <div class="form-manage2">

                                <div v-for="item in userdatelist" class="list_item">
                                    <img src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png"
                                        alt="">
                                    <div>
                                        <h1>{{ item.firstname + ' ' + item.lastname }}</h1>
                                        <p>{{ item.role === 'user' ? 'ผู้ใช้' : 'ผู้ดูแลระบบ' }}</p>
                                    </div>
                                    <button @click="edituser(item)">แก้ไข</button>
                                </div>



                            </div>


                        </div>
                    </div>
                    <div v-if="tab == 2">
                        <div>
                            <div class="form-manage">
                                <h1>จัดการคาร์บอน </h1>
                                <div class="form-manage2">


                                    <div v-for="item in treeslist" class="list_item">
                                        <img src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png"
                                            alt="">
                                        <div>
                                            <h1>{{ item.firstname }} {{ item.lastname }}</h1>
                                        </div>
                                        <button @click="manage_carbon(item)">ตรวจ</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tab == 22">
                        <div class="form-manage">
                            <h1>รายละเอียดคาร์บอน</h1>

                            <div class="form-manage2">
                                <div class="carbon-info">
                                    <h2>ข้อมูลผู้ใช้</h2>
                                    <table>
                                        <tr>
                                            <th>ชื่อ</th>
                                            <td>{{ select_corbon.firstname }}</td>
                                        </tr>
                                        <tr>
                                            <th>นามสกุล</th>
                                            <td>{{ select_corbon.lastname }}</td>
                                        </tr>
                                        <tr>
                                            <th>เบอร์โทร</th>
                                            <td>{{ select_corbon.phone }}</td>
                                        </tr>
                                        <tr>
                                            <th>พื้นที่</th>
                                            <td>{{ select_corbon.area }} ตร.ม.</td>
                                        </tr>
                                        <tr>
                                            <th>ราคาคาร์บอน</th>
                                            <td>{{ select_corbon.carbonPrice }} บาท</td>
                                        </tr>
                                        <tr>
                                            <th>สถานะ</th>
                                            <td>{{ select_corbon.status }}</td>
                                        </tr>
                                        <tr>
                                            <th>รวมคาร์บอน</th>
                                            <td>{{ select_corbon.totalCarbon }} kg</td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="carbon-info">
                                    <h2>ข้อมูลต้นไม้</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>ชนิด</th>
                                                <th>จำนวน</th>
                                                <th>ความสูง (cm)</th>
                                                <th>ความกว้าง (cm)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(tree, index) in select_corbon.trees" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ tree.type }}</td>
                                                <td>{{ tree.count }}</td>
                                                <td>{{ tree.height }}</td>
                                                <td>{{ tree.width }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="action_manage_carbon">
                                    <button @click="tab = 2">กลับ</button>
                                    <button @click="download(select_corbon)">โหลดข้อมูล</button>
                                    <input type="file">
                                    <button>ยืนยันข้อมูล</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="tab == 3">
                        <div class="form-edit">
                            <h1>สรุปรายงาน</h1>
                            <div class="menu">
                                <div @click="Export(1)" class="submenu">
                                    <img src="../static/menu4.png" alt="">
                                    <p>เอกสารรายชื่อ</p>
                                </div>
                                <div @click="Export(2)" class="submenu">
                                    <img src="../static/menu4.png" alt="">
                                    <p>เอกสารการชื้อขาย</p>
                                </div>
                                <div @click="Export(3)" class="submenu">
                                    <img src="../static/menu4.png" alt="">
                                    <p>เอกสารต้นไม้</p>
                                </div>
                                <div @click="Export(4)" class="submenu">
                                    <img src="../static/menu4.png" alt="">
                                    <p>เอกสารบัญชี</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tab == 4">
                        <div class="form-manage">
                            <h1>จัดการค่าตอบแทน </h1>
                            <div class="form-manage2">



                                <div v-for="item in buyCorbon" class="list_item">
                                    <img src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png"
                                        alt="">
                                    <div>
                                        <h1>{{ item.firstname + ' ' + item.lastname }}</h1>
                                        <p>{{ item.status }}</p>
                                        <p>{{ item.tree.carbonPrice }} บาท</p>
                                        <p>{{ item.tree.totalCarbon }} C</p>
                                    </div>
                                    <button v-if="item.status === 'รอการตรวจสอบ'" @click="check(item)">ตรวจ</button>
                                    <button v-if="item.status === 'ตรวจสอบแล้ว'"
                                        style="background-color: aliceblue; color: #000;">สำเร็จ</button>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>
</template>

<script>
import * as XLSX from "xlsx";
import Nevbar from '~/components/Nevbar.vue'
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2'

export default {
    components: { Nevbar },

    data() {
        return {
            tab: 1,
            edit: false,
            user: null, // เก็บข้อมูลผู้ใช้ปัจจุบัน
            FormData: {
                firstname: '',
                lastname: '',
                phone: '',
                birth: '',
                idcard: '',
                agree: false
            },

            FormData2: {
                bank: '',
                branch: '',
                name: '',
                number: '',
                agree: false
            },
            originalData: {}, // ข้อมูลต้นฉบับฟอร์มแรก
            originalData2: {}, // ข้อมูลต้นฉบับฟอร์มบัญชีธนาคาร


            userdatelist: [],

            treeslist: [],

            buyCorbon: [],

            select_corbon: null,
        };
    },

    mounted() {
        // ติดตามสถานะการล็อกอินแบบเรียลไทม์
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            if (user) {
                this.getUserData(); // ดึงข้อมูลผู้ใช้เมื่อเข้าสู่ระบบ
                this.getData_bank();
                this.getuser();
                this.getbuyCorbon();
                this.gettrees();
            } else {
                console.log("User is logged out");
            }
        });
    },

    methods: {

        download(data) {

            // แปลงข้อมูล `trees` ให้เป็นรายการที่พร้อมใช้งานใน Excel
            const flattenedData = data.trees.map((tree, index) => ({
                ID: data.id,
                AcceptPolicy: data.acceptPolicy,
                Area: data.area,
                CarbonPrice: data.carbonPrice,
                Status: data.status,
                TotalCarbon: data.totalCarbon,
                FirstName: data.firstname,
                LastName: data.lastname,
                Phone: data.phone,
                TreeIndex: index + 1, // หมายเลขของต้นไม้
                TreeCount: tree.count,
                TreeHeight: tree.height,
                TreeType: tree.type,
                TreeWidth: tree.width,
            }));

            // สร้าง worksheet
            const ws = XLSX.utils.json_to_sheet(flattenedData);

            // สร้าง workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Data");

            // เขียนไฟล์ Excel
            XLSX.writeFile(wb, "data.xlsx");

        },

        manage_carbon(item) {
            this.select_corbon = item
            this.tab = 22
            //    console.log(this.select_corbon);
        },

        gettrees() {
            firebase.database().ref('trees').on('value', (snapshot) => {
                const data = snapshot.val();

                if (!data) {
                    console.log("No data found in 'trees'.");
                    this.treeslist = [];
                    return;
                }

                // แปลงข้อมูลเป็นอาร์เรย์และเพิ่มรายละเอียดผู้ใช้
                this.treeslist = Object.entries(data).map(([id, tree]) => ({
                    id,
                    ...tree,
                }));

                // ดึงข้อมูลผู้ใช้เพิ่มเติมตาม uid
                this.treeslist.forEach((tree) => {
                    if (tree.uid) {
                        firebase.database().ref(`users/${tree.uid}`).once('value', (userSnapshot) => {
                            const userData = userSnapshot.val();

                            // เพิ่มข้อมูลผู้ใช้เข้าในต้นไม้แต่ละรายการ
                            this.treeslist = this.treeslist.map((item) => {
                                if (item.uid === tree.uid) {
                                    return {
                                        ...item,
                                        firstname: userData?.firstname || "Unknown",
                                        lastname: userData?.lastname || "Unknown",
                                        phone: userData?.phone || "Unknown",
                                    };
                                }
                                return item;
                            });

                            // console.log("Updated trees list with user data:", this.treeslist);
                        });
                    }
                });

                console.log("Initial trees list:", this.treeslist);
            });
        },


        check(item) {
            if (!item || !item.id || !item.imgurl) {
                Swal.fire({
                    icon: 'error',
                    title: 'ข้อมูลไม่ถูกต้อง',
                    text: 'ไม่สามารถตรวจสอบข้อมูลได้',
                });
                return;
            }

            Swal.fire({
                imageUrl: item.imgurl,
                imageWidth: 300,
                imageAlt: 'Custom image',
                confirmButtonText: 'ตรวจสอบ',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                focusConfirm: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // อัปเดตสถานะใน Firebase
                        await firebase.database().ref('buyCorbon/' + item.id).update({
                            status: 'ตรวจสอบแล้ว',
                        });

                        // แสดงผลลัพธ์เมื่ออัปเดตสำเร็จ
                        Swal.fire({
                            icon: 'success',
                            title: 'ตรวจสอบแล้ว',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } catch (error) {
                        // แสดงข้อผิดพลาด
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'ไม่สามารถอัปเดตสถานะได้: ' + error.message,
                        });
                    }
                } else if (result.isDismissed) {
                    // กรณีกดปุ่มยกเลิก
                    Swal.fire({
                        icon: 'error',
                        title: 'ยกเลิก',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        },

        async getbuyCorbon() {
            try {
                const snapshot = await firebase.database().ref('buyCorbon').once('value');
                const data = snapshot.val();

                // เอา id เข้า data
                for (const [key, value] of Object.entries(data)) {
                    data[key].id = key;
                }


                if (data) {
                    // แปลงข้อมูลจาก Object เป็น Array
                    this.buyCorbon = Object.values(data);

                    // ดึงข้อมูลผู้ใช้เพิ่มเติมโดยใช้ Promise.all
                    const promises = this.buyCorbon.map(async (item) => {
                        const userSnapshot = await firebase.database().ref(`users/${item.uid}`).once('value');
                        const userData = userSnapshot.val();

                        // รวมข้อมูลของ buyCorbon และ user
                        return {
                            ...item,
                            firstname: userData?.firstname || '',
                            lastname: userData?.lastname || '',
                            phone: userData?.phone || '',
                            birth: userData?.birth || '',
                            idcard: userData?.idcard || '',
                        };
                    });

                    // รอให้ข้อมูลผู้ใช้ทั้งหมดถูกโหลด
                    this.buyCorbon = await Promise.all(promises);

                    // console.log(this.buyCorbon); // แสดงข้อมูลที่อัปเดตแล้ว
                } else {
                    console.log("No data found in 'buyCorbon'.");
                }
            } catch (error) {
                console.error("Error fetching buyCorbon or user data:", error);
            }
        },

        edituser(item) {
            Swal.fire({
                title: 'แก้ไขข้อมูลผู้ใช้',
                html: `
            <input id="swal-input1" class="swal2-input" placeholder="ชื่อ" value="${item.firstname}">
            <input id="swal-input2" class="swal2-input" placeholder="นามสกุล" value="${item.lastname}">
            <input id="swal-input3" class="swal2-input" placeholder="เบอร์โทรศัพท์" value="${item.phone}">
            <input id="swal-input4" class="swal2-input" placeholder="วันเกิด" value="${item.birth}">
            <input id="swal-input5" class="swal2-input" placeholder="เลขบัตรประชาชน" value="${item.idcard}">
            <select id="swal-input6" class="swal2-input">
                <option value="user" ${item.role === 'user' ? 'selected' : ''}>ผู้ใช้</option>
                <option value="admin" ${item.role === 'admin' ? 'selected' : ''}>ผู้ดูแลระบบ</option>
            </select>
        `,
                confirmButtonText: 'บันทึก',
                cancelButtonText: 'ยกเลิก',
                showCancelButton: true,
                focusConfirm: false,
                preConfirm: () => {
                    const firstname = document.getElementById('swal-input1').value;
                    const lastname = document.getElementById('swal-input2').value;
                    const phone = document.getElementById('swal-input3').value;
                    const birth = document.getElementById('swal-input4').value;
                    const idcard = document.getElementById('swal-input5').value;
                    const role = document.getElementById('swal-input6').value;

                    if (!firstname || !lastname || !phone || !birth || !idcard) {
                        Swal.showValidationMessage(`กรุณากรอกข้อมูลให้ครบถ้วน`);
                    }

                    return { firstname, lastname, phone, birth, idcard, role };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { firstname, lastname, phone, birth, idcard, role } = result.value;

                    // อัปเดตข้อมูลใน Firebase
                    firebase.database().ref('users/' + item.id).update({
                        firstname,
                        lastname,
                        phone,
                        birth,
                        idcard,
                        role
                    }).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'แก้ไขข้อมูลผู้ใช้สําเร็จ',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                }
            });
        },

        getuser() {
            const userRef = firebase.database().ref('users');

            userRef.on('value', (snapshot) => {
                const data = snapshot.val();
                const userList = [];

                // เพิ่ม id เข้าไปในแต่ละรายการ
                for (const [id, userData] of Object.entries(data || {})) {
                    userList.push({ id, ...userData });
                }

                // console.log(userList);

                // อัปเดต `userdatelist` เพื่อใช้ในคอมโพเนนต์
                this.userdatelist = userList;
            }, (error) => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            });
        },

        Export(e) {
            if (e == 1) {
                // ดึงข้อมูลจาก Firebase
                firebase.database().ref("users").once("value").then((snapshot) => {
                    const data = snapshot.val();

                    // แปลงข้อมูลจาก object เป็น array
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

                    console.log("Formatted Data:", formattedData);

                    // สร้างไฟล์ Excel
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(formattedData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

                    // ดาวน์โหลดไฟล์ Excel
                    XLSX.writeFile(workbook, "users.xlsx");
                });
            }
            if (e == 2) {
                alert("เอกสารการชื้อขาย");
            }
            if (e == 3) {
                // ดึงข้อมูล "trees"
                firebase.database().ref("trees").once("value").then((snapshot) => {
                    const data = snapshot.val();

                    // แปลงข้อมูลจาก object เป็น array พร้อมขยายรายการ `trees`
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

                    console.log("Formatted Tree Data:", formattedData);

                    // สร้างไฟล์ Excel
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(formattedData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Trees");

                    // ดาวน์โหลดไฟล์ Excel
                    XLSX.writeFile(workbook, "trees.xlsx");
                });
            }
            if (e == 4) {
                // ดึงข้อมูล "users"
                firebase.database().ref("users").once("value").then((snapshot) => {
                    const data = snapshot.val();

                    // แปลงข้อมูลเพื่อเอาเฉพาะฟิลด์ bank
                    const formattedData = Object.keys(data).map((key) => {
                        const bank = data[key]?.bank || {}; // ตรวจสอบว่ามีข้อมูล bank หรือไม่
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

                    console.log("Formatted Bank Data:", formattedData);

                    // สร้างไฟล์ Excel
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(formattedData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Bank");

                    // ดาวน์โหลดไฟล์ Excel
                    XLSX.writeFile(workbook, "bank.xlsx");
                });
            }
        },

        validateForm() {
            const { firstname, lastname, phone, birth, idcard, agree } = this.FormData;

            if (!firstname || !lastname || !birth) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                Swal.fire({
                    icon: 'error',
                    title: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!/^[0-9]{13}$/.test(idcard)) {
                Swal.fire({
                    icon: 'error',
                    title: 'เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!agree) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณายอมรับข้อตกลงก่อนบันทึกข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            return true;
        },

        async setData() {
            if (!this.user) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณาเข้าสู่ระบบก่อน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            // ตรวจสอบฟอร์มก่อนบันทึกข้อมูล
            if (!this.validateForm()) {
                return;
            }

            // ตรวจสอบว่าข้อมูลเปลี่ยนแปลงหรือไม่
            if (JSON.stringify(this.FormData) === JSON.stringify(this.originalData)) {
                Swal.fire({
                    icon: 'info',
                    title: 'ไม่มีการเปลี่ยนแปลงข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            try {
                const uid = this.user.uid; // ดึง UID ของผู้ใช้
                const payload = {
                    ...this.FormData,
                    uid: uid,
                    updateAt: new Date().toISOString()
                };

                // บันทึกข้อมูล
                await firebase.database().ref('users/' + uid).set(payload);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });

                this.edit = false;

                // อัปเดตข้อมูลต้นฉบับหลังจากบันทึกสำเร็จ
                this.originalData = { ...this.FormData };

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด: ' + error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },

        // ตรวจสอบข้อมูลฟอร์มบัญชีธนาคาร
        validateForm_bank() {
            const { bank, branch, name, number, agree } = this.FormData2;

            if (!bank || !branch || !name) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!/^[0-9]{10}$/.test(number)) {
                Swal.fire({
                    icon: 'error',
                    title: 'เลขบัญชีต้องเป็นตัวเลข 10 หลัก',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            if (!agree) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณายอมรับข้อตกลงก่อนบันทึกข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return false;
            }

            return true;
        },

        // บันทึกข้อมูลบัญชีธนาคาร
        async setData_bank() {
            if (!this.user) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณาเข้าสู่ระบบก่อน',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            if (!this.validateForm_bank()) {
                return;
            }

            if (JSON.stringify(this.FormData2) === JSON.stringify(this.originalData2)) {
                Swal.fire({
                    icon: 'info',
                    title: 'ไม่มีการเปลี่ยนแปลงข้อมูล',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            try {
                const uid = this.user.uid;
                const payload = {
                    ...this.FormData2,
                    uid: uid,
                    updateAt: new Date().toISOString()
                };

                await firebase.database().ref('users/' + uid + '/bank/').set(payload);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลบัญชีธนาคารสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });

                this.edit = false;


                this.originalData2 = { ...this.FormData2 };

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด: ' + error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },

        // ดึงข้อมูลบัญชีธนาคาร
        async getData_bank() {
            try {
                if (!this.user) return;

                const uid = this.user.uid;
                const snapshot = await firebase.database().ref('users/' + uid + '/bank/').once('value');
                const data = snapshot.val();

                if (data) {
                    this.FormData2 = data;
                    this.originalData2 = { ...data };
                } else {
                    console.log("No bank data available");
                }

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบัญชีธนาคาร:", error.message);
            }
        },

        async getUserData() {
            try {
                if (!this.user) return;

                const uid = this.user.uid;
                const snapshot = await firebase.database().ref('users/' + uid).once('value');
                const data = snapshot.val();

                if (data) {
                    this.FormData = data; // กำหนดข้อมูลที่ดึงมา
                    this.originalData = { ...data }; // เก็บข้อมูลต้นฉบับ
                } else {
                    console.log("No data available");
                }

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error.message);
            }
        }
    }
}
</script>


<style scoped>
.action_manage_carbon {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 5px;
    gap: 10px;
}

.action_manage_carbon button {
    width: 100%;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #fff;
    font-weight: bold;
}

.carbon-info {
    display: flex;
    flex-direction: column;
    width: 100%;
}


.form-manage {}

.form-manage2 {
    /* background-color: #00A1B4; */
    overflow-y: scroll;
    height: 400px;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #00A1B4;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #007A91;
}


.form-manage>h1 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #2EBBF1;
}

.list_item {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px;
    border-radius: 10px;
    border: 1px solid #0068ad;
    /* background-color: #909090; */
}

.list_item img {
    width: 30px;
    height: 30px;
}

.list_item h1 {
    padding-top: 10px;
    font-size: 20px;
}

.list_item p {
    font-size: 16px;
}

.list_item button {
    width: 60px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
}


.img1 {
    position: absolute;
    top: 0;
    width: 200px;
    height: 200px;
    z-index: 1;
}

@media screen and (max-width: 768px) {
    .img1 {
        display: none;
    }
}

.card-body {
    width: 100%;
    height: 100px;
    background-color: #3FCFC8;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #909090;
    padding: 20px;
    margin-right: 20px;
}

.graph {
    width: 100%;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #909090;
    padding: 20px;
    margin-right: 20px;
}

.backgroundhome {
    background: linear-gradient(to bottom right, #0BC599 30%, #F1E92E 100%);
}

.signup-background {

    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.signup-box,
.signup-box2 {
    height: 450px;
    width: 100%;
    max-width: 400px;
    background-color: #ffffff;
    border-radius: 50px;
    box-shadow: 0px 5px 1px 0px #ffffff;
    border: 5px solid #ffffff;
    padding: 20px;
    margin: 10px;
}

.signup-box {
    background-color: #ffffff;
}


.menu {
    width: 100%;
    height: 100%;
    /* background-color: #00A1B4; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    box-sizing: border-box;
}

.submenu {
    width: calc(50% - 10px);
    background-color: white;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.submenu:hover {
    /* background-color: #00BBD4; */
    transform: scale(1.05);
}

.submenu img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
}

.submenu p {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: #2EBBF1;
}


.form-edit {
    width: 100%;
    height: 100%;
    /* background-color: rgb(248, 108, 108); */
}

.form-edit input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #ffffff;
    padding-left: 10px;
    margin-bottom: 10px;
}

.form-edit input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}


.form-edit h1 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #2EBBF1;
    padding-bottom: 10px;
}

.form-edit h1 img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    cursor: pointer;
}

.form-edit button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.form-edit button:hover {
    transform: scale(1.05);
}


@media (max-width: 768px) {

    .signup-box,
    .signup-box2 {
        width: 100%;
        max-width: 100%;
    }
}

@media (max-width: 576px) {

    .signup-box,
    .signup-box2 {
        height: auto;
        padding: 10px;
    }

    .card-body,
    .graph {
        height: auto;
        padding: 10px;
        margin-right: 0;
    }
}
</style>