<template>
    <div class="container">
      <button @click="redirectToMobileAdmin" class="btn">Admin มือถือ</button>
      <button @click="redirectToDesktopAdmin" class="btn">Admin คอมพิวเตอร์</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToMobileAdmin() {
        this.$router.push('/adminM');
      },
      redirectToDesktopAdmin() {
        this.$router.push('/adminW');
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center; /* เพิ่มบรรทัดนี้เพื่อจัดสิ่งที่อยู่ภายในให้อยู่กลางตามแนวดิ่ง */
    height: 100vh; /* ตั้งค่าความสูงของคอนเทนเนอร์เป็นความสูงของหน้าจอ */
  }
  
  .btn {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  </style>
  