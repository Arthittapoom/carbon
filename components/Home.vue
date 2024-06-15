<template>
    <div class="c043128">
        <div :style="{ backgroundImage: 'url(' + dataimg.imgURL1 + ')' }" class="home">
            <img class="img-fluid img card-img-overlay container h-100 w-100 img1" src="../static/Wheel1.svg" alt="">
            <img class="img-fluid img card-img-overlay container img2" src="../static/payment/Component.svg" alt="">
            <div>
                <h2 class="text-center t-t-1">ดูดวงวันนี้</h2>
            </div>
            <div class="box">
                <colorV2></colorV2>
                <div class="container text-center ">
                    <div class="boxtext">
                        <div class="row">
                            <div class="col ">
                                <p class="p1">ชื่อ</p>
                                <div class="hr-home "></div>
                                <p v-if="this.data" class="p1">{{ this.data.name }}</p>
                                <p v-if="!this.data" class="p1">ยังไม่มีข้อมูล</p>
                            </div>
                            <div class="col">
                                <p class="p1">เบอร์</p>
                                <div class="hr-home"></div>
                                <p v-if="this.data" class="p1">{{ this.data.phone }}</p>
                                <p v-if="!this.data" class="p1">ยังไม่มีข้อมูล</p>

                            </div>
                            <div class="col">
                                <p class="p1">วันเวลาเกิด</p>
                                <div class="hr-home"></div>
                                <p v-if="this.data" class="p1">{{ this.data.date }}</p>
                                <p v-if="!this.data" class="p1">ยังไม่มีข้อมูล</p>
                            </div>
                        </div>
                    </div>
                </div>
                <colorVZ></colorVZ>

                <div class="container d-flex justify-content-center justify-content-around pb-5">
                    <button @click="pages(1);" class="btn">เลขนำโชค</button>
                    <button @click="pages(3);" class="btn">ทำนายฝัน</button>
                </div>
                

            </div>
        </div>
        <!-- <colorVZ> </colorVZ> -->
        <number v-if="this.page_value == 1"> </number>
        <zodiac v-if="this.page_value == 2"> </zodiac>
        <dream v-if="this.page_value == 3"> </dream>

    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import dream from '../components/dream/dream.vue'
import zodiac from '../components/zodiac/zodiac.vue'
import number from '../components/number/number.vue'
import colorVZ from '../components/colorVZ/color.vue'
import colorV2 from '../components/colorV2/color.vue'
export default {
    components: {
        number,
        colorVZ,
        zodiac,
        dream,
        colorV2
    },
    data() {
        return {
            page_value: 1,
            data: [],
            dataimg: [],
            uid: "",
            thaiZodiac_data: '',
            Yearofthezodiac_data: '',
        }
    },
    methods: {
        pages(x) {
            this.page_value = x
        },
        getdatauser(uid) {
            const userRef = firebase.database().ref('users/' + uid);
            userRef.on('value', (snapshot) => {
                this.data = snapshot.val();
                //   console.log(this.data);
                this.getdatazodiac(this.data.date);
            });
        },
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
        try {
            const uid = this.uid = localStorage.getItem("uid")
            this.getdatauser(uid)
        } catch { }

        const userRef = firebase.database().ref('number');
        userRef.on('value', (snapshot) => {
            this.dataimg = snapshot.val();

            // console.log(this.data);
        });
    }
}
</script>

<style>
.btn {
    background-color: #043128;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
}
.box-c-t-1 {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    position: relative;
    top: -16px;
}

.boxtext {
    position: relative;
    top: -40px;
}

.c043128 {
    background-color: #043128;
}

.home {
    background-position: center;
    background-size: cover;
    height: 880px;
    width: 100%;
    z-index: -3;
    margin-top: -75px;
}

.img1 {
    position: absolute;
    top: 170px;
    left: 0;
    z-index: -1;
}

.img2 {
    position: absolute;
    z-index: 0;
    top: 10px;
    width: 350px;
    height: 350px;
}

.box_color {
    position: absolute;
    top: 350px;
    left: 30%;
    right: 0;
    width: 40%;
    height: 11%;
    background-color: #FEFEF1;
    border-radius: 50px;
    box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

}

.box {
    position: absolute;
    top: 380px;
    left: 30%;
    right: 0;
    width: 40%;
    height: auto;
    background-color: #FEFEF1;
    border-radius: 50px;
    box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

}


.box2 {
    position: absolute;
    top: 645px;
    left: 30%;
    right: 0;
    width: 40%;
    height: 11%;
}



