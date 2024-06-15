<template>
    <div>
        <p class="en-text-20 mt-1">รูปส่วนทำนายฝัน</p>

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

        <p class="en-text-20 mt-1">รูปส่วนผลทำนายฝัน</p>

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

        <p class="en-text-20 mt-1">ทำนายฝัน</p>
        <p class="en-text-20 mt-1">คำเเนะนำ</p>
        <textarea v-model="text" class="edit-number-input" name="" id="" rows="3"></textarea>


        <button @click="onSave();"  class="btn edit-number-button-save mt-2">Save</button>

        
        <a class="d-block mt-2" href="https://docs.google.com/spreadsheets/d/1fIn22P2Z4kYM1Z90cpe7WmjPoJPKYvXRy814loAKoNs/edit?usp=sharing" target="_blank">เข้าไปแก้ไข</a>
        <p>แก้แล้วทำการกดปุ่ม Save</p>
        <button @click="onSaveDream();"  class="btn edit-number-button-save mt-2">Save</button>
    </div>
    
</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
    data(){
        return {
            text : '',
            data:[],
            file1: null,
            file2: null,
            filePreviewUrl1: null,
            filePreviewUrl2: null,
            folderName1: "imgdream",
            folderName2: "imgdream",
            loading1: false,
            loading2: false,
            sheetData: [],
        }
    },
    methods:{
        onSaveDream(){
            // https://sheet.best/api/sheets/38af393c-a897-4505-a855-6c7ba998d434
            fetch("https://sheet.best/api/sheets/38af393c-a897-4505-a855-6c7ba998d434?_raw=1")
            .then((response) => response.json())
            .then((data) => {
            this.sheetData = data;

            console.log(this.sheetData);
                
              firebase.database().ref('sheetDataDream').set(
                this.sheetData
              ).then(() => {
                    alert("บันทึกเรียบร้อย")
                })

            }).catch((error) => {
            console.error(error);
            });
        },
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
            this.loading1 = true;
            const fileRef1 = storageRef1.child(this.folderName1 + '/' + this.file1.name)
            await fileRef1.put(this.file1)
            const downloadURL1 = await fileRef1.getDownloadURL()
              
            firebase.database().ref('dream').update({
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
            this.loading2 = true;
            const fileRef2 = storageRef2.child(this.folderName2 + '/' + this.file2.name)
            await fileRef2.put(this.file2)
            const downloadURL2 = await fileRef2.getDownloadURL()
            
            firebase.database().ref('dream').update({
                imgURL2: downloadURL2
            }).then(() => {
                this.loading2 = false;
                window.location.reload()
            })

          
            
            } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image.')
            }
        },
        onSave(){
            if (this.text == '') {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน')
                return
            }
            let data = {
                text : this.text,
            }

            firebase.database().ref('dream').update({
                text : this.text,
            }).then(() => {
                
            })

        },
    },
    mounted(){
        const userRef = firebase.database().ref('dream');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
          this.text = this.data.text
          this.filePreviewUrl1 = this.data.imgURL1
          this.filePreviewUrl2 = this.data.imgURL2
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
    height: 50px;
    border-radius: 10px;
    padding-left: 10px;
}
.edit-number-input-1{
    width: 200%;
    border-radius: 10px;
}

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