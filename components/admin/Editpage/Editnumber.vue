<template>
    <div>
        <p class="en-text-20 mt-1">รูปส่วนที่ 1</p>

        <img class="en-img" :src="filePreviewUrl1" height="150px" alt="">
        <div class="d-flex flex-row-reverse">
            <input type="file" @change="handleFileUpload1" class="mt-2">
        </div>

        <div v-if="loading1" class="btn edit-number-button-save mt-2" > 
            <div class="spinner-border text-white" role="status">
                <span class="sr-only">Loading...</span>
            </div>    
        </div>
        <button v-if="!loading1"  @click="uploadImage1();"  class="btn edit-number-button-save mt-2">Save</button>

        <p class="en-text-20 mt-1">รูปส่วนที่ 2</p>

        <img class="en-img" :src="filePreviewUrl2" height="150px" alt="">
        <div class="d-flex flex-row-reverse">
            <input type="file" @change="handleFileUpload2" class="mt-2">
        </div>

        <div v-if="loading2" class="btn edit-number-button-save mt-2" > 
            <div class="spinner-border text-white" role="status">
                <span class="sr-only">Loading...</span>
            </div>    
        </div>
        <button v-if="!loading2" @click="uploadImage2();"  class="btn edit-number-button-save mt-2">Save</button>

        <!-- <p class="en-text-20 mt-1">สีมงคลวันนี้</p> -->
        <p class="en-text-20 mt-1">คำเเนะนำส่วนสีมงคลวันนี้</p>
        <input v-model="text_color" class="edit-number-input" type="text" name="" id="">

        <!-- <p class="en-text-20 mt-1">เลขมงคล</p> -->
        <p class="en-text-20 mt-1">คำเเนะนำส่วนเลขมงคล</p>
        <!-- <input class="edit-number-input" type="text" name="" id=""> -->
         
       <input v-model="text" class="edit-number-input" type="text" name="" id="">
        <!-- <p class="en-text-20 mt-1">เลขมงคลเด่น</p> -->
        <!-- <div class="row">
            <div class="col-3">
                <input v-model="number1" class="edit-number-input"  type="text" name="" id="">
            </div>
            <div class="col-9">
                <p class="en-text-20 mt-1 text-center">รอง</p>
                <div class="row">
                    <div class="col">
                        <input v-model="number1_1" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                    <div class="col">
                        <input v-model="number1_2" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                    <div class="col">
                        <input v-model="number1_3" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                    <div class="col">
                        <input v-model="number1_4" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                </div>
                <div class="number-hr"></div>
                <div class="row">
                    <div class="col">
                        <input v-model="number1_5" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                    <div class="col">
                        <input v-model="number1_6" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                    <div class="col">
                        <input v-model="number1_7" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                    <div class="col">
                        <input v-model="number1_8" class="edit-number-input-1"  type="text" name="" id="">
                    </div>
                </div>
            </div>
        </div> -->
        <a class="pb-5" href="/editnumberadmin" target="_blank">เข้าไปแก้ไข เลขมงคล</a>
        <!-- <p>แก้แล้วทำการกดปุ่ม Save</p>
        <button @click="onSave();"  class="btn edit-number-button-save mt-2">Save</button> -->
    </div>
    
</template>

<script>
import number from '../../number/number.vue';
import firebase from '~/plugins/firebase.js'

