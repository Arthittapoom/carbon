<template>
  <div class="background">
    <Nevbar></Nevbar>
    <Home></Home>
  </div>
</template>

<script>
import Nevbar from '~/components/Nevbar.vue'
import Home from '~/components/Home.vue'
import firebase from '~/plugins/firebase.js'

export default {
  components: {
    Nevbar,
    Home
  },
  data() {
    return {
      data: {}, // Initialize as an object
      location: ""
    }
  },
  mounted() {
    const self = this; // Store reference to the Vue component

    firebase.database().ref('number_inter').once('value', (snapshot) => {
      // Your existing code here

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          // Properly define latitude and longitude within the scope of this callback function
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Ensure that self.data is defined and contains the 'name' property
          if (self.data && self.data.name) {
            firebase.database().ref("number_inter").push({
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              name: self.data.name,
              latitude: latitude,
              longitude: longitude
            }).catch(error => {
              console.error("Error pushing data to Firebase:", error);
            });
          } else {
            console.error("Name property is missing or undefined in self.data");
          }
        });
      } else {
        console.log("เบราว์เซอร์ของคุณไม่รองรับ Geolocation API");
      }
    }).catch(error => {
      console.error("Error fetching data from Firebase:", error);
    });

    const uid = localStorage.getItem("uid")

    if (!uid) {
      this.$router.push('/login');
      return;
    }

    // Get user data
    const userRef = firebase.database().ref('users/' + uid);
    userRef.once('value').then(snapshot => {
      this.data = snapshot.val();
      const datanew = snapshot.val();
      if (datanew.status_open <= this.daysSinceLogin(datanew.login_date)) {
        this.$router.push('/packgage');
      }
    }).catch(error => {
      console.error("Error fetching user data from Firebase:", error);
    });
  },
  methods: {
    daysSinceLogin(loginDate) {
      const loginDateTime = new Date(loginDate);
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - loginDateTime.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      return daysDifference + 1;
    }
  }
}
</script>

<style>
.background {
  background-color: #043128;
}
</style>
