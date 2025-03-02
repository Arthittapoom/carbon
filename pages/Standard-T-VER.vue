<template>
    <div class="form-main">
        <h1>แบบฟอร์มขอรับรองคาร์บอนเครดิต Standard T-VER</h1>
        <p>รายละเอียดโครงการ</p>

        <!-- ชื่อโครงการภาษาอังกฤษ -->
        <div class="form-row">
            <label for="project_name_en">ชื่อโครงการภาษาอังกฤษ *</label>
            <input type="text" v-model="form.projectNameEn" id="project_name_en" required />
        </div>

        <!-- ชื่อโครงการภาษาไทย -->
        <div class="form-row">
            <label for="project_name_th">ชื่อโครงการภาษาไทย *</label>
            <input type="text" v-model="form.projectNameTh" id="project_name_th" required />
        </div>

        <!-- ประเภทโครงการ -->
        <div class="form-row-checkbox-group">
            <label>ประเภทโครงการ</label>
            <div class="form-row-checkbox" v-for="(option, index) in projectTypes" :key="index">
                <input type="checkbox" v-model="form.projectTypes" :value="option" />
                <p>{{ option }}</p>
            </div>
        </div>

        <!-- อื่น ๆ -->
        <div class="form-row">
            <label for="other_project_type">อื่น ๆ (ถ้ามี)</label>
            <input type="text" v-model="form.otherProjectType" id="other_project_type" />
        </div>

        <p>รายละเอียดผู้พัฒนาโครงการ</p>

        <!-- ผู้ประสานงาน -->
        <div class="form-row">
            <label for="contact_name">ชื่อผู้ประสานงาน :</label>
            <input type="text" v-model="form.contactName" id="contact_name" />
        </div>

        <!-- ที่อยู่ -->
        <div class="form-row">
            <label for="address">ที่อยู่ :</label>
            <input type="text" v-model="form.address" id="address" />
        </div>

        <!-- โทรศัพท์ -->
        <div class="form-row">
            <label for="phone">โทรศัพท์ :</label>
            <input type="tel" v-model="form.phone" id="phone" />
        </div>

        <!-- โทรสาร -->
        <div class="form-row">
            <label for="fax">โทรสาร :</label>
            <input type="text" v-model="form.fax" id="fax" />
        </div>

        <!-- อีเมล -->
        <div class="form-row">
            <label for="email">อีเมล :</label>
            <input type="email" v-model="form.email" id="email" />
        </div>

        <p>หลักฐานประกอบสำหรับแนบไฟล์</p>

        <!-- รายงานการติดตาม -->
        <div class="form-row-v2">
            <label>รายงานการติดตามประเมินผล (Monitoring Report):</label>
            <div v-for="(file, index) in form.monitoringFiles" :key="'monitoring-' + index" class="file-upload">
                <input type="file" @change="handleFileUpload($event, 'monitoringFiles', index)" />
                <span v-if="file">ไฟล์ที่อัพโหลด: {{ file.name }}</span>
            </div>
            <button @click="addFile('monitoringFiles')">เพิ่มไฟล์</button>
            <button @click="downloadFile('monitoringFiles')">ดาวน์โหลดตัวอย่าง</button>
        </div>

        <!-- รายงานการตรวจสอบ -->
        <div class="form-row-v2">
            <label>รายงานการตรวจสอบความใช้ได้โครงการ (Verification Report):</label>
            <div v-for="(file, index) in form.verificationFiles" :key="'verification-' + index" class="file-upload">
                <input type="file" @change="handleFileUpload($event, 'verificationFiles', index)" />
                <span v-if="file">ไฟล์ที่อัพโหลด: {{ file.name }}</span>
            </div>
            <button @click="addFile('verificationFiles')">เพิ่มไฟล์</button>
            <button @click="downloadFile('verificationFiles')">ดาวน์โหลดตัวอย่าง</button>
        </div>

        <!-- อื่น ๆ -->
        <div class="form-row-v2">
            <label>อื่น ๆ (ถ้ามี):</label>
            <div v-for="(file, index) in form.otherFiles" :key="'other-' + index" class="file-upload">
                <input type="file" @change="handleFileUpload($event, 'otherFiles', index)" />
                <span v-if="file">ไฟล์ที่อัพโหลด: {{ file.name }}</span>
            </div>
            <button @click="addFile('otherFiles')">เพิ่มไฟล์</button>
        </div>

        <div class="form-row-button">
            <button @click="cancelForm" class="btn-cancel">ยกเลิก</button>
            <button @click="submitForm" class="btn-submit">ส่งข้อมูล</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/compat/app';
