<template>
    <div>
      <h1>Page {{ $route.params.id }}</h1>
      <p>This is page {{ $route.params.id }}</p>
    </div>
  </template>
  
  <script>
  export default {
    // เรียกใช้ params จาก URL
    async asyncData({ params }) {
      return { id: params.id }
    }
  }
  </script>
  