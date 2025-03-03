<template>
    <div>
      <!-- Input for file selection -->
      <input type="file" @change="handleFileChange" />
      <button @click="uploadFile">Upload</button>
      <p v-if="uploading">Uploading...</p>
  
      <!-- Display uploaded files -->
      <div v-if="files.length">
        <h3>Uploaded Files</h3>
        <ul>
          <li v-for="(file, index) in files" :key="file.id">
            <div>
              <strong>{{ file.fileName }}</strong>
              <p>Uploaded on: {{ file.uploadDate }}</p>
              <button @click="deleteFile(file.id)">Delete</button>
              <button @click="viewFile(file)">View</button>
              <button @click="downloadFile(file)">Download</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import firebase from '~/plugins/firebase.js'
  
  export default {
    data() {
      return {
        file: null,
        uploading: false,
        files: []  // Store the list of files
      }
    },
    created() {
      // Fetch the list of files from Firebase when the component is created
      this.fetchFiles()
    },
    methods: {
      handleFileChange(event) {
        this.file = event.target.files[0]
      },
      // Function to convert file to Base64
      async fileToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      },
      async uploadFile() {
        if (!this.file) return
  
        this.uploading = true
        try {
          // Convert the file to Base64
          const base64File = await this.fileToBase64(this.file)
  
          // Save the Base64 string and metadata to Firebase Realtime Database
          const dbRef = firebase.database().ref('files')
          const newFileRef = dbRef.push()
          await newFileRef.set({
            fileName: this.file.name,
            fileData: base64File,
            uploadDate: new Date().toLocaleString()  // Save the upload date
          })
  
          // After uploading, fetch the updated file list
          this.fetchFiles()
        } catch (error) {
          console.error('Error uploading file:', error)
        } finally {
          this.uploading = false
        }
      },
      // Fetch all files from Firebase Realtime Database
      async fetchFiles() {
        const dbRef = firebase.database().ref('files')
        const snapshot = await dbRef.once('value')
        const files = snapshot.val()
        if (files) {
          this.files = Object.keys(files).map(key => ({
            id: key,
            fileName: files[key].fileName,
            uploadDate: files[key].uploadDate,
            fileData: files[key].fileData
          }))
        } else {
          this.files = []
        }
      },
      // Delete a file from Firebase Realtime Database
      async deleteFile(fileId) {
        const dbRef = firebase.database().ref('files').child(fileId)
        await dbRef.remove()
        
        // After deletion, fetch the updated file list
        this.fetchFiles()
      },
      // View the file (open it in a new window)
      viewFile(file) {
        const fileUrl = file.fileData
        const win = window.open(fileUrl, '_blank')
        win.focus()
      },
      // Download the file as a new file
      downloadFile(file) {
        const base64Data = file.fileData.split(',')[1] // Remove data URL prefix
        const link = document.createElement('a')
        link.href = `data:application/octet-stream;base64,${base64Data}`
        link.download = file.fileName
        link.click()
      }
    }
  }
  </script>
  