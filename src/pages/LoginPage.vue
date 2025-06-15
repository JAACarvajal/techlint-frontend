<template>
  <div>
    <h1>Login Page</h1>
    <label for="email">Email:</label>
    <input type="text" placeholder="email" v-model="email" /><br>
    <label for="password">Password:</label>
    <input type="password" placeholder="Password" v-model="password" /><br>
    <button @click="login">Login</button>
  </div>
</template>

<script>
  import { login } from '../services/authService';
  export default {
    data() {
      return {
        // Define your data properties here
      };
    },
    methods: {
      async login() {
        try {
          const data = await login(this.email, this.password);

          console.log('Login successful', data);
          // Redirect or set user state
        } catch (err) {
          console.error('Login failed', err);
        }
      }
    },
    mounted() {
      // this.$api.get('/api/health-check').then((res) => {
      //   console.log(res.data);
      // });
    }
  }
</script>
