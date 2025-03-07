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
                    <button class="card-button" @click="topup">เติมเงิน</button>
                    <!-- <p class="card-title">ถอนเงิน</p>
                    <p class="card-title-text">จำนวนเงิน
                        <input v-model="amountwithdraw" class="card-input" type="number" name="" id="">
                    </p>
                    <button class="card-button-withdraw" @click="withdraw">ถอนเงิน</button> -->
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
            ],

            amountwithdraw: 0,

            uid: null
        };
    },

    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;
            } else {
                Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'กรุณาเข้าสู่ระบบ',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#007BFF'
              }).then(() => {
                this.$router.push('/login');
              })
            }
        });
    },

    methods: {
        formatNumber(num) {
            return new Intl.NumberFormat('th-TH').format(num);
        },

        withdraw() {
            // console.log("ถอนเงิน");

            firebase.database().ref(`users/${this.uid}`).once('value', (snapshot) => {
                const data = snapshot.val();
                // console.log(data.amount);

                const amountuser = data.amount
                // console.log(amountuser);

                // เช็คว่ามีเงินเพียงพอไหม
                if (this.amountwithdraw > Number(amountuser)) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'เงินไม่เพียงพอ',
                    })
                } else {

                    const amount = Number(amountuser) - this.amountwithdraw
                    
                    // ถอนเงิน
                    firebase.database().ref(`users/${this.uid}`).update({
                        amount: amount
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'รอดำเนินการ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })


        },

        async makePayment() {
            const stripe = await loadStripe("pk_test_51QGugcDQdoy5otPN53dXFXBzRt7oHOyzEMWW80RSC3lqguudCY1adU4Oo4NLXhdGzF0hlbDOgc6lVEuGHbn6Fwwg00ep3fLpqp"); // ใช้ Publishable Key จาก Stripe Dashboard

            //  Realtime Database

            firebase.database().ref(`plyment/${this.uid}`).set(
                {
                    balance: this.amount,
                    uid: this.uid,
                    status: 0,
                }
            );

            // Swal.fire({
            //     title: 'ยืนยันการเติมเงิน',
            //     text: `ยืนยันการเติมเงิน ${this.amount} บาท`,
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'ยืนยัน',
            //     cancelButtonText: 'ยกเลิก'
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         this.$router.push(`/success?amount=${this.amount}&uid=${this.uid}`);
            //     } else if (result.isDismissed) {
            //         this.$router.push(`/cancel?uid=${this.uid}`);
            //     }
            // });

            // this.$router.push('/success?amount=' + this.amount + '&uid=' + this.uid);
            // this.$router.push('/cancel?uid=' + this.uid);

            const { error } = await stripe.redirectToCheckout({
                lineItems: [{ price: "price_1QpijtDQdoy5otPNXNgeQrw9", quantity: 1 }], // ✅ ใช้ Price ID ที่ถูกต้อง
                mode: "subscription",
                successUrl: "https://carbon-kappa-steel.vercel.app/success?amount=" + this.amount + "&uid=" + this.uid,
                cancelUrl: "https://carbon-kappa-steel.vercel.app/cancel?uid=" + this.uid,
            });

            if (error) {
                console.error("Stripe Error:", error);
            }


        },
        topup() {
            // console.log("จำนวนเงินที่เลือก:", this.amount);
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
                        this.makePayment();
                    }
                });
            }
        }

    }
};
</script>

<style scoped>
.main {
    background: linear-gradient(to bottom right, rgb(170, 211, 213) 30%, rgb(125, 170, 174) 100%);
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

.card-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.card-button-withdraw {
    background-color: #00A1B4;
    color: #ffffff;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin-left: 50px;
    cursor: pointer;
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