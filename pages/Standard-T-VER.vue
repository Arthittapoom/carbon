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
                <input class="form-checkbox" type="checkbox" v-model="form.projectTypes" :value="option" />
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
            <textarea class="form-textarea" v-model="form.address" id="address" rows="4" cols="50"></textarea>
        </div>

        <!-- แมพ ปักหมุด -->
        <div id="map" style="height: 500px;">
            <client-only>
                <l-map :zoom="zoom" :center="center" @click="onMapClick">
                    <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution"></l-tile-layer>
                    <l-marker v-for="(position, index) in markerPositions" :key="index" :lat-lng="position"></l-marker>
                </l-map>
            </client-only>
        </div>
        <div>
            <p>ตำแหน่งที่คลิก: {{ markerPosition }}</p>
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

        <label>หลักฐานประกอบสำหรับแนบไฟล์</label>

        <!-- รายงานการติดตาม -->
        <div class="form-row-v2">
            <label>รายงานการติดตามประเมินผล (Monitoring Report):</label>
            <div>
                <button class="btn btn-success" @click="downloadFile('monitoringFiles')">ดาวน์โหลดตัวอย่าง</button>
            </div>
            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('m1')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('m2')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('m3')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('m4')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

        </div>

        <!-- รายงานการตรวจสอบ -->
        <div class="form-row-v2">
            <label>รายงานการตรวจสอบความใช้ได้โครงการ (Verification Report):</label>
            <div>
                <button class="btn btn-success" @click="downloadFile('verificationFiles')">ดาวน์โหลดตัวอย่าง</button>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('v1')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('v2')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('v3')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('v4')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

        </div>

        <!-- อื่น ๆ -->
        <div class="form-row-v2">
            <label>อื่น ๆ (ถ้ามี):</label>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('other1')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('other2')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('other3')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

            <div class="pt-2">
                <input type="file" @change="handleFileChange" />
                <button class="btn btn-warning" @click="uploadFile('other4')">Upload</button>
                <p v-if="uploading">Uploading...</p>
            </div>

        </div>

        <div class="form-row-button">
            <button @click="cancelForm" class="btn-cancel">ยกเลิก</button>
            <button @click="submitForm" class="btn-submit">ส่งข้อมูล</button>
        </div>
    </div>
</template>

<style scoped>
.form-main {
    width: 100%;
}
.form-textarea {
    width: 100%;    
    height: 100px;
    resize: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 8px;
}

.form-checkbox {
    margin-top: 10px;    
    margin-bottom: 10px;
    width: 20px;
    height: 20px;
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


.form-row-checkbox-group > label {
    display: block;
    font-weight: bold
}

.form-row-checkbox p {
    padding-left: 10px;
    margin: 0;
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

<script>
import firebase from 'firebase/compat/app';
import Swal from 'sweetalert2';

export default {
    layout: 'menu-profile',
    data() {
        return {
            zoom: 6, // ระดับการซูม
            center: [13.7563, 100.5018], // พิกัดเริ่มต้น (กรุงเทพฯ)
            tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // URL สำหรับพื้นหลังแผนที่
            tileLayerAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // Attribution สำหรับ OpenStreetMap
            markerPosition: [13.7563, 100.5018], // ตำแหน่งของหมุดล่าสุด
            markerPositions: [[13.7563, 100.5018]], // ตำแหน่งหมุดทั้งหมดที่เก็บไว้
            uploading: false,
            
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
                monitoringFiles: [],
                verificationFiles: [],
                otherFiles: [],
                markerPosition: [13.7563, 100.5018],
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
                // console.log("User Logged In:", this.uid);
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

        onMapClick(event) {
            // เมื่อคลิกที่แผนที่ จะทำการอัพเดตตำแหน่งของหมุด
            const latLng = event.latlng;

            // กำหนดให้เก็บตำแหน่งเพียงตำแหน่งเดียว
            this.markerPosition = [latLng.lat, latLng.lng];

            // ลบหมุดเก่าก่อน (หากมี) และเพิ่มหมุดใหม่
            this.markerPositions = [this.markerPosition];

            // อัพเดตค่าของตำแหน่งที่เลือก
            this.form.markerPosition = this.markerPosition;
        },

        handleFileChange(event) {
            this.file = event.target.files[0]
        },

        async fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        },

        async uploadFile(fileType) {
            if (!this.file) return;

            // สร้างตัวแปรที่ใช้เก็บไฟล์ตามประเภท
            let fileArray;
            switch (fileType) {
                case 'm1':
                case 'm2':
                case 'm3':
                case 'm4':
                    fileArray = this.form.monitoringFiles;
                    break;
                case 'v1':
                case 'v2':
                case 'v3':
                case 'v4':
                    fileArray = this.form.verificationFiles;
                    break;
                case 'other1':
                case 'other2':
                case 'other3':
                case 'other4':
                    fileArray = this.form.otherFiles;
                    break;
                default:
                    console.error('Invalid file type:', fileType);
                    return;
            }

            // เพิ่มไฟล์เข้าไปในอาเรย์ที่เหมาะสม
            fileArray.push(this.file);

            this.uploading = true;
            try {
                // แปลงไฟล์เป็น Base64
                const base64File = await this.fileToBase64(this.file);

                // บันทึกไฟล์ไปยัง Firebase
                const dbRef = firebase.database().ref('files');
                const newFileRef = dbRef.push();
                await newFileRef.set({
                    fileName: this.file.name,
                    fileData: base64File,
                    uploadDate: new Date().toLocaleString()  // เก็บวันที่อัพโหลด
                });



                // หลังจากอัพโหลดแล้วให้เก็บ uid ของไฟล์ที่อัพโหลดไว้ใน form

                //แปลง m1 v1 other1 เป็น monitoringFiles1 verificationFiles1 otherFiles1

                const fileTypeMapping = {
                    'm1': 'monitoringFiles1',
                    'm2': 'monitoringFiles2',
                    'm3': 'monitoringFiles3',
                    'm4': 'monitoringFiles4',
                    'v1': 'verificationFiles1',
                    'v2': 'verificationFiles2',
                    'v3': 'verificationFiles3',
                    'v4': 'verificationFiles4',
                    'other1': 'otherFiles1',
                    'other2': 'otherFiles2',
                    'other3': 'otherFiles3',
                    'other4': 'otherFiles4'
                };

                fileType = fileTypeMapping[fileType] || fileType;



                this.form[fileType] = newFileRef.key;




            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                this.uploading = false;
            }
        },

        downloadFile(fileType) {
            const fileUrls = {
                monitoringFiles: 'https://ghgreduction.tgo.or.th/th/download-tver/download/8223/333/32.html',
                verificationFiles: 'https://ghgreduction.tgo.or.th/th/download-tver/download/8224/333/32.html',
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
                uid: this.uid,
            };

            firebase.database().ref('T-VER-Form').push(payload).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.cancelForm();

                this.$router.push('/Standard-T-VER-status');
            }).catch((error) => {
                console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                    text: error.message,
                });
            });
        },
    },
};
</script>