<template>

    <!-- <div class="container mt-5 pt-5 mb-5 text-white text-center"> -->
    <div class="container text-black text-center">
                
                <img v-if="this.thaiZodiac_data == 'เกิดราศีธนู'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-9.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีมังกร'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-10.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีกุมภ์'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-11.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีมีน'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-12.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีเมษ'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-1.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีพฤษก'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-2.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีเมถุน'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-3.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีกรกฎ'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-4.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีสิงห์'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-5.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีกันย์'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-6.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีตุลย์'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-7.svg" alt="">
                <img v-if="this.thaiZodiac_data == 'เกิดราศีพิจิก'" style="width: 100px ;height: 100px" src="../../static/Icon/Icon-8.svg" alt="">
            <h6 class="pb-5">เกิดราศี {{ thaiZodiac_data }} ปีนักษัตร {{ Yearofthezodiac_data }}</h6>
        </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
export default {
    data() {
        return {
            data: [],
            thaiZodiac_data: '',
            Yearofthezodiac_data: '',
        }
    },
    methods: {
        getdatazodiac(date) {
            const day = parseInt(date.substring(0, 2));
            const month = parseInt(date.substring(3, 5));
            const year = parseInt(date.substring(6, 10));

            let Yearofthezodiac = "";

            const buddhistYear = parseInt(year)
            if (!isNaN(buddhistYear)) {
                const sakkaratYears = [
                    'กุน', 'ชวด', 'ฉลู', 'ขาล', 'เถาะ', 'มะโรง', 'มะเส็ง', 'มะเมีย', 'มะแม', 'วอก', 'ระกา', 'จอ'
                ]
                const startBuddhistYear = 2490
                const diff = buddhistYear - startBuddhistYear
                const index = diff % sakkaratYears.length
                Yearofthezodiac = sakkaratYears[index]

            } else {
                Yearofthezodiac = ''
            }


            // Determine Thai zodiac based on month and day
            let thaiZodiac = "";
            if ((month === 1 && day >= 1 && day <= 14) || (month === 12 && day === 31)) {
                thaiZodiac = "เกิดราศีธนู";
            } else if ((month === 1 && day >= 15) || (month === 2 && day <= 12)) {
                thaiZodiac = "เกิดราศีมังกร";
            } else if ((month === 2 && day >= 13) || (month === 3 && day <= 12)) {
                thaiZodiac = "เกิดราศีกุมภ์";
            } else if ((month === 3 && day >= 13) || (month === 4 && day <= 12)) {
                thaiZodiac = "เกิดราศีมีน";
            } else if ((month === 4 && day >= 13) || (month === 5 && day <= 14)) {
                thaiZodiac = "เกิดราศีเมษ";
            } else if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) {
                thaiZodiac = "เกิดราศีพฤษก";
            } else if ((month === 6 && day >= 15) || (month === 7 && day <= 14)) {
                thaiZodiac = "เกิดราศีเมถุน";
            } else if ((month === 7 && day >= 15) || (month === 8 && day <= 15)) {
                thaiZodiac = "เกิดราศีกรกฎ";
            } else if ((month === 8 && day >= 16) || (month === 9 && day <= 16)) {
                thaiZodiac = "เกิดราศีสิงห์";
            } else if ((month === 9 && day >= 17) || (month === 10 && day <= 16)) {
                thaiZodiac = "เกิดราศีกันย์";
            } else if ((month === 10 && day >= 17) || (month === 11 && day <= 15)) {
                thaiZodiac = "เกิดราศีตุลย์";
            } else if ((month === 11 && day >= 16) || (month === 12 && day <= 15)) {
                thaiZodiac = "เกิดราศีพิจิก";
            }

            this.thaiZodiac_data = thaiZodiac;
            this.Yearofthezodiac_data = Yearofthezodiac;
            // console.log("ปีนักษัตร:", Yearofthezodiac);
            // console.log("ราศีไทย:", thaiZodiac);
        },

    },
    mounted() {
        const uid = localStorage.getItem("uid");
        const userRef = firebase.database().ref('users/' + uid);
        userRef.on('value', (snapshot) => {
            this.data = snapshot.val();
            //   console.log(this.data);
            this.getdatazodiac(this.data.date);
        });
    }
}
</script>

<style>
.c-b-1 {
    background-color: #043128;
    width: 100%;
    height: 500px;
    padding-top: 60px;
}

.pl-6 {
    margin-left: 200px;
    margin-top: 50px;
}

.box-c-1 {
    margin-top: 120px;
    background-color: #FDBE1C;
    height: 100px;
    width: 500px;
    border-radius: 50px;
}

.box-c-1-1 {
    position: relative;
    top: -50px;
}

.box-c-t-1 {
    position: relative;
    top: -20px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 15px;
}


@media (max-width: 1000px) {
    .box-c-t-1 {
        position: relative;
        top: -10px;
        color: rgb(0, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }

    .box-c-1-1-img {
        width: 70%;
    }

    .box-c-1-1-img2 {
        width: 100%;
    }

    .box-c-1 {
        margin-top: 120px;
        background-color: #FDBE1C;
        height: 70px;
        width: 300px;
        border-radius: 50px;
    }

    .box-c-1-1-img-1 {
        width: 200%;
        position: relative;
        right: 60px;
        top: 10px;
    }

    .text-h1 {
        font-size: 30px;
    }

    .text-h1-p {
        position: relative;
        right: 100px;
        top: -30px;
    }

    .text-s-p {
        font-size: 15px;
        position: relative;
        right: 20px;
    }
}
</style>