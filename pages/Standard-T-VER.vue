<template>
    <div class="container">
        <h1>แบบฟอร์มขอรับรองคาร์บอนเครดิต Standard T-VER</h1>

        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label>ชื่อโครงการภาษาอังกฤษ*</label>
                <input type="text" v-model="form.projectNameEn" required />
            </div>

            <div class="form-group">
                <label>ชื่อโครงการภาษาไทย*</label>
                <input type="text" v-model="form.projectNameTh" required />
            </div>

            <div class="form-group">
                <label>ประเภทโครงการ*</label>
                <select v-model="form.projectType" required>
                    <option value="">เลือกประเภท</option>
                    <option value="พลังงานทดแทน">พลังงานทดแทน</option>
                    <option value="ป่าไม้และพื้นที่สีเขียว">ป่าไม้และพื้นที่สีเขียว</option>
                    <option value="การจัดการของเสีย">การจัดการของเสีย</option>
                    <option value="อื่นๆ">อื่น ๆ</option>
                </select>
            </div>

            <div class="form-group">
                <label>ชื่อผู้ประสานงาน</label>
                <input type="text" v-model="form.contactName" />
            </div>

            <div class="form-group">
                <label>ที่อยู่</label>
                <textarea v-model="form.address"></textarea>
            </div>

            <div class="form-group">
                <label>โทรศัพท์</label>
                <input type="text" v-model="form.phone" />
            </div>

            <div class="form-group">
                <label>อีเมล</label>
                <input type="email" v-model="form.email" required />
            </div>

            <div class="form-group">
                <label>เอกสารแนบ (แนบไฟล์สูงสุด 4 ไฟล์, ขนาดสูงสุด 64MB)</label>
                <input type="file" multiple @change="handleFileUpload" />
                <p v-if="files.length">ไฟล์ที่เลือก: {{ files.map(f => f.name).join(", ") }}</p>
            </div>

            <button type="submit">ส่งแบบฟอร์ม</button>
        </form>
    </div>
</template>

<script>
export default {
    layout: 'menu-profile',
    data() {
        return {
            form: {
                projectNameEn: "",
                projectNameTh: "",
                projectType: "",
                contactName: "",
                address: "",
                phone: "",
                email: ""
            },
            files: []
        };
    },
    methods: {
        handleFileUpload(event) {
            const selectedFiles = Array.from(event.target.files);
            if (selectedFiles.length + this.files.length > 4) {
                alert("อัปโหลดได้สูงสุด 4 ไฟล์");
                return;
            }
            this.files = [...this.files, ...selectedFiles];
        },
        submitForm() {
            if (!this.form.projectNameEn || !this.form.projectNameTh || !this.form.projectType || !this.form.email) {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }
            alert("ส่งข้อมูลเรียบร้อย!");
            console.log(this.form, this.files);
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 10px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #218838;
}
</style>
