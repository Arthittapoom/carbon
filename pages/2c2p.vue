<template>
    <div>
      <h1>ชำระเงินผ่าน Stripe</h1>
      <button @click="makePayment">ทดสอบชำระเงิน</button>
    </div>
  </template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    methods: {
      async makePayment() {
        const stripe = await loadStripe("pk_test_51QGugcDQdoy5otPN53dXFXBzRt7oHOyzEMWW80RSC3lqguudCY1adU4Oo4NLXhdGzF0hlbDOgc6lVEuGHbn6Fwwg00ep3fLpqp"); // ใช้ Public Key
  
        const { error } = await stripe.redirectToCheckout({
          lineItems: [{ price: "sk_test_51QGugcDQdoy5otPNyslVTXId4OTlnKeKbQ9Cemex3XcXbpUTdiuz12Oytesu22BjfDCHeUasQROuR0UIvyvAw1JS00PTLVBvPI", quantity: 1 }], // ใช้ Price ID จาก Stripe Dashboard
          mode: "payment",
          successUrl: "https://yourdomain.com/success",
          cancelUrl: "https://yourdomain.com/cancel"
        });
  
        if (error) {
          console.error("Stripe Error:", error);
        }
      }
    }
  };
  </script>
  