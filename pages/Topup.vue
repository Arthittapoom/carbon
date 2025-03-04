<template>
    <div>
        <Nevbar></Nevbar>
        <div class="main">
            <div class="card-body">
                <div class="card-left">
                    <p class="card-title">เลือกจำนวน</p>
                    <div class="card-item-row" v-for="(row, index) in amounts" :key="index">
                        <div v-for="value in row" :key="value" @click="amount = value"
                            :class="['card-item', { active: amount === value }]">
                            <p>{{ formatNumber(value) }} บาท</p>
                        </div>
                    </div>
                </div>
                <div class="card-right">
                    <p class="card-title">รายละเอียด</p>
                    <p class="card-title-text">จำนวนเงิน {{ formatNumber(amount) }} บาท</p>
                    <button class="card-button" @click="topup" :disabled="amount === 0">เติมเงิน</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import firebase from '~/plugins/firebase.js';
import Nevbar from '../components/Nevbar.vue';
import { loadStripe } from "@stripe/stripe-js";
export default {
    components: { Nevbar },
    data() {
        return {
            amount: 0,
            amounts: [
                [100, 200, 500],
                [1000, 2000, 5000],
                [10000, 20000, 50000]
            ]
        };
    },
    methods: {
        formatNumber(num) {
            return new Intl.NumberFormat('th-TH').format(num);
        },

        async makePayment() {
            const stripe = await loadStripe("pk_test_51QGugcDQdoy5otPN53dXFXBzRt7oHOyzEMWW80RSC3lqguudCY1adU4Oo4NLXhdGzF0hlbDOgc6lVEuGHbn6Fwwg00ep3fLpqp"); // ใช้ Publishable Key จาก Stripe Dashboard

            const { error } = await stripe.redirectToCheckout({
                lineItems: [{ price: "price_1QpijtDQdoy5otPNXNgeQrw9", quantity: 1 }], // ✅ ใช้ Price ID ที่ถูกต้อง
                mode: "subscription", // **ถ้าเป็นรายเดือนต้องใช้ mode: 'subscription'**
                successUrl: "https://carbon-kappa-steel.vercel.app/success",
                cancelUrl: "https://carbon-kappa-steel.vercel.app/cancel",
            });

            if (error) {
                console.error("Stripe Error:", error);
            }
        },
        topup() {
            if (this.amount > 0) {
                Swal.fire({
                    title: 'ยืนยันการเติมเงิน',
                    text: `คุณต้องการเติมเงิน ${this.formatNumber(this.amount)} บาทหรือไม่?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // โค้ดสำหรับเรียก API เติมเงิน
                        this.makePayment();
                        // Swal.fire('สำเร็จ!', `คุณเติมเงิน ${this.formatNumber(this.amount)} บาทเรียบร้อยแล้ว`, 'success');
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.main {
    background-color: rgb(158, 195, 198);
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-body {
    width: 100%;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
    margin: 100px;
    border-radius: 20px;
    display: flex;
    gap: 20px;

}

.card-left {
    /* background-color: aquamarine; */
    height: 100%;
    width: 50%;
}

.card-right {
    /* background-color: aqua; */
    height: 100%;
    width: 50%;
}

.card-item-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.card-title {
    font-size: 25px;
    font-weight: bold;
    padding-left: 50px;
    color: #00A1B4;
}

.card-title-text {
    font-size: 25px;
    font-weight: bold;
    padding-left: 50px;
    color: #717171;
}

.card-button {
    background-color: #00A1B4;
    color: #ffffff;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin: 50px;
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
}

.card-item {
    width: 21%;
    height: 100px;
    background-color: #00A1B4;
    box-shadow: 0px 0px 10px 0px #d4d4d4;
    margin: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font: 1em sans-serif;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #ffffff;
}

.card-item:hover {
    background-color: #adf7ff;
    color: #000000;
}

.card-item>p {
    margin: 0;
}
</style>