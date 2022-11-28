<template>
  <div class="border border-slate-300 rounded-md py-10 w-2/3 mx-auto">
    <h1 class="text-3xl">Login</h1>
    <div class="flex justify-center flex-col gap-3 w-72 mx-auto my-3">
      <input type="text" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400" placeholder="Email" v-model="email" />
      <input type="password" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400" placeholder="Password" v-model="password" />
      <input type="button" class="cursor-pointer bg-green-400 hover:bg-green-300 text-gray-600 font-bold px-3 py-2 rounded-md text-sm shadow-sm" @click="login" value="Login" />
      <p class="text-red-500" v-if="msg"> {{ msg }} </p>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;

        this.$store.dispatch('login', { token, user });

        this.$router.push('/');
      } catch (error) {
          this.msg = error.response.data.msg;
      }
    }
  }
};
</script>
