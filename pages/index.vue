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
  mounted() { },
  methods: {}
}
</script>

<style>
.backgroundhome {
  background: linear-gradient(to bottom right, rgb(97, 186, 191) 30%, rgb(80, 124, 129) 100%);
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.btn-secondary {
  color: #000000;
  background-color: #0088ff00 !important;
  border-color: #0088ff00 !important;
}

.btn-secondary:hover {
  color: #6600ff;
  background-color: #0088ff00 !important;
  border-color: #0088ff00 !important;
}

</style>