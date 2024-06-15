<template>
    <div>
        <p class="en-text-20 mt-1">รูปส่วนดูดวงราศี</p>

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

 
        <p class="en-text-20 mt-1">ดูดวงราศี</p>
        <p class="en-text-20 mt-1">คำเเนะนำ</p>
        <input v-model="text" class="edit-number-input" type="text" name="" id="">


        <button @click="onSave();"  class="btn edit-number-button-save mt-2">Save</button>
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
            filePreviewUrl1: null,
            folderName1: "imgzodiac",
            loading1: false,
        }
    },
    methods:{
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
              
            firebase.database().ref('zodiac').update({
                imgURL1: downloadURL1
            }).then(() => {
                this.loading1 = false;
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

            firebase.database().ref('zodiac').update({
                text : this.text,
            }).then(() => {
                // alert("บันทึกเรียบร้อย")
            })

        },
    },
    mounted(){
        const userRef = firebase.database().ref('zodiac');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
          this.text = this.data.text
          this.filePreviewUrl1 = this.data.imgURL1
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