import Swal from 'sweetalert2';
export default {
    layout: 'menu-profile',
    data() {
        return {
            form: {
                projectNameEn: '',
                projectNameTh: '',
                projectTypes: [],
                otherProjectType: '',
                contactName: '',
                address: '',
                phone: '',
                fax: '',
                email: '',
                monitoringFiles: [],   // รายงานการติดตาม
                verificationFiles: [], // รายงานการตรวจสอบ
                otherFiles: [],        // อื่น ๆ
            },
            projectTypes: [
                'การเพิ่มประสิทธิภาพพลังงาน',
                'การจัดการในภาคขนส่ง',
                'พลังงานทดแทน',
                'ป่าไม้และพื้นที่สีเขียว',
                'การจัดการของเสีย',
                'การเกษตร',
            ],

            uid: '',
        };
    },
    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;
                console.log("User Logged In:", this.uid);
            } else {
                alert("กรุณาเข้าสู่ระบบก่อนส่งข้อมูล");
            }
        });
    },
    methods: {
        handleFileUpload(event, fileType, index) {
            const file = event.target.files[0];
            if (file) {
                const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']; // ประเภทไฟล์ที่อนุญาต
                if (!allowedTypes.includes(file.type)) {
                    alert('โปรดเลือกไฟล์ PDF หรือภาพ JPEG/PNG เท่านั้น');
                    return;
                }
                this.form[fileType].splice(index, 1, file);
            }
        },
        addFile(fileType) {
            this.form[fileType].push(null);  // เพิ่มช่องไฟล์ใหม่
        },
        downloadFile(fileType) {
            const fileUrls = {
                monitoringFiles: 'https://ghgreduction.tgo.or.th/th/download-tver/download/8223/333/32.html',
                verificationFiles: 'https://ghgreduction.tgo.or.th/th/download-tver/download/8224/333/32.html'
            };
            if (fileUrls[fileType]) {
                window.location.href = fileUrls[fileType];
            }
        },
        cancelForm() {
            this.form = {
                projectNameEn: '',
                projectNameTh: '',
                projectTypes: [],
                otherProjectType: '',
                contactName: '',
                address: '',
                phone: '',
                fax: '',
                email: '',
                monitoringFiles: [],
                verificationFiles: [],
                otherFiles: [],
            };
        },
        submitForm() {
            // ตรวจสอบว่าข้อมูลครบถ้วน
            if (!this.form.projectNameEn || !this.form.projectNameTh || !this.form.contactName || !this.form.email) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }

            if (!this.uid) {
                alert('ไม่พบ UID ของผู้ใช้ กรุณาล็อกอินใหม่');
                return;
            }

            const payload = {
                ...this.form,
                status: '1',
                date_submitForm: new Date().toISOString(),
                uid: this.uid
            };

            // ส่งข้อมูลไปยัง Firebase Realtime Database
            firebase.database().ref('T-VER-Form').push(payload).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });

                // เคลียร์ฟอร์ม
                this.cancelForm();

            }).catch((error) => {
                console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                    text: error.message
                });
            });
        },
    }

};
</script>

<style scoped>
.form-main {
    width: 100%;
}

.form-row-v2 {
    padding-top: 10px;
}

.form-row-v2>button {
    background-color: #a06500;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

h1 {
    text-align: center;
}

.form-row {
    margin-bottom: 15px;
}

.form-row label {
    display: block;
    font-weight: bold;
}

.form-row input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.form-row-checkbox {
    display: flex;
    align-items: center;
}

.form-row-checkbox p {
    margin-left: 8px;
}

.file-upload {
    margin-top: 8px;
}

.form-row-button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.btn-cancel,
.btn-submit {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-cancel {
    background-color: #ccc;
}

.btn-submit {
    background-color: #28a745;
    color: white;
}
</style>