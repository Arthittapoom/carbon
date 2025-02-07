<template>
    <div class="signup-background">
        <div class="logo">

            <img class="img1" src="../static/home/image 5.svg" alt="">
        </div>

        <div class="container signup-container">
            <div class="signup-box">
                <div class="row">
                    <div class="col">
                        <p>ราคาคาร์บอน</p>
                        <p class="small-text">เดือน สิงหาคม 2567</p>
                    </div>
                    <div class="col">
                        <img src="" alt="">
                    </div>
                    <div class="col">
                        75.15B
                    </div>
                </div>

                <div class="graph-container">
                    <div class="graph-y-title">
                        Y: ค่า Carbon
                    </div>
                    <div class="graph">
                        <div class="graph-line-title">
                            <p v-for="(label, index) in [50, 40, 30, 20, 10]" :key="index">{{ label }}</p>
                        </div>
                        <div class="graph-bars">
                            <div v-for="(data, index) in data_graph" :key="index" class="graph-line"
                                :style="{ height: data.value + 'px' }">
                                <span>{{ data.date }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="graph-x-title">
                        X: วันที่
                    </div>
                </div>




                <div class="row mt-3">
                    <div class="col-9">
                        <p>จำนวนคาร์บอนที่มี</p>
                        <p>มูลค่าเฉลี่ย 198.15B</p>
                    </div>
                    <div class="col-3">
                        <p>98.15C</p>
                    </div>
                </div>
            </div>

            <div v-if="page === 1" class="signup-box2">
                <p>คาร์บอน</p>

                <div class="card">


                    <div v-for="item in treeData" class="card-body2">
                        <p>จำนวนคาร์บอน {{ item.totalCarbon }} C</p>
                        <p>ราคา {{ item.carbonPrice }} บาท</p>
                        <button @click="buyTree(item)">ชื้อ</button>
                    </div>


                </div>

            </div>

            <div v-if="page === 2" class="signup-box2">
                <p>คาร์บอนที่เลือก</p>
                <div class="card-body">
                    <p>จำนวนคาร์บอน {{ selectedTree?.totalCarbon }} C</p>
                    <p>ราคา {{ selectedTree?.carbonPrice }} บาท</p>
                </div>

                <div class="qr">
                    <img v-if="imgurl" class="img2" :src="imgurl" alt="Uploaded Image">
                    <img v-else class="img2" src="/QRcode2.png" alt="Default Image">
                </div>

                <input type="file" @change="onFileChange" />

                <div class="btn-corbon">
                    <button @click="page = 1" class="btn btn-primary">กลับ</button>
                    <button @click="buyCorbon()" class="btn btn-primary">ชื้อ</button>
                </div>

            </div>

            <div v-if="page === 3" class="signup-box2">

                <img class="imgcc" src="/CC.png" alt="">

                <button @click="page = 1" class="btn btn-primary mb-3">กลับ</button>
                <button @click="page = 1" class="btn btn-primary">ดาวน์โหลด</button>

            </div>


        </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2';
import { uid } from 'chart.js/helpers';
export default {
    data() {
        return {
            page: 1,
            treeData: {},
            selectedTree: null,
            imgurl: null,

            data_graph: [
                { date: '1', value: 30 },
                { date: '2', value: 140 },
                { date: '3', value: 60 },
                { date: '4', value: 10 },
                { date: '5', value: 120 },
                { date: '6', value: 40 },
                { date: '7', value: 70 },
            ]
        }
    },
    methods: {

        buyCorbon() {


            this.router.push('/2c2p')
            
        //     console.log(this.selectedTree);
        //     console.log(this.imgurl);

        //     const playload = {
        //         tree: this.selectedTree,
        //         imgurl: this.imgurl,
        //         uid: firebase.auth().currentUser.uid,
        //         status: "รอการตรวจสอบ"
        //     }

        //     // บันทึกข้อมูล
        //    const ref = firebase.database().ref('buyCorbon').push(playload);

        //    ref.then((snapshot) => {
               
        //        // แจ้งเตือน
        //        Swal.fire({
        //            icon: 'success',
        //            title: 'บันทึกข้อมูลสําเร็จ',
        //            showConfirmButton: false,
        //            timer: 2000
        //        })

        //    })

        //    ref.catch((error) => {
        //        console.error(error);
        //    })
        },

        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // สร้าง FormData สำหรับส่งข้อมูล
                const formData = new FormData();
                formData.append("image", file);

                const apiKey = "0904e409f47dfdaabe1f414e276a4cd8"; // แทนที่ด้วย API Key ของคุณจาก ImgBB

                // ส่งคำขอไปยัง ImgBB API
                fetch("https://api.imgbb.com/1/upload?key=" + apiKey, {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log("Uploaded Image URL:", data.data.display_url);
                            this.imgurl = data.data.display_url; // เก็บ URL ของภาพในตัวแปร form
                        } else {
                            console.error("Upload failed:", data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                    });
            }
        },

        fetch_trees() {
            const res = firebase.database().ref('trees');

            res.on('value', (snapshot) => {
                const data = snapshot.val();
                const treeList = [];

                // ดึงข้อมูลพร้อม id ของแต่ละต้นไม้
                for (const [id, treeData] of Object.entries(data || {})) {
                    treeList.push({ id, ...treeData });
                }

                // อัปเดต treeData ใน Vue
                this.treeData = treeList;
            });
        },


        buyTree(item) {
            this.selectedTree = item;
            this.page = 2;
        }

    },
    mounted() {
        this.fetch_trees();
    }
}
</script>

