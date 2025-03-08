<template>
  <div class="container">
    <h1 class="title">สถานะคำขอรับรองคาร์บอนเครดิต</h1>

    <input v-model="searchQuery" class="search-input" placeholder="ค้นหาโครงการ..." />

    <table class="data-table">
      <thead>
        <tr>
          <th @click="sortBy('projectNameTh')">ชื่อโครงการ</th>
          <th>ประเภทโครงการ</th>
          <th @click="sortBy('contactName')">ชื่อผู้ประสานงาน</th>
          <!-- <th>โทรศัพท์</th> -->
          <!-- <th>อีเมล</th> -->
          <th>สถานะ</th>
          <th @click="sortBy('date_submitForm')">เวลาส่ง</th>
          <th>รายละเอียด</th>
          <th>ไฟล์เอกสาร</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="form in filteredForms" :key="form.id">
          <td>{{ form.projectNameTh }}</td>
          <td>{{ form.projectTypes.join(', ') }}</td>
          <td>{{ form.contactName }}</td>
          <!-- <td>{{ form.phone }}</td> -->
          <!-- <td>{{ form.email }}</td> -->
          <td>
            <p>{{ form.status === '1' ? 'รอตรวจสอบ' : 'ยืนยันแล้ว' }}</p>
            <!-- <button v-if="form.status === '1'" @click="approveForm(form)">อนุมัติ</button> -->
            <input v-if="form.status === '1'" @change="handleFileChange" type="file">
            <button class="mt-2" v-if="form.status === '1' && !form.files" @click="uploadFile(form)">Upload</button>
            <hr>

            <!-- รอแก้ -->
            <div v-if="form.status === '1'">
              <p>จำนวน carbon(ตัน) :</p>
              <input v-model="form.carbon" type="number">
              <p>จำนวนระยะเวลา(ปี) :</p>
              <input v-model="form.year" type="number">
            </div>
            <hr>
            <!-- <pre>{{ form }}</pre> -->
            <button v-if="form.status === '1'" @click="approveForm(form)">ยืนยัน</button>
          </td>
          <td>{{ new Date(form.date_submitForm).toLocaleString() }}</td>
          <td>
            <button @click="showDetails(form)">ดูรายละเอียด</button>
          </td>
          <td>
            <!-- <pre>{{ form }}</pre> -->
            <a v-if="form.monitoringFiles1" class="file-link" @click="showFiles(form.monitoringFiles1)">1
              รายงานการติดตามประเมินผล</a>
            <a v-if="form.monitoringFiles2" class="file-link" @click="showFiles(form.monitoringFiles2)">2
              รายงานการติดตามประเมินผล</a>
            <a v-if="form.monitoringFiles3" class="file-link" @click="showFiles(form.monitoringFiles3)">3
              รายงานการติดตามประเมินผล</a>
            <a v-if="form.monitoringFiles4" class="file-link" @click="showFiles(form.monitoringFiles4)">4
              รายงานการติดตามประเมินผล</a>
            <hr>
            <a v-if="form.verificationFiles1" class="file-link" @click="showFiles(form.verificationFiles1)">1
              รายงานการตรวจสอบความใช้ได้โครงการ</a>
            <a v-if="form.verificationFiles2" class="file-link" @click="showFiles(form.verificationFiles2)">2
              รายงานการตรวจสอบความใช้ได้โครงการ</a>
            <a v-if="form.verificationFiles3" class="file-link" @click="showFiles(form.verificationFiles3)">3
              รายงานการตรวจสอบความใช้ได้โครงการ</a>
            <a v-if="form.verificationFiles4" class="file-link" @click="showFiles(form.verificationFiles4)">4
              รายงานการตรวจสอบความใช้ได้โครงการ</a>
            <hr>
            <a v-if="form.otherFiles1" class="file-link" @click="showFiles(form.otherFiles1)">1 อื่น ๆ</a>
            <a v-if="form.otherFiles2" class="file-link" @click="showFiles(form.otherFiles2)">2 อื่น ๆ</a>
            <a v-if="form.otherFiles3" class="file-link" @click="showFiles(form.otherFiles3)">3 อื่น ๆ</a>
            <a v-if="form.otherFiles4" class="file-link" @click="showFiles(form.otherFiles4)">4 อื่น ๆ</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedForm" class="modal">
      <div class="modal-content">
        <h2>รายละเอียดโครงการ</h2>
        <p><strong>ชื่อโครงการภาษาอังกฤษ:</strong> {{ selectedForm.projectNameEn }}</p>
        <p><strong>ชื่อโครงการภาษาไทย:</strong> {{ selectedForm.projectNameTh }}</p>
        <p><strong>ประเภทโครงการ:</strong> {{ selectedForm.projectTypes.join(', ') }}</p>
        <p><strong>อื่น ๆ:</strong> {{ selectedForm.otherProjectType || '-' }}</p>
        <h3>รายละเอียดผู้พัฒนาโครงการ</h3>
        <p><strong>ชื่อผู้ประสานงาน:</strong> {{ selectedForm.contactName }}</p>
        <p><strong>ที่อยู่:</strong> {{ selectedForm.address }}</p>
        <p><strong>โทรศัพท์:</strong> {{ selectedForm.phone }}</p>
        <p><strong>โทรสาร:</strong> {{ selectedForm.fax || '-' }}</p>
        <p><strong>อีเมล:</strong> {{ selectedForm.email }}</p>
        <button @click="selectedForm = null">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js';
