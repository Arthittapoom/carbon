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
                            <p>ข้อมูลส่วนตัว</p>
                        </div>
                        <div @click="tab = 22" class="submenu">
                            <img src="../static/menu2.png" alt="">
                            <p>ข้อมูลคาร์บอน</p>
                        </div>
                        <div @click="tab = 3" class="submenu">
                            <img src="../static/menu3.png" alt="">
                            <p>ข้อมูลบัญชี</p>
                        </div>
                        <div @click="tab = 4" class="submenu">
                            <img src="../static/menu4.png" alt="">
                            <p>ประวัติการชื้อขาย</p>
                        </div>
                    </div>
                </div>

                <div class="signup-box2">
                    <div v-if="tab == 1">
                        <div class="form-edit">
                            <h1>ข้อมูลส่วนตัว </h1>
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData.firstname" type="text" placeholder="ชื่อจริง">
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData.lastname" type="text" placeholder="นามสกุล">
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData.phone" type="text" placeholder="เบอร์โทรศัพท์">
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData.birth" type="date" placeholder="วันเกิด">
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData.idcard" type="text" placeholder="เลขบัตรประชาชน">
                            <p><input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                    v-model="FormData.agree" type="checkbox"> ฉันยินยอมตามนโยบายและข้อกำหนด</p>
                            <button v-if="edit" @click="setData">บันทึกข้อมูล</button>
                            <h1 v-if="!edit">แก้ไข <img @click="edit = !edit" src="../static/pencil2.png" alt=""></h1>
                        </div>
                    </div>
                    <div v-if="tab == 2">
                        <h1 class="title">แก้ไขข้อมูลต้นไม้</h1>

                        <form class="form-tree" @submit.prevent="saveData">
                            <div class="form-slot">
                                <!-- จำนวนพื้นที่ (ไร่) -->
                                <div class="tree-size">
                                    <label>จำนวนพื้นที่ (ไร่):</label>
                                    <input v-model="treeData.area" type="number" placeholder="จำนวนพื้นที่ (ไร่)"
                                        required />
                                </div>

                                <!-- ข้อมูลต้นไม้ -->
                                <div v-for="(tree, index) in treeData.trees" :key="index" class="tree-item">


                                    <h3 class="title">ชนิดของต้นไม้ {{ index + 1 }}</h3>
                                    <input v-model="tree.type" type="text" placeholder="ชนิดของต้นไม้" required />


                                    <div class="tree-details">
                                        <div>
                                            <label>ความสูง:</label>
                                            <input v-model.number="tree.height" type="number" placeholder="ความสูง"
                                                required />
                                        </div>

                                        <div>
                                            <label>ความกว้าง: </label>
                                            <input v-model.number="tree.width" type="number" placeholder="ความกว้าง"
                                                required />
                                        </div>

                                        <div>
                                            <label>จำนวนต้น:</label>
                                            <input v-model.number="tree.count" type="number" placeholder="จำนวน"
                                                required />
                                        </div>

                                    </div>


                                </div>

                            </div>

                            <hr>


                            <!-- ลบต้นไม้ -->
                            <button type="button" @click="removeTree(index)">ลบต้นไม้</button>
                            <!-- เพิ่มต้นไม้ -->
                            <button type="button" @click="addTree">เพิ่มต้นไม้</button>

                            <!-- ยืนยันข้อมูล -->
                            <div>
                                <input v-model="treeData.acceptPolicy" type="checkbox" required />
                                <label>ฉันยอมรับนโยบายและข้อกำหนด</label>
                            </div>

                            <!-- ปุ่มบันทึก -->
                            <button type="submit">บันทึกข้อมูล</button>
                        </form>
                    </div>

                    <div v-if="tab == 22">
                        <h1 class="title">ข้อมูลคาร์บอน</h1>

                        <div class="form-carbon">
                            <div>
                                <!-- <pre>{{ treeData }}</pre> -->
                                <p>จำนวนคาร์บอนที่มี</p>
                            </div>
                            <p>{{ treeData.totalCarbon }}C</p>
                        </div>

                        <p>กำหนดราคาขาย <input v-model="treeData.carbonPrice" class="input-price" type="number" name=""
                                id=""> บาท</p>

                        <div class="form-carbon-sub">
                            <p>ค่าตอบแทนที่ได้รับ</p>
                            <p>0 บาท</p>
                        </div>

                        <div class="btn-corbon">
                            <button @click="tab = 2">แก้ไขข้อมูล</button>
                            <button>ถอน</button>
                            <button @click="saveCarbonPrice(treeData)">บันทึก</button>
                        </div>

                    </div>

                    <div v-if="tab == 3">
                        <div class="form-edit">
                            <h1>ข้อมูลบัญชี</h1>
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData2.bank" type="text" placeholder="ธนาคาร">
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData2.branch" type="text" placeholder="สาขา">
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData2.name" type="text" placeholder="ชื่อบัญชี">
                            <input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                v-model="FormData2.number" type="text" placeholder="เลขบัญชี">
                            <p><input :class="{ 'no-border': !edit, 'editable': edit }" :disabled="!edit"
                                    v-model="FormData2.agree" type="checkbox"> ฉันยินยอมตามนโยบายและข้อกำหนด</p>
                            <button v-if="edit" @click="setData_bank">บันทึกข้อมูล</button>
                            <h1 v-if="!edit">แก้ไข <img @click="edit = !edit" src="../static/pencil2.png" alt=""></h1>
                        </div>
                    </div>
                    <div v-if="tab == 4">
                        <!-- <p>ประวัติการชื้อขาย</p> -->
                        <div class="form-manage">
                            <h1>ประวัติการชื้อขาย </h1>
                            <div class="form-manage2">
                                <div class="list_item">
                                    <img src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png"
                                        alt="">
                                    <div>
                                        <h1>ระบบ</h1>
                                        <p>คุณ อาทิตภูมิ ได้ชื้อคาร์บอนเรียบร้อย</p>
                                    </div>

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
import Nevbar from '~/components/Nevbar.vue'
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2'

