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
          </tr>
        </thead>
        <tbody>
          <tr v-for="form in filteredForms" :key="form.id">
            <td>{{ form.projectNameTh }}</td>
            <td>{{ form.projectTypes.join(', ') }}</td>
            <td>{{ form.contactName }}</td>
            <!-- <td>{{ form.phone }}</td> -->
            <!-- <td>{{ form.email }}</td> -->
            <td>{{ form.status === '1' ? 'รอตรวจสอบ' : 'ยืนยันแล้ว' }} 
                <button v-if="form.status === '1'" @click="approveForm(form)">อนุมัติ</button>
            </td>
            <td>{{ new Date(form.date_submitForm).toLocaleString() }}</td>
            <td>
              <button @click="showDetails(form)">ดูรายละเอียด</button>
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
  export default {
    layout: 'menu',
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
                console.log("User Logged In:", this.uid);
            } else {
                alert("กรุณาเข้าสู่ระบบก่อนส่งข้อมูล");
            }
        });

      this.fetchData(this.uid);
    },
    methods: {
      fetchData(uid) {
        firebase.database().ref('T-VER-Form').orderByChild('status').equalTo('1').on('value', snapshot => {
          const data = snapshot.val();
          this.formList = Object.entries(data || {}).map(([id, formData]) => ({ id, ...formData }));

        });
      },

      approveForm(form) {
        if (confirm('คุณต้องการอนุมัติโครงการนี้หรือไม่?')) {
          // Update the status in Firebase
          firebase.database().ref(`T-VER-Form/${form.id}`).update({ status: '2' });
          alert('อนุมัติโครงการสําเร็จ');
        }
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
  
  <style scoped>
  .container {
    width: 100%;
  }
  .title {
    text-align: center;
  }
  .search-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
  }
  .data-table th, .data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  .data-table th {
    background-color: #f4f4f4;
    cursor: pointer;
  }
  button {
    padding: 5px 10px;
    border: none;
    background: #007bff;
    color: white;
    cursor: pointer;
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
    border-radius: 5px;
  }
  </style>
  