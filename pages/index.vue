<template>
    <div class="backgroundhome">
      <Nevbar />
      <Home />

    </div>

  </template>
  
  <script>
  import Nevbar from '~/components/Nevbar.vue'
  import Home from '~/components/Home.vue'
  
  export default {
    components: {
      Nevbar,
      Home
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {}
  }
  </script>
  
  <style scoped>
  .backgroundhome {
    background: linear-gradient(to bottom right, #AAAD9B 30%, #464838 100%);
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  
  </style>
  