export default {
    components: { Nevbar },

    data() {
        return {
            tab: 22,
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

            treeData: {
                area: 0, // จำนวนพื้นที่ (ไร่)
                trees: [
                    {
                        type: "",
                        height: 0,
                        width: 0,
                        count: 0,
                    },
                ],
                acceptPolicy: false,



            },


            price_tree: 0,

            // ค่าคงที่สำหรับสมการ allometric ของต้นไม้แต่ละประเภท
            // a: แทนค่าจุดเริ่มต้นหรือความชันในสมการ (ต้นไม้เริ่มต้นสร้างมวลชีวภาพได้เร็วแค่ไหน)
            // b: แทนอัตราการเปลี่ยนแปลงของมวลชีวภาพ (ต้นไม้เพิ่มมวลชีวภาพได้เร็วขึ้นตามขนาดเส้นผ่านศูนย์กลาง)
            treeConstantslist: {
                generic: { a: 0.05, b: 2.5 },
                AAA: { a: 0.08, b: 2.6 },
                BBB: { a: 0.06, b: 2.4 },
            }
        };
    },

    mounted() {
        // ติดตามสถานะการล็อกอินแบบเรียลไทม์
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            if (user) {

                this.getUserData(); // ดึงข้อมูลผู้ใช้เมื่อเข้าสู่ระบบ
                this.getData_bank();
                this.gettrees(user.uid);

            } else {
                console.log("User is logged out");
            }
        });
    },

    methods: {
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
        },

        // เพิ่มข้อมูลต้นไม้ใหม่
        addTree() {
            if (!Array.isArray(this.treeData.trees)) {
                this.treeData.trees = []; // กำหนดค่าเริ่มต้นให้เป็นอาร์เรย์
            }
            this.treeData.trees.push({
                type: "",
                height: 0,
                width: 0,
                count: 0,
            });
        },

        // ลบข้อมูลต้นไม้
        removeTree(index) {
            this.treeData.trees.splice(index, 1);
        },
        // บันทึกข้อมูล
        saveData() {
            if (!this.treeData.acceptPolicy) {
                alert("โปรดยอมรับนโยบายและข้อกำหนดก่อนบันทึกข้อมูล");
                return;
            }

            // คุณสามารถเชื่อมต่อ API หรือบันทึกข้อมูลได้ที่นี่
            console.log("บันทึกข้อมูลสำเร็จ:", this.treeData);


            const result = this.calculateTotalCarbon(this.treeData);
            console.log(result);


            firebase.database().ref('trees/' + this.user.uid).set(
                {
                    ...this.treeData,
                    totalCarbon: result.totalCO2,
                    status: "รอการตรวจสอบ"
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสําเร็จ',
                showConfirmButton: false,
                timer: 1500
            })

            this.tab = 22;

        },

        gettrees(uid) {
            firebase.database().ref('trees/' + uid).on('value', (snapshot) => {

                const data = snapshot.val();

                // console.log(data)

                this.treeData = {
                    ...data,
                    uid: uid
                } || {
                    area: 0,
                    trees: [
                        {
                            type: "",
                            height: 0,
                            width: 0,
                            count: 0,
                        },
                    ],
                    acceptPolicy: false,



                };

            })
        },

        saveCarbonPrice(treeData) {
            console.log(treeData);
            firebase.database().ref('trees/' + this.user.uid).update(
                {
                    ...treeData,
                    status: "รอการตรวจสอบ"

                }
            )

            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสําเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        },

        calculateTotalCarbon(data) {

            // ตรวจสอบว่ามี data.trees หรือไม่
            if (!data || !Array.isArray(data.trees)) {
                console.error('ข้อมูล trees ไม่ถูกต้อง');
                return;
            }

            const treeConstants = this.treeConstantslist;



            function calculateCarbon(height, diameter, count, treeType) {
                const constants = treeConstants[treeType] || treeConstants.generic;
                const biomass = constants.a * Math.pow(diameter, constants.b);
                const carbonStored = biomass * 0.5;
                const co2StoredPerTree = carbonStored * 3.67;
                return co2StoredPerTree * count;
            }

            let totalCO2 = 0;
            const details = [];

            data.trees.forEach((tree) => {
                const height = tree.height;
                const diameter = tree.width / 2;
                const count = tree.count;
                const type = tree.type;

                const co2 = calculateCarbon(height, diameter, count, type);
                totalCO2 += co2;

                details.push({
                    type,
                    height,
                    diameter,
                    count,
                    co2: co2.toFixed(2),
                });
            });

            return {
                totalCO2: totalCO2.toFixed(2),
                details,
            };




        }
    }
}
</script>