.box2-1 {
    border-radius: 6cap 6cap 0.1cap 0.1cap;
    height: 216px;
    background-image: linear-gradient(to top, #032E25, #0E6356);
}

.box2-1-1 {
    border-radius: 6cap 6cap 0.1cap 0.1cap;
    height: 300px;
    background-image: linear-gradient(to top, #032E25, #0E6356);
}

.p1-1 {
    color: #FDBE1C;
    font-size: 16px;
}

.p1-2 {
    color: #FDBE1C;
    font-size: 32px;
    font-weight: bold;
}

.p1-3 {
    color: #FDBE1C;
    font-size: 50px;
    font-weight: bold;
}


.box2-2 {
    border-radius: 6cap 6cap 0.1cap 0.1cap;
    height: 216px;
    background-image: linear-gradient(to top, #A9E7C8, #A9E7C8);
}

.box2-2-2 {
    border-radius: 6cap 6cap 0.1cap 0.1cap;
    height: 300px;
    background-image: linear-gradient(to top, #A9E7C8, #A9E7C8);
}

.p2-1 {
    color: #6427A0;
    font-size: 16px;
}

.p2-2 {
    color: #6427A0;
    font-size: 32px;
    font-weight: bold;
}

.p2-3 {
    color: #6427A0;
    font-size: 50px;
    font-weight: bold;
}


.box2-3 {
    border-radius: 6cap 6cap 0.1cap 0.1cap;
    height: 216px;
    background-image: linear-gradient(to top, #6427A0, #90BEC0);
}

.box2-3-3 {
    border-radius: 6cap 6cap 0.1cap 0.1cap;
    height: 300px;
    background-image: linear-gradient(to top, #6427A0, #90BEC0);
}

.p3-1 {
    color: #ffffff;
    font-size: 16px;
    padding-top: 0.5vw;
}

.p3-2 {
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
}

.p3-3 {
    color: #ffffff;
    font-size: 50px;
    font-weight: bold;
}

.img1-1 {
    height: 50%;
    width: 50%;
    position: relative;
    top: -20px;
}

.hr-home {
    margin-top: 0rem;
    margin-bottom: 0rem;
    border: 1;
    border-top: 3px solid rgba(0, 0, 0, 1);
    width: 60px;

    position: relative;
    left: 30%;

}

.p1 {
    margin-top: 6px;
    font-size: 16px;
}

.t-t-1 {
    position: relative;
    top: 280px;
    color: #ffffff;
}

@media (max-width: 1000px) {
    .box_color {
        position: absolute;
        top: 350px;
        left: 30%;
        right: 0;
        width: 40%;
        height: 11%;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .home {
        background-position: center;
        background-size: cover;
        height: 780px;
        width: 100%;
        border-radius: 0cap 0cap 50px 50px;
        z-index: -3;
        margin-top: -60px;
    }

    .img1 {
        position: absolute;
        top: 170px;
        left: 0;
        z-index: -1;
    }

    .img2 {
        position: absolute;
        z-index: 0;
        top: 10px;
        width: 200px;
        height: 200px;
    }

    .t-t-1 {
        position: relative;
        top: 170px;
        color: #ffffff;
    }

    .box {
        position: absolute;
        top: 260px;
        left: 30%;
        right: 0;
        width: 40%;
        height: auto;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box-c-t-1 {
        position: relative;
        top: -10px;
        color: rgb(0, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }

    .box2 {
        position: absolute;
        top: 560px;
        left: 30%;
        right: 0;
        width: 40%;
        height: 11%;
    }

    .box2-1 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 216px;
        background-image: linear-gradient(to top, #032E25, #0E6356);
    }

    .box2-1-1 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 300px;
        background-image: linear-gradient(to top, #032E25, #0E6356);
    }

    .p1-1 {
        color: #FDBE1C;
        font-size: 16px;
    }

    .p1-2 {
        color: #FDBE1C;
        font-size: 32px;
        font-weight: bold;
    }

    .p1-3 {
        color: #FDBE1C;
        font-size: 50px;
        font-weight: bold;
    }

    .box2-2 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 216px;
        background-image: linear-gradient(to top, #A9E7C8, #A9E7C8);
    }

    .box2-2-2 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 300px;
        background-image: linear-gradient(to top, #A9E7C8, #A9E7C8);
    }

    .p2-1 {
        color: #6427A0;
        font-size: 16px;
    }

    .p2-2 {
        color: #6427A0;
        font-size: 32px;
        font-weight: bold;
    }

    .p2-3 {
        color: #6427A0;
        font-size: 50px;
        font-weight: bold;
    }


    .box2-3 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 216px;
        background-image: linear-gradient(to top, #6427A0, #90BEC0);
    }

    .box2-3-3 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 300px;
        background-image: linear-gradient(to top, #6427A0, #90BEC0);
    }

    .p3-1 {
        color: #ffffff;
        font-size: 16px;
        padding-top: 0.5vw;
    }

    .p3-2 {
        color: #ffffff;
        font-size: 32px;
        font-weight: bold;
    }

    .p3-3 {
        color: #ffffff;
        font-size: 50px;
        font-weight: bold;
    }

    .img1-1 {
        height: 50%;
        width: 50%;
    }

    .hr-home {
        margin-top: 0rem;
        margin-bottom: 0rem;
        border: 1;
        border-top: 3px solid rgba(0, 0, 0, 1);
        width: 60px;

        position: relative;
        left: 10%;

    }

    .p1 {
        margin-top: 6px;
        font-size: 16px;
    }


}

@media (max-width: 900px) {
    .box-c-t-1 {
        position: relative;
        top: -10px;
        color: rgb(0, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }

    .box_color {
        position: absolute;
        top: 350px;
        left: 30%;
        right: 0;
        width: 40%;
        height: 11%;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .home {
        background-position: center;
        background-size: cover;
        height: 880px;
        width: 100%;
        border-radius: 0cap 0cap 50px 50px;
        z-index: -3;
        margin-top: -60px;
    }

    .img1 {
        position: absolute;
        top: 170px;
        left: 0;
        z-index: -1;
    }

    .img2 {
        position: absolute;
        z-index: 0;
        top: 10px;
        width: 200px;
        height: 200px;
    }

    .t-t-1 {
        position: relative;
        top: 170px;
        color: #ffffff;
    }

    .box {
        position: absolute;
        top: 300px;
        left: 15%;
        right: 0px;
        width: 70%;
        height: auto;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box2 {
        position: absolute;
        top: 660px;
        left: 15%;
        right: 0px;
        width: 70%;
        height: 11%;
    }

    .box2-1 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 216px;
        background-image: linear-gradient(to top, #032E25, #0E6356);
    }

    .box2-1-1 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 300px;
        background-image: linear-gradient(to top, #032E25, #0E6356);
    }

    .p1-1 {
        color: #FDBE1C;
        font-size: 16px;
    }

    .p1-2 {
        color: #FDBE1C;
        font-size: 32px;
        font-weight: bold;
    }

    .p1-3 {
        color: #FDBE1C;
        font-size: 50px;
        font-weight: bold;
    }

    .box2-2 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 216px;
        background-image: linear-gradient(to top, #A9E7C8, #A9E7C8);
    }

    .box2-2-2 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 300px;
        background-image: linear-gradient(to top, #A9E7C8, #A9E7C8);
    }

    .p2-1 {
        color: #6427A0;
        font-size: 16px;
    }

    .p2-2 {
        color: #6427A0;
        font-size: 32px;
        font-weight: bold;
    }

    .p2-3 {
        color: #6427A0;
        font-size: 50px;
        font-weight: bold;
    }


    .box2-3 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 216px;
        background-image: linear-gradient(to top, #6427A0, #90BEC0);
    }

    .box2-3-3 {
        border-radius: 6cap 6cap 0.1cap 0.1cap;
        height: 300px;
        background-image: linear-gradient(to top, #6427A0, #90BEC0);
    }

    .p3-1 {
        color: #ffffff;
        font-size: 16px;
        padding-top: 0.5vw;
    }

    .p3-2 {
        color: #ffffff;
        font-size: 32px;
        font-weight: bold;
    }

    .p3-3 {
        color: #ffffff;
        font-size: 50px;
        font-weight: bold;
    }

    .img1-1 {
        height: 50%;
        width: 50%;
    }

    .hr-home {
        margin-top: 0rem;
        margin-bottom: 0rem;
        border: 1;
        border-top: 3px solid rgba(0, 0, 0, 1);
        width: 60px;

        position: relative;
        left: 10%;

    }

    .p1 {
        margin-top: 6px;
        font-size: 16px;
    }



}

@media (max-width: 600px) {
    .box-c-t-1 {
        position: relative;
        top: -10px;
        color: rgb(0, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }

    .home {
        height: 880px;

    }

    .box_color {
        position: absolute;
        top: 350px;
        left: 30%;
        right: 0;
        width: 40%;
        height: auto;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box {
        position: absolute;
        top: 300px;
        left: 10%;
        right: 0px;
        width: 80%;
        height: auto;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box2 {
        position: absolute;
        top: 660px;
        left: 10%;
        right: 0px;
        width: 80%;
        height: 11%;
    }
}

@media (max-width: 450px) {
    .box-c-t-1 {
        position: relative;
        top: -10px;
        color: rgb(0, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }

    .box_color {
        position: absolute;
        top: 360px;
        left: 30%;
        right: 0;
        width: 40%;
        height: 11%;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box {
        position: absolute;
        top: 300px;
        left: 2.5%;
        right: 0px;
        width: 95%;
        height: auto;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box2 {
        position: absolute;
        top: 660px;
        left: 2.5%;
        right: 0px;
        width: 95%;
        height: 11%;
    }

}


@media (max-width: 415px) {
    .box-c-t-1 {
        position: relative;
        top: -10px;
        color: rgb(0, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }

    .box_color {
        position: absolute;
        top: 350px;
        left: 30%;
        right: 0;
        width: 40%;
        height: 11%;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box {
        position: absolute;
        top: 300px;
        left: 2.5%;
        right: 0px;
        width: 95%;
        height: auto;
        background-color: #FEFEF1;
        border-radius: 50px;
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.328);

    }

    .box2 {
        position: absolute;
        top: 660px;
        left: 2.5%;
        right: 0px;
        width: 95%;
        height: 11%;
    }



}
</style>