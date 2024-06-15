<template>
<div :style="{ backgroundImage: 'url(' + data.imgURL1 + ')' }" class="b-zodiac">
    <div class="container pt-5">
        <h2 class="text-z-1">ดูดวงราศี</h2>
        <h3 class="text-z-2">{{ data.text }}</h3>

        <div class="box-z-1">
            <h2 class="box-z-1-text">ราศีของคุณ</h2>
            <div class="container mt-5">
                <div class="row justify-content-center">
                  <div class="col-md-6">
                    <h1 class="text-center mb-4 box-z-2-text">คำนวณราศี</h1>
                    <form @submit.prevent="calculateZodiac">
                      <div class="form-group">
                        <label class="text-white" for="day">วันที่:</label>
                        <input type="number" id="day" class="form-control" v-model.number="day" min="1" max="31" required>
                      </div>
                      <div class="form-group">
                        <label class="text-white" for="month">เดือน:</label>
                        <select id="month" class="form-control" v-model="month" required>
                          <option value="">กรุณาเลือกเดือน</option>
                          <option value="1">มกราคม</option>
                          <option value="2">กุมภาพันธ์</option>
                          <option value="3">มีนาคม</option>
                          <option value="4">เมษายน</option>
                          <option value="5">พฤษภาคม</option>
                          <option value="6">มิถุนายน</option>
                          <option value="7">กรกฎาคม</option>
                          <option value="8">สิงหาคม</option>
                          <option value="9">กันยายน</option>
                          <option value="10">ตุลาคม</option>
                          <option value="11">พฤศจิกายน</option>
                          <option value="12">ธันวาคม</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label class="text-white" for="year">ปี:</label>
                        <select id="year" class="form-control" v-model="year" required>
                          <option value="">กรุณาเลือกปี</option>
                          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary btn-block">คำนวณ</button>
                    </form>
                    <div v-if="zodiacResult" class="mt-3">
                      <p class="text-center text-white"> ราศีของวันที่ {{ day }} เดือน {{ thaiMonths[month] }} ปี {{ year }} </p>
                      <p class="text-center text-white"> คือ {{ zodiacResult }} ปีนักษัตร {{this.Yearofthezodiac}} </p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
</div>  
</template>

<script>
 import firebase from '~/plugins/firebase.js'
