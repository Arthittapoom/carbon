<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.data-table th {
  background-color: #2c97af;
  color: white;
  cursor: pointer;
  text-align: center;
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

button:hover {
  opacity: 0.8;
}

/* ปุ่มที่มีสีต่างกัน */
button.sell {
  background: #28a745;
  color: white;
}

button.document {
  background: #ffc107;
  color: black;
}

button.approve {
  background: #17a2b8;
  color: white;
}

button.details {
  background: #6c757d;
  color: white;
}

button.close {
  background: red;
  color: white;
}

/* โมดอล (Popup) */
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

<template>
  <div class="container">
    <h1 class="title">สถานะคำขอรับรองคาร์บอนเครดิต</h1>

    <input v-model="searchQuery" class="search-input" placeholder="🔍 ค้นหาโครงการ..." />

    <table class="data-table">
      <thead>
        <tr>
          <th @click="sortBy('projectNameTh')">ชื่อโครงการ</th>
          <th>ประเภทโครงการ</th>
          <th @click="sortBy('contactName')">ชื่อผู้ประสานงาน</th>
          <th>สถานะ</th>
          <th @click="sortBy('date_submitForm')">เวลาส่ง</th>
          <th>รายละเอียด</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="form in filteredForms" :key="form.id">
          <td>{{ form.projectNameTh }}</td>
          <td>{{ form.projectTypes.join(', ') }}</td>
          <td>{{ form.contactName }}</td>
          <td>
            {{ form.status === '1' ? '⏳ รอตรวจสอบ' : form.status === '2' ? '✅ ยืนยันแล้ว' : '💰 เสนอราคาแล้ว' }}

            <button v-if="form.status === '2'" class="sell" @click="sell(form)">เสนอขาย</button>
            <button v-if="form.status === '2' || form.status === '3'" class="document"
              @click="showDocuments(form.files)">📄 ดูเอกสาร</button>
            <button v-if="form.status === '3'" class="approve" @click="approveOffer(form)">✔️ อนุมัติราคา</button>
          </td>
          <td>{{ new Date(form.date_submitForm).toLocaleString() }}</td>
          <td>
            <button class="details" @click="showDetails(form)">👁️ ดูรายละเอียด</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedForm" class="modal">
      <div class="modal-content">
        <h2>📜 รายละเอียดโครงการ</h2>
        <p><strong>ชื่อโครงการภาษาอังกฤษ:</strong> {{ selectedForm.projectNameEn }}</p>
        <p><strong>ชื่อโครงการภาษาไทย:</strong> {{ selectedForm.projectNameTh }}</p>
        <p><strong>ประเภทโครงการ:</strong> {{ selectedForm.projectTypes.join(', ') }}</p>
        <p><strong>อื่น ๆ:</strong> {{ selectedForm.otherProjectType || '-' }}</p>
        <h3>👨‍💼 รายละเอียดผู้พัฒนาโครงการ</h3>
        <p><strong>ชื่อผู้ประสานงาน:</strong> {{ selectedForm.contactName }}</p>
        <p><strong>ที่อยู่:</strong> {{ selectedForm.address }}</p>
        <p><strong>โทรศัพท์:</strong> {{ selectedForm.phone }}</p>
        <p><strong>โทรสาร:</strong> {{ selectedForm.fax || '-' }}</p>
        <p><strong>อีเมล:</strong> {{ selectedForm.email }}</p>
        <button class="close" @click="selectedForm = null">❌ ปิด</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js';
import Swal from 'sweetalert2';
export default {
  layout: 'menu-profile',
  data() {
    return {
      formList: [],
      searchQuery: '',
      sortKey: '',
      selectedForm: null,
      uid: ''
    };
  },
  computed: {
    filteredForms() {
      return this.formList.filter(form =>
        form.projectNameTh.includes(this.searchQuery) ||
        form.contactName.includes(this.searchQuery) ||
        form.email.includes(this.searchQuery)
      ).sort((a, b) => {
        if (!this.sortKey) return 0;
        return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
      });
    }
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

    this.fetchData(this.uid);
  },
  methods: {
    sell(form) {

      //    Swal มีช่องใส่ข้อมูล ราคา
      Swal.fire({
        title: 'กรุณากรอกราคา',
        input: 'number',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        showLoaderOnConfirm: true,
        preConfirm: (price) => {
          if (price < 0) {
            Swal.showValidationMessage('กรุณากรอกราคาให้ถูกต้อง');
          }
          return { price };
        }

      }).then((result) => {
        if (result.isConfirmed) {
          // console.log(result.value.price);
          // console.log(form.id);

          firebase.database().ref(`T-VER-Form/${form.id}`).update({ status: 3, price: result.value.price });
        }
      })

    },

    showDocuments(files) {
      if (files) {
        for (const key in files) {
          if (files.hasOwnProperty(key)) {
            const file = files[key];

            const fileData = file.fileData;
            const fileName = file.fileName;
            const uploadDate = file.uploadDate;

            // แสดงข้อมูลเกี่ยวกับไฟล์
            console.log(`File Name: ${fileName}`);
            console.log(`Upload Date: ${uploadDate}`);

            // แปลง Base64 เป็น Blob
            const byteCharacters = atob(fileData.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // ตรวจสอบประเภทของไฟล์และตั้งค่า type ของ Blob
            let mimeType = '';
            const fileExtension = fileName.split('.').pop().toLowerCase();

            switch (fileExtension) {
              case 'pdf':
                mimeType = 'application/pdf';
                break;
              case 'txt':
                mimeType = 'text/plain';
                break;
              case 'png':
              case 'jpg':
              case 'jpeg':
              case 'gif':
                mimeType = 'image/' + fileExtension;
                break;
              case 'xlsx':
              case 'xls':
                mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
              case 'docx':
                mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
              default:
                mimeType = 'application/octet-stream'; // Default MIME type
                break;
            }

            const blob = new Blob([byteArray], { type: mimeType });

            // สร้างลิงก์ดาวน์โหลด
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่พบไฟล์',
        })
      }
    },
    rejectForm(form) {

      Swal.fire({
        // กำลังโหลกเอกสาร
        title: 'กําลังโหลกเอกสาร',
        icon: 'info',
        showConfirmButton: false,
      })

    },
    fetchData(uid) {
      // ดึงข้อมูลจาก Firebase Realtime Database
      firebase.database().ref('T-VER-Form').on('value', snapshot => {
        const data = snapshot.val();

        // แปลงข้อมูลที่ดึงมาเป็นอาร์เรย์ของแบบฟอร์ม
        this.formList = Object.entries(data || {}).map(([id, formData]) => ({
          id,
          ...formData
        }));

        // กรองข้อมูลให้แสดงเฉพาะแบบฟอร์มที่มี uid ตรงกับค่าที่ส่งเข้ามา
        if (uid) {
          this.formList = this.formList.filter(form => form.uid === uid);
        }
      });
    },

    sortBy(key) {
      this.sortKey = key;
    },
    showDetails(form) {
      this.selectedForm = form;
    }
  }
};
</script>