<template>
  <div :style="{ backgroundImage: 'url(' + data.imgURL1 + ')' }" class="b-dream">
    <div class="container">
      <!-- box-1 -->
      <div class="row">
        <!-- col-1 -->
        <div class="col">
          <h2 class="text-box-1">ทำนายฝัน</h2>
          <p class="text-box-1-1">{{ data.text }}</p>

        </div>
        <!-- col-2 -->
        <div class="col">
          <div class="row">
            <div class="col-11">
              <div v-if="sheetData.length === 0" class="input-box-search pt-2">
                <div class="row">
                  <div class="col-1">
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <div class="col-11">
                    <p>กําลังโหลดข้อมูล</p>
                  </div>
                </div>
              </div>
              <input v-if="sheetData.length !== 0" class="input-box-search" v-model="searchText" placeholder="คำค้นหา"
                type="text">
            </div>
            <div class="col-1">
              <a @click.prevent="searchData" href="#"><img class="input-box-search-icon"
                  src="../../static/dream/Component.svg" alt=""></a>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(result, index) in searchResults.slice(0, 1)" :key="index">
        <div class="row">
          <div class="col">
            <div :style="{ backgroundImage: 'url(' + data.imgURL2 + ')' }" class="box-2-1">
              <div class="container p-5">
                <h2 class="box-2-1-text-1">ผลทำนายฝัน</h2>
                <p class="box-2-1-text-3 pt-5">
                  {{ result['ชื่อ'] }}
                  {{ result['คำอธิบาย'] }}
                  {{ result['การทำนาย'] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      
        <div class="box-3-1 pt-5">
          <div class="container">
            <div class="row text-center">
              <div class="col">
                <div class="col">
                  <div class="row">
                    <div class="col box-2-1-text-2">
                      <h2>{{ result['เลขโดยมีความสำคัญ'].split(',')[0] }}</h2>
                    </div>
                    <div class="col box-2-1-text-2">
                      <h2>{{ result['เลขโดยมีความสำคัญ'].split(',')[1] }}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1">
                <div class="line-1"></div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col box-2-1-text-2-1">
                    <h2>{{ result['เลขสองตัวและสามตัว'].split(',')[0] }}</h2>
                  </div>
                  <div class="col box-2-1-text-2-1">
                    <h2>{{ result['เลขสองตัวและสามตัว'].split(',')[1] }}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div class="box-3-1 pt-5">
          <div class="container">
            <div class="row text-center">
              <div class="col box-2-1-text-2">
                <h2>{{ result['เลขสองตัวและสามตัว'].split(',')[2] }}</h2>
              </div>
              <div class="col box-2-1-text-2">
                <h2>{{ result['เลขสองตัวและสามตัว'].split(',')[3] }}</h2>
              </div>
              <div class="col box-2-1-text-2">
                <h2>{{ result['เลขสองตัวและสามตัว'].split(',')[4] }}</h2>
              </div>
              <div class="col box-2-1-text-2">
                <h2>{{ result['เลขสองตัวและสามตัว'].split(',')[5] }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      
          </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
export default {


  data() {
    return {
      data: [],
      sheetData: [],
      searchText: '',
      searchResults: [],
      loading: true,
    }
  },
  mounted() {

    const userRef1 = firebase.database().ref('dream');
    userRef1.on('value', (snapshot) => {
      this.data = snapshot.val();
    });

    const userRef = firebase.database().ref('sheetDataDream');
    userRef.on('value', (snapshot) => {
      this.sheetData = snapshot.val();
      this.loading = false;
    });

  },
  methods: {
    searchData() {  

      






      // this.searchResults = this.sheetData.filter(row => {
      //   // ตรวจสอบว่าค่าของ row.ชื่อ และ this.searchText ไม่ใช่ undefined ก่อนที่จะทำการเปรียบเทียบ
      //   if (row.ชื่อ && this.searchText) {
      //     return row.ชื่อ.toLowerCase() === this.searchText.toLowerCase();
      //   }
      //   return false; // ถ้าค่าไม่ถูกกำหนดให้ส่งคืนค่าเป็น false
      // });

      // this.searchResults = this.sheetData.filter(row => {
      //   const rowDataAsString = Object.values(row).join(' ');
      //   // console.log(this.searchResults)
      //   return rowDataAsString.toLowerCase().includes(this.searchText.toLowerCase());
      // });


      this.searchResults = this.sheetData.filter(row => {
      const rowDataAsString = Object.values(row).join(' ');
      const searchKeywords = this.searchText.toLowerCase().split(' ');

      return searchKeywords.some(keyword => rowDataAsString.toLowerCase().includes(keyword));
});

      // this.searchResult = this.sheetData.find(row => {
      //   const rowDataAsString = Object.values(row).join(' ');
      //   const searchKeywords = this.searchText.toLowerCase().split(' ');

      //   return searchKeywords.some(keyword => rowDataAsString.toLowerCase().includes(keyword));
      // });


   
    }

  }
}
</script>

<style>
.b-dream {
  height: auto;
  width: 100%;
  padding-bottom: 100px;
  background-position: center;
  background-size: cover;
}

.text-box-1 {
  color: #FFFFFF;
  font-size: 62px;
  font-weight: bold;
  padding-top: 100px;
}

.text-box-1-1 {
  color: #6E47A8;
  font-size: 16px;
}

.text-box-1-2 {
  color: #ffffff;
  font-size: 16px;
}

.input-box-search {
  background: #F1F1F1;
  border-radius: 50px;
  width: 110%;
  height: 50px;
  margin-top: 228px;
  padding-left: 20px;
}

.input-box-search-icon {
  position: relative;
  margin-top: 235px;
  margin-left: -25px;
  height: 35px;
  width: 35px;
}

.box-2-1 {
  background-position: center;
  background-size: cover;
  border-radius: 50px;
  width: 100%;
  height: auto;
  margin-top: 30px;
  border: 3px solid #704DA8;
}

.box-2-2 {
  background-image: url('../../static/dream/Rectangle-box-2.svg');
  background-position: center;
  background-size: cover;
  border-radius: 50px;
  width: 100%;
  height: 230px;
  margin-top: 30px;
  border: 3px solid #704DA8;
}

.box-2-3 {
  background-image: url('../../static/dream/Rectangle-box-3.svg');
  background-position: center;
  background-size: cover;
  border-radius: 50px;
  width: 100%;
  height: 230px;
  margin-top: 19px;
  border: 3px solid #704DA8;
}

.box-2-1-text-1 {
  color: #FFFFFF;
  font-size: 40px;
}

.box-2-1-text-2 {
  color: #FFFFFF;
  font-size: 30px;
  width: 110%;
}

.box-2-1-text-2-1 {
  color: #FDBE1C;
  font-size: 30px;
}

.box-2-1-text-3 {
  color: #FFFFFF;
  font-size: 18px;
}

.box-3-1 {
  background: #704DA8;
  background-position: center;
  background-size: cover;
  border-radius: 50px;
  width: 100%;
  height: 162px;
  margin-top: 30px;
  border: 3px solid #704DA8;
}

.line-1 {
  background: #ffffff;
  height: 70px;
  width: 5%;
  position: relative;
  left: 48%;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
}

.result-table th,
.result-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.result-table th {
  background-color: #f2f2f2;
}

@media (max-width: 770px) {

  .input-box-search-icon {
    position: relative;
    margin-top: -80px;
    margin-left: 190px;
    height: 35px;
    width: 35px;
  }
}

@media (max-width: 480px) {

  .input-box-search-icon {
    position: relative;
    margin-top: -80px;
    margin-left: 170px;
    height: 35px;
    width: 35px;
  }
}

@media (max-width: 460px) {

  .input-box-search-icon {
    margin-left: 150px;
  }
}

@media (max-width: 440px) {

  .input-box-search-icon {
    margin-left: 140px;
  }
}

@media (max-width: 430px) {

  .input-box-search-icon {
    margin-left: 130px;
  }
}

@media (max-width: 420px) {

  .input-box-search-icon {
    margin-left: 120px;
  }
}

@media (max-width: 410px) {

  .input-box-search-icon {
    margin-left: 110px;
  }
}

@media (max-width: 400px) {

  .input-box-search-icon {
    margin-left: 100px;
  }
}

@media (max-width: 390px) {

  .input-box-search-icon {
    margin-left: 90px;
  }
}

@media (max-width: 380px) {

  .input-box-search-icon {
    margin-left: 80px;
  }
}

@media (max-width: 370px) {

  .input-box-search-icon {
    margin-left: 70px;
  }
}

@media (max-width: 360px) {

  .input-box-search-icon {
    margin-left: 60px;
  }
}

@media (max-width: 350px) {

  .input-box-search-icon {
    margin-left: 250px;
  }
}
</style>