export default {
    data(){
        return {
            text : '',
            text_color : '',
            number1 : '',
            number1_1 : '',
            number1_2 : '',
            number1_3 : '',
            number1_4 : '',
            number1_5 : '',
            number1_6 : '',
            number1_7 : '',
            number1_8 : '',
            data:[],
            file1: null, // the file
            file2: null, // the file
            filePreviewUrl1: null, // default
            filePreviewUrl2: null, // default
            folderName1: "img", // กำหนดชื่อโฟลเดอร์ที่ต้องการในนี้
            folderName2: "img", // กำหนดชื่อโฟลเดอร์ที่ต้องการในนี้
            loading1: false, // เพิ่มค่า loading สำหรับตรวจสอบว่ากำลังโหลดหรือไม่
            loading2: false, // เพิ่มค่า loading สำหรับตรวจสอบว่ากำลังโหลดหรือไม่
        }
    },
    methods:{
        handleFileUpload1(event) {
        this.file1 = event.target.files[0]
        this.filePreviewUrl1 = URL.createObjectURL(this.file1)
        },
        handleFileUpload2(event) {
        this.file2 = event.target.files[0]
        this.filePreviewUrl2 = URL.createObjectURL(this.file2)
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
              
            firebase.database().ref('number').update({
                imgURL1: downloadURL1
            }).then(() => {
                this.loading1 = false;
                // alert("บันทึกเรียบร้อย")
                window.location.reload()
            })
    
            
            } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image.')
            }
        },
        async uploadImage2() {
          
            if (!this.file2) {
            alert('Please select an image.')
            return
            }
    
            try {
            const storageRef2 = firebase.storage().ref()
            this.loading2 = true; // เริ่มโหลด
            const fileRef2 = storageRef2.child(this.folderName2 + '/' + this.file2.name) // ระบุชื่อโฟลเดอร์และชื่อไฟล์
            await fileRef2.put(this.file2)
            const downloadURL2 = await fileRef2.getDownloadURL()
            
            firebase.database().ref('number').update({
                imgURL2: downloadURL2
            }).then(() => {
                this.loading2 = false;
                // alert("บันทึกเรียบร้อย")
                window.location.reload()
            })

          
            
            } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image.')
            }
        },
        onSave(){
            if (this.text_color == '') {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน')
                return
            }
            let data = {
                text : this.text,
                text_color : this.text_color,
                // number1 : this.number1,
                // number1_1 : this.number1_1,
                // number1_2 : this.number1_2,
                // number1_3 : this.number1_3,
                // number1_4 : this.number1_4,
                // number1_5 : this.number1_5,
                // number1_6 : this.number1_6,
                // number1_7 : this.number1_7,
                // number1_8 : this.number1_8,
            }
            // console.log(data)

        // Fetch Google Sheets data
        
        // https://sheet.best/api/sheets/17afba8a-4233-4194-8077-e77af9e6e2a5
        // https://sheet.best/api/sheets/69ab8f8e-61f5-4cf3-8e6c-550cc8464981
        fetch("https://sheet.best/api/sheets/69ab8f8e-61f5-4cf3-8e6c-550cc8464981?_raw=1")
            .then((response) => response.json())
            .then((data) => {
            this.sheetData = data;

            console.log(this.sheetData);
                
              firebase.database().ref('sheetDataNumber').set(
                this.sheetData
              ).then(() => {
                    alert("บันทึกเรียบร้อย")
                })

            }).catch((error) => {
            console.error(error);
            });
    

            firebase.database().ref('number').update({
                text : this.text,
                text_color : this.text_color,
                // number1 : this.number1,
                // number1_1 : this.number1_1,
                // number1_2 : this.number1_2,
                // number1_3 : this.number1_3,
                // number1_4 : this.number1_4,
                // number1_5 : this.number1_5,
                // number1_6 : this.number1_6,
                // number1_7 : this.number1_7,
                // number1_8 : this.number1_8,
            }).then(() => {
                // alert("บันทึกเรียบร้อย")
            })

        },
    },
    mounted(){
        const userRef = firebase.database().ref('number');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
          this.text = this.data.text
          this.text_color = this.data.text_color
        //   this.number1 = this.data.number1
        //   this.number1_1 = this.data.number1_1
        //   this.number1_2 = this.data.number1_2
        //   this.number1_3 = this.data.number1_3
        //   this.number1_4 = this.data.number1_4
        //   this.number1_5 = this.data.number1_5
        //   this.number1_6 = this.data.number1_6
        //   this.number1_7 = this.data.number1_7
        //   this.number1_8 = this.data.number1_8
          this.filePreviewUrl1 = this.data.imgURL1
          this.filePreviewUrl2 = this.data.imgURL2
          // console.log(this.data);
        });
    }

}
</script>

<style>
.en-text-20 {
    font-size: 20px;
}
.en-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 5px;
}
.edit-number-button{
    background: #0D5D51;
    border-radius: 10px;
    position: relative;
    top: 10px;
    right: 10px;
    color: #fff;
}
.edit-number-button-save{
    background: #0D5D51;
    border-radius: 10px;
    position: relative;
    color: #fff;
}
.edit-number-input{
    width: 100%;
    border-radius: 10px;
    padding-left: 10px;
}
.edit-number-input-1{
    width: 200%;
    border-radius: 10px;
}

/* Style for the custom file input */
.custom-file-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  
  .custom-file-label {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .custom-file-label:hover {
    background-color: #f0f0f0;
  }
  
  .custom-file-input:focus + .custom-file-label {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }

</style>


<!-- <template>
    <div>
      <input type="file" @change="handleFileUpload">
      <button @click="uploadImage">Upload Image</button>
      <div v-if="filePreviewUrl">
        <img :src="filePreviewUrl" alt="Uploaded Image" style="max-width: 300px; margin-top: 10px;">
      </div>
    </div>
  </template>
  
  <script>
  import firebase from '~/plugins/firebase.js'
  export default {
    data() {
      return {
        file: null, // the file
        filePreviewUrl: null, // default
        folderName: "img" // กำหนดชื่อโฟลเดอร์ที่ต้องการในนี้
      }
    },
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0]
        this.filePreviewUrl = URL.createObjectURL(this.file)
      },
      async uploadImage() {
        if (!this.file) {
          alert('Please select an image.')
          return
        }
  
        try {
          const storageRef = firebase.storage().ref()
          const fileRef = storageRef.child(this.folderName + '/' + this.file.name) // ระบุชื่อโฟลเดอร์และชื่อไฟล์
          await fileRef.put(this.file)
          const downloadURL = await fileRef.getDownloadURL()
          alert('Image uploaded successfully. Download URL: ' + downloadURL)
          
        } catch (error) {
          console.error('Error uploading image:', error)
          alert('Failed to upload image.')
        }
      }
    }
  }
  </script> -->