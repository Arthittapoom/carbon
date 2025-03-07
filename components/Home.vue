<template>
    <div>
        <div class="body-main">
            <div class="box-left">




                <div id="map" style="height: 600px;">
                    <client-only>
                        <l-map :zoom="zoom" :center="center">
                            <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution"></l-tile-layer>
                            <!-- วนลูปแสดงหมุดจาก markerPositions -->
                            <l-marker v-for="(position, index) in markerPositions" :key="index" :lat-lng="position">
                                <!-- แสดง Popup สำหรับแต่ละหมุด -->
                                <l-popup>
                                    <div>
                                        <p class="popup-title">{{ markerMessages[index].message }}</p>
                                        <!-- ปุ่มภายใน Popup -->
                                        <button class="popup-button" @click="showDetails(markerMessages[index].form)">สนใจ</button>
                                    </div>
                                </l-popup>
                            </l-marker>
                        </l-map>
                    </client-only>
                </div>


                <!-- <p class="title">สรุปภาพรวมตลาด</p> -->
                <div class="graph-container">
                    <!-- <div class="graph-y-title">
                        Y: ค่า Carbon
                    </div> -->
                    <!-- <div class="graph">
                        <div class="graph-line-title">
                            <p v-for="(label, index) in [50, 40, 30, 20, 10]" :key="index">{{ label }}</p>
                        </div>
                        <div class="graph-bars">
                            <div v-for="(data, index) in data_graph" :key="index" class="graph-line"
                                :style="{ height: data.value + 'px' }">
                                <span>{{ data.date }}</span>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="graph-x-title">
                        X: วันที่
                    </div> -->

                </div>
            </div>
            <div class="box-right">
                <h1 class="title">ซื้อขายคาร์บอนเครดิตได้อย่างสะดวกสบาย
                    และง่ายดายเชื่อมต่อกับผู้ซื้อขายที่มีความน่าเชื่อถือ</h1>
                <div class="box-text">
                    <p>ให้เราเป็นจุดเริ่มต้นของการซื้อขายคาร์บอนเครดิตของคุณ</p>
                    <button v-if="!islogin" @click="register" class="button-login">เริ่มสมัครสมาชิก</button>
                </div>

                <div class="box-table">
                    <div class="box-table-row">
                        <p>ตลาดกลาง</p>
                        <!-- <a>ราคา ต่ำ-สูง</a> -->
                    </div>

                    <table class="table">
                        <tr class="table-header">
                            <th>ชื่อ</th>
                            <th>ปริมาณ</th>
                            <th>ราคา</th>
                            <th v-if="islogin">แอคชั่น</th>
                        </tr>

                        <tr v-for="(form, index) in formList" :key="index" class="table-row">
                            <td>{{ form.contactName }}</td>
                            <td>16,000.00 C</td>
                            <td>{{ form.price }}</td>
                            <td v-if="islogin"><button @click="showDetails(form)" class="button">สนใจ</button></td>
                        </tr>

                        <!-- <pre>{{ formList }}</pre> -->


                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2';
export default {
    data() {
        return {

            zoom: 6,
            center: [13.7563, 100.5018],
            tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            tileLayerAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            // เก็บตำแหน่งของหมุด
            markerPositions: [
                [13.7563, 100.5018],
                [15.7563, 100.5018]
            ],
            // ข้อความที่จะถูกแสดงในแต่ละ Popup
            markerMessages: [
                'หมุดที่ 1: กรุงเทพฯ',
                'หมุดที่ 2: อีกจุดหนึ่ง'
            ],


            data_graph: [
                { date: '1', value: 30 },
                { date: '2', value: 140 },
                { date: '3', value: 60 },
                { date: '4', value: 10 },
                { date: '5', value: 120 },
                { date: '6', value: 40 },
                { date: '7', value: 70 },
            ],

            formList: [],

            islogin: false,
        }
    },
    methods: {

        register() {
            this.$router.push('/singup')
        },

        fetchData() {
            firebase.database().ref('T-VER-Form').on('value', snapshot => {
                const data = snapshot.val();
                // ดึง status 3
                this.formList = Object.entries(data || {}).map(([id, formData]) => ({ id, ...formData })).filter(form => form.status === 3);
                // this.formList = Object.entries(data || {}).map(([id, formData]) => ({ id, ...formData }));

                this.markerPositions = [];

                this.formList.forEach(form => {
                    const markerPosition = form.markerPosition;
                    if (markerPosition) {
                        this.markerPositions.push(markerPosition);
                    }
                });

                // markerMessages = price + projectNameTh

                this.markerMessages = [];

                this.formList.forEach(form => {
                    const markerMessage = `Price: ${form.price} THB\nProject Name: ${form.projectNameTh} 1.00 C`;
                    this.markerMessages.push({
                        message: markerMessage,
                        form: form,
                        id: form.id
                    });
                });

            });
        },

        Checkislogin() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.islogin = true;
                } else {
                    this.islogin = false;
                }
            });
        },

        showDetails(form) {
            this.$router.push({
                path: '/payment',
                query: { formId: form.id }
            });

            // console.log(form);
        }

    },
    mounted() {
        this.Checkislogin();
        this.fetchData();
    }
}
</script>

<style scoped>
.popup-button {
    background-color: #9CC824;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.popup-title {
    color: #000000;
    font-weight: bold;
}

.button {
    background-color: #9CC824;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.body-main {
    display: flex;
}

.box-table-row {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.box-text {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;

}

.title {
    font-size: 30px;
    color: #ffffff;
    padding-top: 30px;
}

.box-text>p {
    font-size: 20px;
    color: #ffffff;
}

.button-login {
    background-color: #9CC824;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.box-left {
    padding: 10px;
    width: 50%;
    height: 500px;
    border-radius: 15px;
    /* background-color: aquamarine; */
}

.box-right {
    width: 50%;
    height: 500px;
    padding: 10px;
    /* background-color: blue; */
}

.box-table {
    width: 100%;
    height: 400px;
    margin-top: 10px;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 10px;
    position: relative;
    overflow-y: scroll;
    scrollbar-width: none;
}

.graph {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    height: 400px;
    /* ความสูงของกราฟ */
    /* border-bottom: 1px solid #ccc; */
    background-color: #ffffff;
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
    color: #000000;
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
    background-color: #9CC824;
    /* สีของกราฟ */
    text-align: center;
    color: rgb(0, 0, 0);
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
    color: #000000;
}

.graph-x-title {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 12px;
    color: #ffffff;
}

.graph-y-title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
}
</style>
