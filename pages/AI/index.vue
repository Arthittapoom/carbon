<template>
    <div>
      จำนวนคนเข้าเว็บ {{ data }}
  
      <div v-for="(entry, index) in date" :key="index">
        <div v-if="entry.date != null">
            {{ index+1 }} วัน {{ entry.date }} เวลา {{ entry.time }} ชื่อ {{ entry.name }} เข้าหน้า {{ entry.latitude }}:{{ entry.longitude }}
        </div>
      </div>
  
    </div>  
  </template>
  
  <script>
  import firebase from '~/plugins/firebase.js'
  
  export default {
    data() {
      return {
        data: 0,
        date: []
      }
    },
    mounted() {
      firebase.database().ref('number_inter').on('value', (snapshot) => {
        const num = snapshot.val();

        this.data = num.number;
        this.date = [];
        snapshot.forEach(userSnapshot => {

            const user = userSnapshot.val();
            const userData = {
                date: user.date,
                time: user.time,
                name: user.name,
                page: user.page,
                latitude: user.latitude,
                longitude: user.longitude
            }
                            
        this.date.push(userData);
        console.log(this.date);


        });


  
        // อัพเดทจำนวนคนเข้าเว็บ
        
      });
    },
  }
  </script>
  
  <style>
  </style>
  