<style scoped>
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.img1 {}

@media screen and (max-width: 768px) {
    .img1 {
        display: none;
    }

}

.card {
    overflow-y: scroll;
    height: 350px;
    width: 100%;
    border: none;
}

.card-body2 {
    background-color: #00A1B4;
    color: #ffffff;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    font-size: large;
    flex-direction: column;
    margin-bottom: 10px;
}

.card-body2>button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #c4f1f7;
    color: #000000;
    font-weight: bold;
}

.graph {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    height: 200px;
    /* ความสูงของกราฟ */
    /* border-bottom: 1px solid #ccc; */
    background-color: #00A1B4;
    border-radius: 15px;
    padding: 10px;
    position: relative;
}

.graph-line-title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    /* ความสูงเต็มกราฟ */
    margin-right: 10px;
    text-align: right;
}

.graph-line-title p {
    margin: 0;
    font-size: 12px;
    color: #ffffff;
}

.graph-bars {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-grow: 1;
}

.graph-line {
    width: 30px;
    /* ความกว้างของแต่ละกราฟ */
    background-color: #ffffff;
    /* สีของกราฟ */
    text-align: center;
    color: rgb(255, 255, 255);
    margin-bottom: 10px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    transition: height 0.3s ease;
    /* ทำให้การเปลี่ยนความสูงดูนุ่มนวล */
}

.graph-line span {
    position: absolute;
    bottom: -20px;
    /* ให้ตัวเลขอยู่ด้านล่างแท่งกราฟ */
    font-size: 12px;
    color: #ffffff;
}

.graph-x-title {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 12px;
    color: #ffffff;
}

.graph-y-title {
    width: 100%;
    display: flex;
    justify-content: start;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
}

.imgcc {
    width: 100%;
    height: auto;
    padding-bottom: 10px;
}


dody {
    background: linear-gradient(to bottom right, #0BC599 30%, #F1E92E 100%);
}

.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.signup-box,
.signup-box2 {
    height: 450px;
    width: 100%;
    max-width: 400px;
    background-color: #ffffff;
    border-radius: 50px;
    box-shadow: 0px 5px 1px 0px #8787875a;
    border: 5px solid #ffffff;
    padding: 20px;
    margin: 10px;
}

.signup-box {
    background-color: #ffffff00;
}

.signup-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.signup-input,
.input-field {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #F2F2F2;
    padding-left: 10px;
}

.signup-btn,
.btn-primary {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #00A1B4;
    color: #ffffff;
    font-weight: bold;
}

.signup-google-btn {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-google-btn img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.small-text {
    font-size: 10px;
}

.qr {
    display: flex;
    justify-content: center;
    align-items: center;
}

.img2 {
    width: 40%;
    height: 40%;
    object-fit: cover;
    border-radius: 50px;
}

.btn-corbon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    /* background-color: #00A1B4; */
    color: #ffffff;
    font-weight: bold;
}

@media (max-width: 768px) {

    .signup-box {
        width: 100%;
        max-width: 100%;
    }

    .signup-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
}
</style>
