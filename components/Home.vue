<template>
   <div>
     <div class="body-main">
        <div class="box-left">
            <p class="title">สรุปภาพรวมตลาด</p>
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
        </div>
        <div class="box-right">
            <h1 class="title">ซื้อขายคาร์บอนเครดิตได้อย่างสะดวกสบาย
                และง่ายดายเชื่อมต่อกับผู้ซื้อขายที่มีความน่าเชื่อถือ</h1>
                <div class="box-text">
                    <p>ให้เราเป็นจุดเริ่มต้นของการซื้อขายคาร์บอนเครดิตของคุณ</p>
                    <button class="button-login">เริ่มสมัครสมาชิก</button>
                </div>

                <div class="box-table">
                    <div class="box-table-row">
                        <p>ตลาดกลาง</p>
                        <a>ราคา ต่ำ-สูง</a>
                    </div>

                    <table class="table">
                        <tr class="table-header">
                            <th>ชื่อ</th>
                            <th>ปริมาณ</th>
                            <th>ราคา</th>
                            <th>แอคชั่น</th>
                        </tr>

                        <tr class="table-row">
                            <td>นาย สมนึก</td>
                            <td>16,000.00 C</td>
                            <td>10,000.00</td>
                            <td>ขึ้น</td>
                        </tr>

                        <tr class="table-row">
                            <td>นาย สมนึก</td>
                            <td>16,000.00 C</td>
                            <td>10,000.00</td>
                            <td>ขึ้น</td>
                        </tr>

                        <tr class="table-row">
                            <td>นาย สมนึก</td>
                            <td>16,000.00 C</td>
                            <td>10,000.00</td>
                            <td>ขึ้น</td>
                        </tr>

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


    },
    mounted() {
      
    }
}
</script>

<style scoped>
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
    justify-content: start;
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
</style>