import Swal from 'sweetalert2';
export default {
  layout: 'menu',
  data() {
    return {
      formList: [],
      searchQuery: '',
      sortKey: '',
      sortOrders: {},
      selectedForm: null,
      uid: '',
      file: null,
      uploading: false
    };
  },
  computed: {
    filteredForms() {
      let sortedForms = [...this.formList].filter(form =>
        form.projectNameTh.includes(this.searchQuery) ||
        form.contactName.includes(this.searchQuery) ||
        form.email.includes(this.searchQuery)
      );

      if (this.sortKey) {
        sortedForms.sort((a, b) => {
          const order = this.sortOrders[this.sortKey] || 1;
          return (a[this.sortKey] > b[this.sortKey] ? 1 : -1) * order;
        });
      }
      return sortedForms;
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

    this.fetchData();
  },
  methods: {

    showFiles(idfile) {
      if (!idfile) {
        console.error("Invalid file ID");
        return;
      }

      firebase.database().ref(`files/${idfile}`).once('value', snapshot => {
        const data = snapshot.val();
        if (!data) {
          console.error("No data found for the file ID");
          return;
        }

        // console.log("File Data:", data);

        // Convert Base64 to Blob and trigger download
        const byteCharacters = atob(data.fileData.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = data.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },

    handleFileChange(event) {
      this.file = event.target.files[0]
    },

    async uploadFile(form) {
      if (!this.file) return;

      this.uploading = true;
      try {
        // แปลงไฟล์เป็น Base64
        const base64File = await this.fileToBase64(this.file);

        // บันทึกไฟล์ไปยัง Firebase
        const dbRef = firebase.database().ref('T-VER-Form').child(form.id).child('files');
        const newFileRef = dbRef.push();
        await newFileRef.set({
          fileName: this.file.name,
          fileData: base64File,
          uploadDate: new Date().toLocaleString()  // เก็บวันที่อัพโหลด
        });

      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        this.uploading = false;
      }
    },

    async fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },

    fetchData() {
      firebase.database().ref('T-VER-Form').on('value', snapshot => {
        const data = snapshot.val();
        this.formList = Object.entries(data || {}).map(([id, formData]) => ({ id, ...formData }));
      });
    },

    approveForm(form) {
      if (confirm('คุณต้องการอนุมัติโครงการนี้หรือไม่?')) {
        // Update the status in Firebase
        // console.log(form);
        firebase.database().ref(`T-VER-Form/${form.id}`).update({ status: '2' });
        alert('อนุมัติโครงการสําเร็จ');
      }
    },
    sortBy(key) {
      // สลับค่าการเรียง (Ascending/Descending)
      this.sortOrders[key] = this.sortOrders[key] === 1 ? -1 : 1;
      this.sortKey = key;
    },
    showDetails(form) {
      this.selectedForm = form;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.data-table th {
  background-color: #2fa4b1;
  color: white;
  cursor: pointer;
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  padding: 8px 12px;
  border: none;
  background: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #218838;
}

.file-link {
  display: block;
  color: #007bff;
  text-decoration: none;
  margin-bottom: 5px;
}

.file-link:hover {
  text-decoration: underline;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 50%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