<style scoped>
.input-price {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #F2F2F2;
}

.form-carbon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.form-carbon>div>p {
    margin: 0;
    font-size: 20px;
}

.form-carbon>div>p>span {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #2EBBF1;
}

.form-carbon>p {

    font-size: 30px;
    font-weight: bold;
    color: #2EBBF1;

}

.form-carbon-sub {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* background-color: #0068ad; */
}

.btn-corbon {
    display: flex;
    flex-direction: row;
}

.btn-corbon>button {
    margin: 0 10px;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.btn-corbon>button:hover {
    background-color: #007A91;
}

.form-carbon-sub>p {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
}

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

.form-tree {
    /* background-color: #00A1B4; */
}

.form-tree>button {
    height: 35px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.tree-details {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 20px;
}

.form-slot {
    overflow-y: scroll;
    height: 250px;
}

.form-slot>div>input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;
}

.tree-size {
    display: flex;
    flex-direction: column;

}

.tree-size>input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;
}

.tree-details>div>input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;

}

.title {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #2EBBF1;
    padding-bottom: 10px;
}

.img1 {
    position: absolute;
    top: 0;
    width: 200px;
    height: 200px;
    z-index: 1;
}

@media (max-width: 768px) {
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

.signup-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.signup-input,
.input-field {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;
}

.signup-btn,
.btn-primary {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.signup-google-btn {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-google-btn img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
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

.small-text {
    font-size: 10px;
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

/* ลบเส้นกรอบเมื่อไม่ได้แก้ไข */
.no-border {
    border: none !important;
    outline: none;
    background-color: transparent;
    /* ทำให้พื้นหลังโปร่งใส */
    cursor: default;
    /* เปลี่ยนเคอร์เซอร์เป็นค่าเริ่มต้น */
}

/* เพิ่มกรอบเมื่ออยู่ในโหมดแก้ไข */
.editable {
    border: 1px solid #ccc;
    outline: none;
    padding: 5px;
    cursor: text;
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