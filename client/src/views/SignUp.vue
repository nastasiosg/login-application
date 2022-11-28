<template>
  <div class="border border-slate-300 rounded-md py-10 w-2/3 mx-auto">
    <h1 class="text-3xl">Sign Up</h1>
    <div class="flex justify-center flex-col gap-3 w-72 mx-auto my-3">
      <input type="text" id="mail" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400" placeholder="Email-Adress" v-model="email" required/>
      <input type="text" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400" placeholder="First Name" v-model="first_name" />
      <input type="text" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400" placeholder="Country" v-model="country" />
      <input type="password" id="pwd" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400" placeholder="Password" v-model="password" required/>
      <input type="button" id="sign-up-btn" class="cursor-pointer bg-green-400 hover:bg-green-300 text-gray-600 font-bold px-3 py-2 rounded-md text-sm shadow-sm" @click="signUp" value="Sign Up"/>
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
      first_name: '',
      country: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          email: this.email,
          first_name: this.first_name,
          country: this.country,
          password: this.password
        };
      const response = await AuthService.signUp(credentials);
      this.msg = response.msg;
      } catch (error) {
        //this.msg = error.response.data.msg;
        this.$router.push('/')
      }
    }
  }
};
</script>
