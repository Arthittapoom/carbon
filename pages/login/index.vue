<template>
    <div class="signup-background">
    <div class="container signup-container">
      <div class="signup-box">
        <h2 class="text-center">login</h2>
        <input v-model="email" class="signup-input mb-3 pl-4" placeholder="Email" type="email">
        <input v-model="password" class="signup-input mb-3 pl-4" placeholder="Password" type="password">
        <!-- <input v-model="confirmPassword" class="signup-input mb-3 pl-4" placeholder="Confirm Password" type="password"> -->
        <button @click="register" class="signup-btn mb-3">Sing up</button>
        <div class="text-center">
          <p>or</p>
          <button @click="signUpWithGoogle" class="signup-google-btn">
            <img src="google-logo.png" alt="Google Logo"> Sign up with Google
          </button>
        </div>
      </div>
      <div class="signup-image">
        <!-- <img src="../../static/login/your-image.png" alt="Signup Image"> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      // Perform the registration process
      alert("Registered successfully");
    },
    signUpWithGoogle() {
      // Perform the Google signup process
      alert("Google signup clicked");
    }
  }
}
</script>

<style>
.signup-background {
  background-color: #00C1D4;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-box {
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #909090;
  padding: 20px;
  margin-right: 20px;
}

.signup-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.signup-input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #909090;
  background-color: #F2F2F2;
  padding-left: 10px;
}

.signup-btn {
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
</style>