export default {
  data() {
    return {
      data : [],
      day: null,
      month: null,
      year: null,
      zodiacResult: null,
      thaiMonths: {
        1: 'มกราคม',
        2: 'กุมภาพันธ์',
        3: 'มีนาคม',
        4: 'เมษายน',
        5: 'พฤษภาคม',
        6: 'มิถุนายน',
        7: 'กรกฎาคม',
        8: 'สิงหาคม',
        9: 'กันยายน',
        10: 'ตุลาคม',
        11: 'พฤศจิกายน',
        12: 'ธันวาคม',
      },
      years: this.generateYears(),
      Yearofthezodiac: "",
    };
  },
  methods: {
    // ฟังก์ชันคำนวณปีนักษัตร
    generateYears1() {
        const buddhistYear = parseInt( this.year );
        if (!isNaN(buddhistYear)) {
          const sakkaratYears = [
            'กุน', 'ชวด', 'ฉลู', 'ขาล', 'เถาะ', 'มะโรง', 'มะเส็ง', 'มะเมีย', 'มะแม', 'วอก', 'ระกา', 'จอ'
          ];
          const startBuddhistYear = 2490;
          const diff = buddhistYear - startBuddhistYear;
          const index = diff % sakkaratYears.length;
          this.Yearofthezodiac = sakkaratYears[index];
          // console.log(this.Yearofthezodiac);
        } else {
          this.Yearofthezodiac = "";
        }
      },

    calculateZodiac() {
      this.generateYears1();
      // การคำนวณราศี
      // โค้ดคำนวณราศีที่เหมือนกัน
       // รายการของราศี
       const zodiacSigns = [
        { sign: 'เกิดราศีธนู', startMonth: 1, startDay: 1, endMonth: 1, endDay: 14 },
        { sign: 'เกิดราศีมังกร', startMonth: 1, startDay: 15, endMonth: 2, endDay: 12 },
        { sign: 'เกิดราศีกุมภ์', startMonth: 2, startDay: 13, endMonth: 3, endDay: 12 },
        { sign: 'เกิดราศีมีน', startMonth: 3, startDay: 13, endMonth: 4, endDay: 12 },
        { sign: 'เกิดราศีเมษ', startMonth: 4, startDay: 13, endMonth: 5, endDay: 12 },
        { sign: 'เกิดราศีพฤษก', startMonth: 5, startDay: 13, endMonth: 6, endDay: 12 },
        { sign: 'เกิดราศีเมถุน', startMonth: 6, startDay: 13, endMonth: 7, endDay: 12 },
        { sign: 'เกิดราศีกรกฎ', startMonth: 7, startDay: 13, endMonth: 8, endDay: 12 },
        { sign: 'เกิดราศีสิงห์', startMonth: 8, startDay: 13, endMonth: 9, endDay: 12 },
        { sign: 'เกิดราศีกันย์', startMonth: 9, startDay: 13, endMonth: 10, endDay: 12 },
        { sign: 'เกิดราศีตุลย์', startMonth: 10, startDay: 13, endMonth: 11, endDay: 12 },
        { sign: 'เกิดราศีพิจิก', startMonth: 11, startDay: 13, endMonth: 12, endDay: 12 },
        { sign: 'เกิดราศีธนู', startMonth: 12, startDay: 13, endMonth: 12, endDay: 31 }
        ];
        // คำนวณราศี
      const selectedDate = new Date(this.year, this.month - 1, this.day);
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedDay = selectedDate.getDate();

      for (const sign of zodiacSigns) {
        if (
          (selectedMonth === sign.startMonth && selectedDay >= sign.startDay) ||
          (selectedMonth === sign.endMonth && selectedDay <= sign.endDay)
        ) {
          this.zodiacResult = sign.sign;
          
          return;
        }
      }
      this.zodiacResult = 'ไม่พบข้อมูลราศีสำหรับวันที่ที่ระบุ';
    },
    generateYears() {
      const startYear = 2490;
      const endYear = 2560;
      const years = [];
      for (let i = endYear; i >= startYear; i--) {
        years.push(i);
      }
      return years;
    }

  },
  mounted() {
    const userRef = firebase.database().ref('zodiac');
        userRef.on('value', (snapshot) => {
          this.data = snapshot.val();
          // console.log(this.data);
        });
  },
  
};
</script>

<style>
.b-zodiac{
    height: 1478px;
    width: 100%;
    background-size: cover;
}
.text-z-1{
    color: #FFFFFF;
    font-size: 62px;
    font-weight: bold;
}
.text-z-2{
    color: #EAA23D;
    font-size: 20px;
    padding-top: 15px;

}
.box-z-1{
    height: 979px;
    width: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(234, 162, 61, 0.6));
    border-radius: 50px;
    border: #67481B solid 3px;
    margin-top: 30px;
    padding-right: 6%;
    padding-left: 6%;
}
.box-z-1-text{
    color: #FFFFFF;
    font-weight: bold;
    font-size: 78px;
    padding-top: 25px;
    display: flex;
    justify-content: center;
}
.box-z-2-text{
    color: #FFFFFF;
    font-weight: bold;
    font-size: 50px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
}
.box-z-1-1{
    width: 100%;
    height: 193px;
    border-radius: 50px;
    background: #F4F0E4;
    margin-top: 30px;
}
.box-z-1-1-img{
    width: 100%;
    height: 100%;
    padding: 20px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box-z-1-1-1{
    width: 35%;
    height: 193px;
    border-radius: 50px;
    background: #F4F0E4;
    margin-top: 30px;
    position: relative;
    left: 65%;

}
.box-z-1-1-2{
    width: 35%;
    height: 193px;
    border-radius: 50px;
    background: #F4F0E4;
    margin-top: 30px;
}
@media (max-width: 415px) {
  .box-z-1-text{
    color: #FFFFFF;
    font-weight: bold;
    font-size: 50px;
    padding-top: 25px;
    display: flex;
    justify-content: center;
  }
}

</style>