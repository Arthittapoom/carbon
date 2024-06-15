<template>
<div class="header">
  <div class="pay-nevbar">
    <nevbar></nevbar>
  </div>
    <div class="container">
        <div class="img-container">
          <img class="img-fluid img card-img-overlay container imgpay1" src="../../static/payment/Component.svg" alt="">
        </div>
        <div class="text-container">
          <h2 class="text-center">ชำระเงิน</h2>
        </div>
        <div class="box-container">
            <div class="container">
                <div class="row">
                    <button @click="pages(1);" class="btn col  ml-4 mt-4 mr-1 boxpay1">
                    
                        <p class="text-blue pt-3">
                            <img src="../../static/payment/Vector.svg" alt="">
                        </p>
                        <p class="text-blue">Card</p>
             
                    </button>
                    <button @click="pages(2);" class="btn col ml-1 mt-4 mr-4 boxpay2">
               
                        <p class="text-white pt-3">QR Code</p>
             
                    </button>
                    

                </div>
                <div>
                    <page1 v-if="this.page == 1"></page1>
                    <page2 v-if="this.page == 2"></page2>
                </div>
                
                

                <img class="en-img" :src="filePreviewUrl1" height="150px" alt="">
                <p class="mt-1">สลิปชำระเงิน</p>
                <div>
                    <input type="file" @change="handleFileUpload1" class="mt-2">
                </div>

                <div v-if="loading1" class="btn mt-2" > 
                    <div class="spinner-border text-blue" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>    
                </div>
                <b-button v-if="!loading1"  @click="uploadImage1();" class="btn-pack mt-4 mb-4">ชำระเงิน</b-button>

            </div>
          </div>
      </div>
      
</div>  
</template>

<script>
import firebase from '~/plugins/firebase.js'
import page1 from '../../components/paymant/page1.vue'
import page2 from '../../components/paymant/page2.vue'
import Nevbar from '~/components/Nevbar.vue'
export default {
  components: {
    page1,
    page2,
    Nevbar
  },
  data() {
    return {
      page: 1,
      data:[],
      file1: null,
      filePreviewUrl1: null,
      folderName1: "imgpayment",
      loading1: false,
    }
  },
  methods: {
    handleFileUpload1(event) {
        this.file1 = event.target.files[0]
        this.filePreviewUrl1 = URL.createObjectURL(this.file1)
        },
        async uploadImage1() {
            
            if (!this.file1) {
            alert('Please select an image.')
            return
            }
    
            try {
            const storageRef1 = firebase.storage().ref()
            this.loading1 = true; // เริ่มโหลด
            const fileRef1 = storageRef1.child(this.folderName1 + '/' + this.file1.name) // ระบุชื่อโฟลเดอร์และชื่อไฟล์
            await fileRef1.put(this.file1)
            const downloadURL1 = await fileRef1.getDownloadURL()
            try {
            const uid = localStorage.getItem("uid")
            
            firebase.database().ref('payment/'+uid).push({
                imgURL1: downloadURL1
            }).then(() => {
                this.loading1 = false;

                alert("บันทึกเรียบร้อย")
            })
    
            }catch{
                alert("กรุณาเข้าสู่ระบบ")
            }

            } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image.')
            }
        },
    pages(value) {
      this.page = value;
    },
    },

mounted() {
  
  const uid = localStorage.getItem("uid")
  if (uid) {}else {this.$router.push('/login')}

  const userRef = firebase.database().ref('payment');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
          this.text = this.data.text
          this.filePreviewUrl1 = this.data.imgURL1
        });
 
}
}
</script>

<style>
.header{
    background-image: linear-gradient(to top, #1D554C, #FEFEF1);
    width: 100%;
    height: auto;
}
.imgpay1{
    height: 30%;
    width: 300px;
}

.container {
    position: relative;
    text-align: center;
  }
  
  .img-container {
    position: relative;
    z-index: 1; /* ตั้งค่า z-index ให้สูงกว่า */
  }
  
  .text-container {

    position: relative;
    z-index: 2; /* ตั้งค่า z-index ให้สูงกว่า */
    top: -70px;
  }
.box-container{
    position: relative;
    z-index: 3; /* ตั้งค่า z-index ให้สูงกว่า */
    top: -35px;

    left: 0%;   
    height: auto;
    width: auto;
    background: #ffffff;
    border-radius: 2cap;
}
.boxpay1{
    background: #ffffff;
    border-radius: 1cap;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.328);
    
}
.boxpay2{
    background: #1D554C;
    border-radius: 1cap;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.328);
    display: flex;
    justify-content: flex-start;
    
}
.navbar-dark .navbar-nav .nav-link {
  color: rgb(0 0 0);
}

</style>