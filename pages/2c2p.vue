<template>
  <div>
    <h1>ชำระเงินผ่าน Stripe</h1>
    <button @click="makePayment">ทดสอบชำระเงิน</button>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  methods: {
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
    }
  }
};
</script>
